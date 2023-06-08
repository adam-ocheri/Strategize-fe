
import {DragEventHandler, useEffect, useState} from 'react'
import styled from 'styled-components';
import Calendar, { CalendarProps, CalendarTileProperties, Detail, ViewType } from 'react-calendar';
import { MonthView, Navigation } from 'react-calendar';
import { DragDropContext, Position, Draggable, Droppable, DraggableId, DragDropContextProps, 
    OnDragEndResponder, DraggableProvided, DraggableStateSnapshot, DroppableProvided, DropResult, 
    OnDragStartResponder, DragStart, DraggableChildrenFn } from 'react-beautiful-dnd';
import Dropper from './Dropper';
import Dragger from './Dragger';
import Button_S1 from 'src/components/elements/buttons/Button_S1/Button_S1';
import { getTask, reset__Task, setActiveTask } from 'src/app/state_management/task/taskSlice';
import { updateTask_ProfileView, updateTask_ProjectView } from 'src/app/state_management/project/projectSlice';


interface DataElement {
    id: string;
    content: string;
}

interface DraggableLocation {
    droppableId: string;
    index: number;
}

interface Combine {
    draggableId: string;
    droppableId: string;
}

interface DragResult {
    reason: 'DROP' | 'CANCEL';
    destination?: DraggableLocation;
    source: DraggableLocation;
    combine?: Combine;
    mode: 'FLUID' | 'SNAP';
    draggableId: DraggableId;
}

type DropReason = 'DROP' | 'CANCEL';

type DropAnimation = {
  // how long the animation will run for
  duration: number;
  // the animation curve that we will be using for the drop
  curve: string;
  // the x,y position will be be animating to as a part of the drop
  moveTo: Position;
  // when combining with another item, we animate the opacity when dropping
  opacity: number | null | undefined;
  // when combining with another item, we animate the scale when dropping
  scale: number | null | undefined;
};

type List = DataElement[]

export const clone = (data: any) => {
    return JSON.parse(JSON.stringify(data));
};

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  background-color: rgb(20, 8, 23);
  border: 3px solid white;
