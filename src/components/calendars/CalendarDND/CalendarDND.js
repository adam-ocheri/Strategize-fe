import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Dropper from './Dropper';
import Dragger from './Dragger';
import { getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';
import { updateTask_ProfileView } from 'src/app/state_management/project/projectSlice';
import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { Flex } from '@chakra-ui/react';
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
const CalendarDND = ({ data, updateSubStation, getAllSubstations, dispatch, user, currentContext, manage, activeTask }) => {
    const [date, setDate] = useState(new Date());
    const [currentlyViewedMonth, setCurrentlyViewedMonth] = useState('');
    const [items, setItems] = useState(); //backend unmodified tasks
    const [tasks, setTasks] = useState([]); //backend modified tasks
    const [isDragging, setIsDragging] = useState(false);
    const [ctrlPressed, setCtrlPressed] = useState(false);
    const [spacer, setSpacer] = useState('');
    //Handle INIT and UPDATEd data
    useEffect(() => {
        if (data.length >= 1) {
            const mutableData = Array.from(data);
            const newTasks = [];
            const newItems = [];
            for (let i = 0; i < mutableData.length; ++i) {
                // check if task has date
                const hasDate = () => { if (mutableData[i].date !== '') {
                    return true;
                }
                else {
                    return false;
                } };
                const isDateValid = hasDate();
                // push task to designated lists
                if (isDateValid) {
                    newTasks.push(mutableData[i]);
                }
                else {
                    newItems.push(mutableData[i]);
                }
            }
            //Subtasks
            const subTasks = [];
            const subItems = [];
            for (let task of newTasks) {
                if (task?.HISTORY_TaskIterations?.length > 0) {
                    for (let subtask of task.HISTORY_TaskIterations) {
                        console.log('WTF is going on here?', subtask);
                        if (subtask.date !== '') {
                            subTasks.push(subtask);
                        }
                        else {
                            subItems.push(subtask);
                        }
                    }
                }
            }
            newItems.push(...subItems);
            newTasks.push(...subTasks);
            console.log('newTasks is:');
            console.log(newTasks);
            console.log("newItems is:");
            console.log(newItems);
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
    // Update Task Time
    const updateTime = async (date, time, id, parentId, item, type) => {
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
            type === "start" ? updatedSubtask.date : updatedSubtask.endTime = newDateAndTime;
            newArray.splice(sIndex, 0, updatedSubtask);
            body = { HISTORY_TaskIterations: newArray };
            const response = await dispatch(updateSubStation({ body, id: item.origin, parentId: parentId, token: user.token }));
            await refreshStationData(response.payload);
        }
        else {
            const newTime = date.slice(0, 16) + time + date.slice(21);
            body = type === "start" ? { date: newTime } : { endTime: newTime };
            await dispatch(updateSubStation({ body, id: id, parentId: parentId, token: user.token })).then(async (res) => {
                console.log('UPDATE TIME RESPONSE Incoming: ', res, body);
                await refreshStationData(res.payload);
            });
            // console.log('UPDATE TIME RESPONSE Incoming: ', response, body)
            // await refreshStationData(response.payload)
        }
        //await getAllSubstations();
    };
    const refreshStationData = async (updatedTask) => {
        console.log('Triggered profile view task update!!! | Updated Task is: ', updatedTask);
        return await dispatch(updateTask_ProfileView({ task: updatedTask }));
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
        console.log('Result LOG is:');
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
        let updatedTask;
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
                    if (result.draggableId === subtask?._id) {
                        console.log('MOVING SUBTASK!');
                        const [selectedItem] = modifiedList.filter((item, index) => {
                            if (item?._id === subtask?._id) {
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
            copy.endTime = result.destination.droppableId;
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
                const response = await dispatch(updateSubStation({ body: { HISTORY_TaskIterations: newIterationsArray }, id: subTask.origin, parentId: subTask.owningObjective, token: user.token }));
                await dispatch(setActiveTask({ item: subTask }));
                //--- Refresh currently active station's task view
                await refreshStationData(response.payload); //.HISTORY_TaskIterations[insertIndex]);
                await dispatch(getObjective({ id: response.payload.owningObjective, parentId: response.payload.heritage.ltg.id, owner: user._id, token: user.token }));
                //await getAllSubstations();
            };
            updateSubtask();
            return;
        }
        if (!subTask && movingInCalendar) {
            //newTasks = tasks;
            const [selectedItem] = newTasks.filter((item, index) => {
                if (item.date.slice(0, 15) === result.source.droppableId.slice(0, 15) && item._id === result.draggableId) {
                    return newTasks.splice(index, 1);
                }
                else {
                    return item.date.slice(0, 15) === result.source.droppableId.slice(0, 15) && item._id === result.draggableId;
                }
            });
            const body = {
                date: result.destination.droppableId.slice(0, 15) + selectedItem.date.slice(15),
                endTime: result.destination.droppableId.slice(0, 15) + selectedItem?.endTime?.slice(15)
            };
            const response = await dispatch(updateSubStation({ body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token }));
            setTasks((prev) => newTasks);
            await dispatch(setActiveTask({ item: Task }));
            //--- Refresh currently active station's task view
            await refreshStationData(response.payload);
            //await dispatch(getTask({id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            await dispatch(getObjective({ id: response.payload.owningObjective, parentId: response.payload.heritage.ltg.id, owner: user._id, token: user.token }));
            //await getAllSubstations();
            return;
        }
        if (!movingInCalendar && !subTask) {
            let [selectedItem] = newItems.splice(result.source.index, 1);
            const body = {
                date: result.destination.droppableId,
                endTime: result.destination.droppableId
            };
            const response = await dispatch(updateSubStation({ body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token }));
            setTasks((prev) => [...prev, response.payload]);
            setItems(newItems);
            await dispatch(setActiveTask({ item: response.payload }));
            //--- Refresh currently active station's task view
            await refreshStationData(response.payload);
            //await dispatch(getTask({id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token}))
            await dispatch(getObjective({ id: response.payload.owningObjective, parentId: response.payload.heritage.ltg.id, owner: user._id, token: user.token }));
            //await getAllSubstations();
        }
    };
    function notifyItemHovered(hovered, id) {
        if (hovered) {
            setSpacer(id);
        }
        else {
            setSpacer('');
        }
    }
    //Day TileContent JSX function
    const tileContent = ({ view, date }) => {
        const bBelongsToMonth = date.toString().slice(4, 7) === currentlyViewedMonth;
        if (view == 'year' || view == 'decade') {
            return _jsx("div", { className: 'p1 m1 tile-inner' });
        }
        return (_jsx(Droppable, { droppableId: date.toString(), type: 'COL1', children: (provided) => (_jsxs("div", { className: `p1 m1 ${bBelongsToMonth ? 'tile-inner' : 'tile-inner-outdate'} ${(activeTask && activeTask.date) ? ((isDragging && activeTask.date.slice(0, 15) === date.toString().slice(0, 15)) ? 'tile-inner-drag' : !isDragging && activeTask.date.slice(0, 15) === date.toString().slice(0, 15) ? 'tile-inner-scaler' : '') : ''} drop-area`, ...provided.droppableProps, ref: provided.innerRef, ...provided.innerRef, children: [tasks.filter((item) => item.date?.slice(0, 15)
                        ===
                            provided.droppableProps['data-rbd-droppable-id'].slice(0, 15))
                        .sort((a, b) => a.date.slice(15, 18) - b.date.slice(15, 18))
                        .sort((a, b) => a.date.slice(19, 21) - b.date.slice(19, 21))
                        .map((task, index) => (_jsxs("div", { className: `drop-scaler ${activeTask && activeTask.date ? !isDragging && activeTask._id === task._id ? 'drag-selected' : (isDragging && activeTask._id === task._id) ? 'drag-selected-dragging' : '' : ''}`, children: [_jsx(Dragger, { item: task, index: index, getAllSubstations: getAllSubstations, updateSubStation: updateSubStation, updateTimeForDate: updateTime, manage: manage, droppableProvided: provided, isDragging: isDragging, notifyItemHovered: notifyItemHovered }), spacer && spacer === task._id &&
                                _jsx(Flex, { minH: '10vh', margin: '10vh' })] }, task._id))), provided.placeholder] })) }));
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
    return (_jsx("div", { className: 'mt6 pt6', children: _jsxs(DragDropContext, { onDragStart: onDragStart, onDragEnd: onDragEnd, children: [_jsx(Calendar, { navigationLabel: updateNavigation, value: date, tileContent: tileContent, tileClassName: tileClassName, className: 'calendar-container' }), items && _jsxs(ListGrid, { children: [_jsx("h3", { className: 'white font-2 p2 m2', children: " Pending Tasks: " }), _jsx(Dropper, { droppableId: 'Data', type: 'COL1', items: items, getAllSubstations: getAllSubstations, updateTime: updateTime, manage: manage, isDragging: isDragging, isDropDisabled: true, notifyItemHovered: notifyItemHovered, spacer: spacer })] })] }) }));
};
export default CalendarDND;
