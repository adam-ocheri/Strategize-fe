import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Dropper from './Dropper';
import Dragger from './Dragger';
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
const CalendarDND = ({ data, updateSubStation, getAllSubstations, dispatch, user, manage }) => {
    const [date, setDate] = useState(new Date());
    const [currentlyViewedMonth, setCurrentlyViewedMonth] = useState('');
    const [items, setItems] = useState(); //backend unmodified tasks
    const [tasks, setTasks] = useState([]); //backend modified tasks
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
    const updateTime = async (date, time, id, parentId) => {
        const body = { date: date.slice(0, 16) + time + date.slice(21) };
        await dispatch(updateSubStation({ body, id: id, parentId: parentId, token: user.token }));
        await getAllSubstations();
    };
    const onDragStart = (result) => {
        // console.log(result.draggableId)
        // console.log(result.mode)
        // console.log(result.source)
        // console.log(result.type)
    };
    //Drag and drop logic
    const onDragEnd = async (result) => {
        if (ctrlPressed) {
            return;
        }
        console.log(result);
        console.log(`result.source.droppableId is: `);
        console.log(result.source.droppableId);
        if (!result.destination) {
            return;
        }
        if (result.destination.droppableId === result.source.draggableId) {
        }
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let movingInCalendar = false;
        for (let day of week) {
            if (result.source.droppableId.startsWith(day)) {
                movingInCalendar = true;
                const newTasks = tasks;
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
                await getAllSubstations();
                return;
            }
        }
        if (!movingInCalendar) {
            let newItems = items;
            let [selectedItem] = newItems.splice(result.source.index, 1);
            const body = { date: result.destination.droppableId };
            await dispatch(updateSubStation({ body, id: selectedItem._id, parentId: selectedItem.owningObjective, token: user.token }));
            setTasks((prev) => [...prev, selectedItem]);
            setItems(newItems);
            await getAllSubstations();
        }
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
                        .map((task, index) => (_jsx("div", { children: _jsx(Dragger, { item: task, index: index, updateTimeForDate: updateTime, manage: manage, droppableProvided: provided }) }, task._id))), provided.placeholder] })) }));
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
    return (_jsx("div", { className: 'mt6 pt6', children: _jsxs(DragDropContext, { onDragStart: onDragStart, onDragEnd: onDragEnd, children: [_jsx(Calendar, { navigationLabel: updateNavigation, value: date, tileContent: tileContent, tileClassName: tileClassName, className: 'calendar-container' }), items && _jsxs(ListGrid, { children: [_jsx("h3", { className: 'white font-2 p2 m2', children: "Pending Tasks:" }), _jsx(Dropper, { droppableId: 'Data', type: 'COL1', items: items, updateTime: updateTime, manage: manage })] })] }) }));
};
export default CalendarDND;
