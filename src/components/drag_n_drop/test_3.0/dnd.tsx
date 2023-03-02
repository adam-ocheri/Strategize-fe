
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
`;

const DND : any = ()  =>{
    //TODO Dummy Data------------------------------------------------------

    const lists = ["One", "Two", "Three"];
    

    const generateDummyData = () => {
        return {
            One:
            [
                {id: '1', date: Date(), content: 'Hello'},
                {id: '2', date: '', content: 'World'},
                {id: '3', date: '', content: 'How'},
                {id: '4', date: '', content: 'Are'},
                {id: '5', date: '', content: 'You'},
            ],
            Two:
            [
                {id: '6', date: '', content: 'Could'},
                {id: '7', date: '', content: 'Some'},
                {id: '8', date: '', content: 'Kind'},
                {id: '9', date: '', content: 'Of'},
                {id: '10', date: '', content: 'Book'},
            ],
            Three:
            [
                {id: '11', date: '', content: 'Be'},
                {id: '12', date: '', content: 'Told'},
                {id: '13', date: '', content: 'To'},
                {id: '14', date: '', content: 'Have'},
                {id: '15', date: '', content: 'Been'},
            ],
        } 
    }
    
    //TODO Dummy Data------------------------------------------------------
    const [date, setDate] : any = useState(new Date());
    const [currentlyViewedMonth, setCurrentlyViewedMonth] = useState('');
    const [items, setItems] : any = useState(generateDummyData());      //backend unmodified tasks
    const [tasks, setTasks] : any = useState([]);                       //backend modified tasks

    //Handle init data
    useEffect(() => {
        let initTasks : any[] = [];
        for (let doc in items){
            //console.log(item);
            const init = items[doc].filter((item : any, index : any) => {
                if(item.date !== '')
                {
                    items[doc].splice(index, 1);
                }
                return item.date
            });
            initTasks = [...initTasks, ...init]; 
        }
        setTasks((prev : any) : any => [...prev, ...initTasks]);
        
    }, [])

    useEffect(() => {console.log(tasks);}, [tasks])

    const onDragStart : OnDragStartResponder | undefined = (result : DragStart) => {
        // console.log(result.draggableId)
        // console.log(result.mode)
        // console.log(result.source)
        // console.log(result.type)
    }

    //Drag and drop logic
    const  onDragEnd : DraggableChildrenFn | any = (result : any) => {
        console.log(result);
        console.log(`result.source.droppableId is: `);
        console.log(result.source.droppableId);
        if (!result.destination){
            return;
        }

        if(result.destination.droppableId === result.source.draggableId){

        }

        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let movingInCalendar = false;

        for (let day of week){
            if(result.source.droppableId.startsWith(day)){
                console.log('moving task inside Calendar')
                const newTasks = tasks;
                const [selectedItem] : any = newTasks.filter((item : any) => item.date === result.source.droppableId);
                console.log(`selectedItem is: `);
                console.log(selectedItem);
                selectedItem.date = result.destination.droppableId;
                //newTasks.splice(result.destination.index, 0, selectedItem);
                setTasks(newTasks);
                movingInCalendar = true;
                return;
            }
        }
        
        if (!movingInCalendar){
            const newItems = items;
            const [selectedItem] = newItems[result.source.droppableId].splice(result.source.index, 1); 
            selectedItem.date = result.destination.droppableId;
            setTasks((prev : any) : any => [...prev, selectedItem]);
            setItems(newItems);
        }
        
        {
        //*LEGACY
        // const newItems = items;
     
        // //get source
        // const sourceElem = result.source.droppableId;

        // //get destination
        // const destinationElem = result.destination.droppableId;

        // //manipulate data - 
        // const [selectedItem] = newItems[sourceElem].splice(result.source.index, 1);
        // selectedItem.date = result.destination.droppableId;
        // newItems[destinationElem].splice(result.destination.index, 0, selectedItem);

        // setItems(newItems);
        }
    }
    
    //Save changes in backend
    const saveChanges = () => {
        console.log('saving changes...');
        console.log(tasks);
        //then send to backend to an algorithm that takes each task in the array and updates it:
        /*
            for (task of tasks){
                const DOC = objectiveModel.findOne({_id: task.id});
                if (DOC){
                    objectiveModel.findOneAndUpdate({_id: task.id}, req.body)
                }
            }
        */
    }

    //Day Tile JSX function
    const tileContent = ({ view, date }: any) => {

        const bBelongsToMonth = date.toString().slice(4, 7) === currentlyViewedMonth;

        if(view == 'year' || view == 'decade'){
            return <div className='p1 m1 tile-inner'>

            </div>
        }
        return (
            <Droppable droppableId={date.toString()} type='COL1'>
                {(provided) => (
                    <div className={`p1 m1 ${bBelongsToMonth? 'tile-inner' : 'tile-inner-outdate'}`} {...provided.droppableProps} ref={provided.innerRef} {...provided.innerRef}>
                        {tasks.filter(
                            (item : any) => 
                            item.date.slice(0, 15) 
                            === 
                            provided.droppableProps['data-rbd-droppable-id'].slice(0, 15)
                            )
                            .map(
                                (task : any, index : any) => (
                                    <div key={task.id}>
                                        <Dragger item={task} index={index}/>
                                        {task.date}
                                        {provided.droppableProps['data-rbd-droppable-id']}
                                        {console.log('LOGGING WITHIN DIV!!!:')}
                                        {console.log(task.date)}
                                        {console.log(provided.droppableProps['data-rbd-droppable-id'])}
                                    </div>
                            
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }

    //Day tile className callback function
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
    
    //DEFAULT: Station Calendar
    return (
        <div className='mt6 pt6'>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Calendar 
                navigationLabel={updateNavigation} 
                value={date} tileContent={tileContent} 
                tileClassName={tileClassName} 
                className={'calendar-container'}
                />
                <Button_S1 onClick={saveChanges}>Save Changes</Button_S1>
                <ListGrid>
                    {lists.map((listKey) => (
                        <Dropper key={listKey} droppableId={`${listKey}`} type='COL1' items={items[listKey]}/>
                    ))}
                </ListGrid>
            </DragDropContext>    
        </div>
        
    );
}

export default DND;