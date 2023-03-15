import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Dropper from './Dropper';
import Dragger from './Dragger';
import { getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';
export const clone = (data) => {
    return JSON.parse(JSON.stringify(data));
};
const ListGrid = styled.div `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  background-color: rgb(20, 8, 23);
  border: 3px solid white;
`;
const CalendarDND = ({ data, updateSubStation, getAllSubstations, dispatch, user, manage, activeTask }) => {
    const [date, setDate] = useState(new Date());
    const [currentlyViewedMonth, setCurrentlyViewedMonth] = useState('');
    const [items, setItems] = useState(); //backend unmodified tasks
    const [tasks, setTasks] = useState([]); //backend modified tasks
    const [isDragging, setIsDragging] = useState(false);
    const [ctrlPressed, setCtrlPressed] = useState(false);
    //Handle INIT and UPDATEd data
    useEffect(() => {
        if (data.length >= 1) {
            const mutableData = Array.from(data);
            const newTasks = [];
            const newItems = [];
            for (let i = 0; i < mutableData.length; ++i) {
                const hasDate = () => { if (mutableData[i].date !== '')
                    return true; };
                console.log('LOOPING... Checking If DATE is valid...');
                console.log('current doc has date?:');
                console.log(hasDate());
                console.log('current doc is:');
                console.log(mutableData[i]);
                if (hasDate()) {
                    newTasks.push(mutableData[i]);
                }
                else {
                    newItems.push(mutableData[i]);
                }
            }
            //Subtasks
            {
                const subTasks = [];
                const subItems = [];
                for (let task of newTasks) {
                    console.log('trying to loop over tasks for SUBTASKS......');
                    console.log(task);
                    for (let subtask of task.HISTORY_TaskIterations) {
                        console.log(subtask);
                        if (subtask.date !== '') {
                            subTasks.push(subtask);
                        }
                        else {
                            subItems.push(subtask);
                        }
                    }
                }
                newItems.push(...subItems);
                newTasks.push(...subTasks);
                console.log('newTasks is:');
                console.log(newTasks);
                console.log("newItems is:");
                console.log(newItems);
            }
            setTasks(newTasks);
            setItems(newItems);
        }
        else {
            const newTasks = [];
            const newItems = [];
            setTasks(newTasks);
            setItems(newItems);
        }
    }, [data]);
    const handleKeyDown = (event) => {
        if (event.key === 'Control') {
            setCtrlPressed(true);
            console.log('CTRL PRESSED....');
        }
    };
    const handleKeyUp = (event) => {
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
    const updateTime = async (date, time, id, parentId, item) => {
        let body = {};
        if (item.isSubtask) {
            //TODO Subtask update - update algorithm needs refactoring and generalization
            let sIndex = 0;
            let taskOrigin;
            await dispatch(getTask({ id: item.origin, parentId: parentId, token: user.token })).then((response) => {
                taskOrigin = response.payload;
            });
            const newArray = taskOrigin.HISTORY_TaskIterations.filter((doc, index) => {
                if (doc._id === id) {
                    sIndex = index;
                }
                return doc._id !== id;
            });
            const newDateAndTime = date.slice(0, 16) + time + date.slice(21);
            let updatedSubtask = { ...item };
            updatedSubtask.date = newDateAndTime;
            newArray.splice(sIndex, 0, updatedSubtask);
            body = { HISTORY_TaskIterations: newArray };
            await dispatch(updateSubStation({ body, id: item.origin, parentId: parentId, token: user.token }));
        }
        else {
            body = { date: date.slice(0, 16) + time + date.slice(21) };
            await dispatch(updateSubStation({ body, id: id, parentId: parentId, token: user.token }));
        }
        await getAllSubstations();
    };
    const onDragStart = (result) => {
        setIsDragging(true);
    };
    //Drag and drop logic
    const onDragEnd = async (result) => {
        setIsDragging(false);
        if (ctrlPressed) {
            return;
        }
        console.log(result);
        console.log(`result.draggableId is: `);
        console.log(result.draggableId);
        if (!result.destination) {
            return;
        }
        if (result.destination.droppableId === result.source.draggableId) {
        }
        //Init Data
        let updateComplete = false;
        let Task;
        let subTask = null;
        let isSubtask = false;
        const newItems = Array.from(items);
        let newTasks = tasks;
        // Figure out if moving within calendar or from without
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let movingInCalendar = false;
        for (let day of week) {
            if (result.source.droppableId.startsWith(day)) {
                movingInCalendar = true;
            }
        }
        let modifiedList = movingInCalendar ? newTasks : newItems;
        // Figure out if subtask or task
        for (let task of tasks) {
            console.log('looping over tasks...');
            console.log(task);
            if (updateComplete)
                return;
            if (task.HISTORY_TaskIterations?.length > 0) {
                for (let subtask of task.HISTORY_TaskIterations) {
                    if (updateComplete)
                        return;
                    if (result.draggableId === subtask._id) {
                        console.log('MOVING SUBTASK!');
                        const [selectedItem] = modifiedList.filter((item, index) => {
                            if (item._id === subtask._id) {
                                return modifiedList.splice(index, 1);
                            }
                            else
                                return item._id === subtask._id;
                        });
                        if (selectedItem) {
                            isSubtask = true;
                            subTask = selectedItem;
                            Task = task;
                        }
                    }
                }
            }
        }
        //handle subtask case - from outside calendar
        if (subTask !== null) {
            updateComplete = true;
            let copy = {};
            for (let field in subTask) {
                Object.defineProperty(copy, field, { value: subTask[field], writable: true, enumerable: true, configurable: true });
            }
            copy.date = result.destination.droppableId;
            if (movingInCalendar) {
                // setItems(modifiedList);
                newTasks = [...tasks, copy];
                setTasks(newTasks);
            }
            else {
                newTasks = [...modifiedList, copy];
                setTasks(newTasks);
            }
            const updateSubtask = async () => {
                let insertIndex = 0;
                const newIterationsArray = Task.HISTORY_TaskIterations.filter((item, index) => {
                    if (item._id === subTask._id) {
                        insertIndex = index;
                        return;
                    }
                    return item._id !== subTask._id;
                });
                newIterationsArray.splice(insertIndex, 0, copy);
                await dispatch(updateSubStation({ body: { HISTORY_TaskIterations: newIterationsArray }, id: subTask.origin, parentId: subTask.owningObjective, token: user.token }));
                await dispatch(setActiveTask({ item: subTask }));
                await getAllSubstations();
            };
            updateSubtask();
            return;
        }
        if (!subTask && movingInCalendar) {
            newTasks = tasks;
            const [selectedItem] = newTasks.filter((item, index) => {
                if (item.date.slice(0, 15) === result.source.droppableId.slice(0, 15)) {
                    return newTasks.splice(index, 1);
                }
                else {
                    return item.date.slice(0, 15) === result.source.droppableId.slice(0, 15);
                }
            });
            const body = { date: result.destination.droppableId.slice(0, 15) + selectedItem.date.slice(15) };
            await dispatch(updateSubStation({ body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token }));
            setTasks((prev) => newTasks);
            await dispatch(setActiveTask({ item: selectedItem }));
            //await dispatch(getTask({id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            await getAllSubstations();
            return;
        }
        if (!movingInCalendar && !subTask) {
            let [selectedItem] = newItems.splice(result.source.index, 1);
            const body = { date: result.destination.droppableId };
            await dispatch(updateSubStation({ body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token }));
            setTasks((prev) => [...prev, selectedItem]);
            setItems(newItems);
            await dispatch(setActiveTask({ item: selectedItem }));
            //await dispatch(getTask({id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            await getAllSubstations();
        }
        // TODO SUBTASK adding to calendar - LEGACY START - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        /*
            console.log('Checking for subtasks.....');
            console.log(items);
            for (let task of tasks){
                if (updateComplete) return;
                const newItems : any[] = Array.from(items);
                for (let subtask of task.HISTORY_TaskIterations){
                    if (updateComplete) return;

                    if (result.draggableId === subtask._id){
                        console.log('MOVING SUBTASK!');
                        const [selectedItem] : any = newItems.filter((item : any, index : number) => {
                            if (item._id === subtask._id){
                                return newItems.splice(index, 1);
                            }
                            else return item._id === subtask._id;
                        });

                        if(selectedItem){
                            updateComplete = true;
                            setItems(newItems);
                            let copy : any = {};
                            for (let field in selectedItem){
                                Object.defineProperty(copy, field, {value: selectedItem[field], writable: true, enumerable: true, configurable: true })
                            }
                            console.log("COPY IS:")
                            console.log(copy);
                            copy.date = result.destination.droppableId;
                            const newTasks = [...tasks, copy];
                            setTasks(newTasks);

                            const updateSubtask = async () => {
                                let insertIndex = 0;
                                const newIterationsArray = task.HISTORY_TaskIterations.filter((item : any, index : number) => {
                                    if (item._id === subtask._id){
                                        insertIndex = index;
                                        return;
                                    }
                                    return item._id !== subtask._id;
                                });
                                newIterationsArray.splice(insertIndex, 0, copy);
                                console.log('newIterationsArray is::::::::::::::::::::::::::::::::');
                                console.log(newIterationsArray)
                                await dispatch(updateSubStation({body: {HISTORY_TaskIterations: newIterationsArray}, id: task._id, parentId: task.owningObjective, token: user.token}));
                                await getAllSubstations();
                            }
                            updateSubtask();
                            return;
                        }
                    }
                }
            }
            if (updateComplete) return;
            const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let movingInCalendar = false;
            for (let day of week){
                if(result.source.droppableId.startsWith(day)){
                    movingInCalendar = true;

                    const newTasks = tasks;
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
                    await dispatch(updateSubStation({body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
                    setTasks((prev : any) : any => newTasks);
                    await dispatch(getTask({id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
                    await getAllSubstations();

                    return;
                }
            }
        */
        // TODO SUBTASK adding to calendar - LEGACY END - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    };
    //Day TileContent JSX function
    const tileContent = ({ view, date }) => {
        const bBelongsToMonth = date.toString().slice(4, 7) === currentlyViewedMonth;
        if (view == 'year' || view == 'decade') {
            return _jsx("div", { className: 'p1 m1 tile-inner' });
        }
        return (_jsx(Droppable, { droppableId: date.toString(), type: 'COL1', children: (provided) => (_jsxs("div", { className: `p1 m1 ${bBelongsToMonth ? 'tile-inner' : 'tile-inner-outdate'}`, ...provided.droppableProps, ref: provided.innerRef, ...provided.innerRef, children: [tasks.filter((item) => item.date?.slice(0, 15)
                        ===
                            provided.droppableProps['data-rbd-droppable-id'].slice(0, 15))
                        .sort((a, b) => a.date.slice(15, 18) - b.date.slice(15, 18))
                        .sort((a, b) => a.date.slice(19, 21) - b.date.slice(19, 21))
                        .map((task, index) => (_jsx("div", { className: `${activeTask && activeTask.date ? activeTask.date.slice(0, 15) === task.date.slice(0, 15) ? 'drag-drag' : '' : ''}`, children: _jsx(Dragger, { item: task, index: index, getAllSubstations: getAllSubstations, updateSubStation: updateSubStation, updateTimeForDate: updateTime, manage: manage, droppableProvided: provided, isDragging: isDragging }) }, task._id))), provided.placeholder] })) }));
    };
    //Day Tile className callback function
    const tileClassName = ({ activeStartDate, date, view }) => {
        if (date.toString().slice(4, 7) === activeStartDate.toString().slice(4, 7)) {
            return 'tile-outer white font-9';
        }
        else {
            return 'tile-outer-outdate font-9';
        }
    };
    //Get currently viewed month from navigation
    const updateNavigation = ({ date, label, locale, view }) => {
        useEffect(() => {
            console.log('Modifying navigation...');
            console.log(date.toString().slice(4, 7));
            setCurrentlyViewedMonth(date.toString().slice(4, 7));
        }, [date]);
        return _jsx("div", { className: '', children: date.toString().slice(4, 8) + date.toString().slice(11, 15) });
    };
    //DEFAULT: Station Calendar & List of Pending Stations
    return (_jsx("div", { className: 'mt6 pt6', children: _jsxs(DragDropContext, { onDragStart: onDragStart, onDragEnd: onDragEnd, children: [_jsx(Calendar, { navigationLabel: updateNavigation, value: date, tileContent: tileContent, tileClassName: tileClassName, className: 'calendar-container' }), items && _jsxs(ListGrid, { children: [_jsx("h3", { className: 'white font-2 p2 m2', children: "Pending Tasks:" }), _jsx(Dropper, { droppableId: 'Data', type: 'COL1', items: items, getAllSubstations: getAllSubstations, updateTime: updateTime, manage: manage, isDragging: isDragging })] })] }) }));
};
export default CalendarDND;