`;

const CalendarDND : any = ({data, updateSubStation, getAllSubstations, dispatch, user, currentContext, manage, activeTask} : any)  =>{
    
    const [date, setDate] : any = useState(new Date());
    const [currentlyViewedMonth, setCurrentlyViewedMonth] = useState('');
    const [items, setItems] : any = useState();                                   //backend unmodified tasks
    const [tasks, setTasks] : any = useState([]);                       //backend modified tasks
    const [isDragging, setIsDragging] = useState(false);
    const [ctrlPressed, setCtrlPressed] = useState(false);

    //Handle INIT and UPDATEd data
    useEffect(() => {
        if(data.length >= 1){

            const mutableData : any = Array.from(data);
            const newTasks : any[] = [];
            const newItems : any[] = [];
            for(let i = 0; i < mutableData.length; ++i){
                // check if task has date
                const hasDate = () => {if (mutableData[i].date !== '') return true;}

                // push task to designated lists
                if(hasDate()){
                    newTasks.push(mutableData[i]);
                }
                else{
                    newItems.push(mutableData[i])
                }
            }

            //Subtasks
            {
                const subTasks = [];
                const subItems = [];

                for (let task of newTasks){
                    for (let subtask of task.HISTORY_TaskIterations){
                        console.log(subtask)
                        if(subtask.date !== ''){
                            subTasks.push(subtask);
                        }else{
                            subItems.push(subtask);
                        }
                        
                    }
                }
            
                newItems.push(...subItems);
                newTasks.push(...subTasks);
                console.log('newTasks is:')
                console.log(newTasks);
                console.log("newItems is:");
                console.log(newItems)
            }

            setTasks(newTasks);
            setItems(newItems);
            
        }
        else{
            const newTasks : any[] = [];
            const newItems : any[] = [];
            setTasks(newTasks);
            setItems(newItems);
        }
        
    }, [data])

    const handleKeyDown = (event : any) => {
        if (event.key === 'Control') {
          setCtrlPressed(true);
          console.log('CTRL PRESSED....');
        }
    };
    
    const handleKeyUp = (event : any) => {
        if (event.key === 'Control') {
          setCtrlPressed(false);
          console.log('CTRL RELEASED....');
        }
    };

    //copying Item
    useEffect(() => {
        // const getData = async () => {await getAllSubstations()};
        // getData();

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Update Task Time
    const updateTime = async (date : any, time : any, id : any, parentId : any, item : any) => {

        let body = {};

        if (item.isSubtask){

            //TODO Subtask update - update algorithm needs refactoring and generalization
            let sIndex = 0;
            let taskOrigin : any;

            await dispatch(getTask({id: item.origin, parentId: parentId, token: user.token})).then((response : any) => {
                taskOrigin = response.payload;
            })

            const newArray = taskOrigin.HISTORY_TaskIterations.filter((doc : any, index : number) => {
                if (doc._id === id){
                    sIndex = index;
                }
                return doc._id !== id
            });
            
            const newDateAndTime = date.slice(0, 16) + time + date.slice(21);
            let updatedSubtask = {...item};
            updatedSubtask.date = newDateAndTime;
            newArray.splice(sIndex, 0, updatedSubtask);
            body = {HISTORY_TaskIterations: newArray};
            const response = await dispatch(updateSubStation({body, id: item.origin, parentId: parentId, token: user.token}));
            await refreshStationData(response.payload);
        }
        else{
            body = {date: date.slice(0, 16) + time + date.slice(21)};
            await dispatch(updateSubStation({body, id: id, parentId: parentId, token: user.token})).then(async (res : any)=> {
                console.log('UPDATE TIME RESPONSE Incoming: ', res, body)
                await refreshStationData(res.payload)
            })
            // console.log('UPDATE TIME RESPONSE Incoming: ', response, body)
            // await refreshStationData(response.payload)
        }
        
        
        //await getAllSubstations();
    }

    const refreshStationData = async (updatedTask : any) => {

        console.log('Triggered profile view task update!!! | Updated Task is: ', updatedTask)
        return await dispatch(updateTask_ProfileView({task: updatedTask}));

        // console.log('Trying to refresh station data..................... Current Context Is: ', currentContext);
        // const context = 'profile'
        // switch (currentContext){
        //     case 'profile':
        //         console.log('Triggered profile view task update!!! | Updated Task is: ', updatedTask)
        //         return await dispatch(updateTask_ProfileView({task: updatedTask}));
        //     case 'project':
        //         return await dispatch(updateTask_ProjectView({task: updatedTask}));
        //     case 'ltg':

        //     case 'objective':

        //     case 'task':

        // }

    }

    const onDragStart : OnDragStartResponder | undefined = (result : DragStart) => {
        setIsDragging(true);
    }

    //Drag and drop logic
    const  onDragEnd : DraggableChildrenFn | any = async (result : any) => {
        setIsDragging(false);
        if (ctrlPressed){
            return;
        }
        console.log('REsukt LOG is:')
        console.log(result);
        console.log(`result.draggableId is: `);
        console.log(result.draggableId);
        if (!result.destination){
            return;
        }

        if(result.destination.droppableId === result.source.draggableId){

        }

        //Init Data
        let updateComplete = false;
        let updatedTask: any; 
        let Task : any;
        let subTask : any = null;
        let isSubtask: boolean = false ;
        const newItems : any[] = Array.from(items);
        let newTasks :any = tasks;

        // Figure out if moving within calendar or from without
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let movingInCalendar = false;
        for (let day of week){
            if(result.source.droppableId.startsWith(day)){
                movingInCalendar = true;
            }
        }
        let modifiedList : any = movingInCalendar ? newTasks : newItems;
        
        // Figure out if subtask or task
        for (let task of tasks){
            console.log('looping over tasks...')
            console.log(task)   
            if (updateComplete) return;
            if (task.HISTORY_TaskIterations?.length > 0)
            {
                for (let subtask of task.HISTORY_TaskIterations){
                    if (updateComplete) return;
    
                    if (result.draggableId === subtask._id){
                        console.log('MOVING SUBTASK!');
                        const [selectedItem] : any = modifiedList.filter((item : any, index : number) => {
                            if (item._id === subtask._id){
                                return modifiedList.splice(index, 1);
                            }
                            else return item._id === subtask._id;
                        });
                        if (selectedItem){
                            isSubtask = true;
                            subTask = selectedItem;
                            Task = task;
                        }
                    }
                }
            }
            
        }
      
        //handle subtask case - from outside calendar
        if(subTask !== null){
            
            updateComplete = true;
            
            let copy : any = {};
            for (let field in subTask){
                Object.defineProperty(copy, field, {value: subTask[field], writable: true, enumerable: true, configurable: true })
            }

            copy.date = result.destination.droppableId;
            if(movingInCalendar){
                // setItems(modifiedList);
                newTasks = [...tasks, copy];
                setTasks(newTasks);
            }
            else{
                newTasks = [...modifiedList, copy];
                setTasks(newTasks);
            }
            
            const updateSubtask = async () => {
                let insertIndex = 0;
                const newIterationsArray = Task.HISTORY_TaskIterations.filter((item : any, index : number) => {
                    if (item._id === subTask._id){
                        insertIndex = index;
                        return;
                    }
                    return item._id !== subTask._id;
                });
                newIterationsArray.splice(insertIndex, 0, copy);
                const response = await dispatch(updateSubStation({body: {HISTORY_TaskIterations: newIterationsArray}, id: subTask.origin, parentId: subTask.owningObjective, token: user.token}));
                await dispatch(setActiveTask({item: subTask}))
                //--- Refresh currently active station's task view
                await refreshStationData(response.payload);//.HISTORY_TaskIterations[insertIndex]);
                //await getAllSubstations();
            }
            updateSubtask();
            return;
        }

        if (!subTask && movingInCalendar){
            newTasks = tasks;
            const [selectedItem] : any = newTasks.filter((item : any, index : any) => {
                if(item.date.slice(0, 15) === result.source.droppableId.slice(0, 15))
                {
                    return newTasks.splice(index, 1);
                }
                else{
                    return item.date.slice(0, 15) === result.source.droppableId.slice(0, 15);
                }
            });

            const body = {date: result.destination.droppableId.slice(0, 15) + selectedItem.date.slice(15)}
            const response = await dispatch(updateSubStation({body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            setTasks((prev : any) : any => newTasks);
            await dispatch(setActiveTask({item: Task}))
            //--- Refresh currently active station's task view
            await refreshStationData(response.payload);
            //await dispatch(getTask({id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            //await getAllSubstations();

            return;
        }

        if (!movingInCalendar && !subTask){
            let [selectedItem] : any = newItems.splice(result.source.index, 1);
            
            const body = {date: result.destination.droppableId};
            const response = await dispatch(updateSubStation({body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            setTasks((prev : any) : any => [...prev, Task]);
            setItems(newItems);
            await dispatch(setActiveTask({item: Task}))
            //--- Refresh currently active station's task view
            await refreshStationData(response.payload);
            //await dispatch(getTask({id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            //await getAllSubstations();
            
        }
        

    }
    

    //Day TileContent JSX function
    const tileContent = ({ view, date }: any) => {

        const bBelongsToMonth = date.toString().slice(4, 7) === currentlyViewedMonth;

        if(view == 'year' || view == 'decade'){
            return <div className='p1 m1 tile-inner'>

            </div>
        }
        return (
            <Droppable droppableId={date.toString()} type='COL1'>
                {(provided) => (
                    <div className={`p1 m1 ${bBelongsToMonth? 'tile-inner' : 'tile-inner-outdate'} ${(activeTask && activeTask.date) ? ((isDragging && activeTask.date.slice(0,15) === date.toString().slice(0, 15)) ? 'tile-inner-drag' : !isDragging && activeTask.date.slice(0,15) === date.toString().slice(0, 15) ? 'tile-inner-scaler' : '') : ''} drop-area`}
                        {...provided.droppableProps} 
                        ref={provided.innerRef} 
                        {...provided.innerRef}
                    >
                        {tasks.filter((item : any) => 
                                item.date?.slice(0, 15) 
                                === 
                                provided.droppableProps['data-rbd-droppable-id'].slice(0, 15)
                            )
                            .sort((a : any, b : any) => a.date.slice(15, 18) - b.date.slice(15, 18))
                            .sort((a : any, b : any) => a.date.slice(19, 21) - b.date.slice(19, 21))
                            .map(
                                (task : any, index : any) => (
                                    <div key={task._id} className={`drop-scaler ${activeTask && activeTask.date ? !isDragging && activeTask._id === task._id ? 'drag-selected' : (isDragging && activeTask._id === task._id) ? 'drag-selected-dragging' : '': ''}`}>
                                        <Dragger item={task} index={index} getAllSubstations={getAllSubstations} updateSubStation={updateSubStation} updateTimeForDate={updateTime} manage={manage} droppableProvided={provided} isDragging={isDragging}/>
                                    </div>
                            
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }

    //Day Tile className callback function
    const tileClassName : any = ({activeStartDate, date, view} : CalendarTileProperties) => {
        if (date.toString().slice(4, 7) === activeStartDate.toString().slice(4, 7))
        {
            return 'tile-outer white font-9'
        }
        else{
            return 'tile-outer-outdate font-9'
        }
    }

    //Get currently viewed month from navigation
    const updateNavigation : CalendarProps["navigationLabel"] = ({date, label, locale, view}) : string | JSX.Element | null => {
        useEffect(()=> {
            console.log('Modifying navigation...')
            console.log(date.toString().slice(4, 7));
            setCurrentlyViewedMonth(date.toString().slice(4, 7));
        }, [date])
        return <div className=''>
            {date.toString().slice(4, 8) + date.toString().slice(11, 15)}
        </div>
    }
    
    //DEFAULT: Station Calendar & List of Pending Stations
    return (
        <div className='mt6 pt6'>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Calendar 
                    navigationLabel={updateNavigation} 
                    value={date} 
                    tileContent={tileContent} 
                    tileClassName={tileClassName} 
                    className={'calendar-container'}
                />
                {items && <ListGrid>
                    <h3 className='white font-2 p2 m2'> Pending Tasks: </h3>
                    <Dropper droppableId={'Data'} type='COL1' items={items} getAllSubstations={getAllSubstations} updateTime={updateTime} manage={manage} isDragging={isDragging} isDropDisabled={true}/>
                </ListGrid>}
            </DragDropContext>    
        </div>
        
    );
}

export default CalendarDND;