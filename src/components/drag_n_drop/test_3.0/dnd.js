import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
`;
const DND = () => {
    //TODO Dummy Data------------------------------------------------------
    const lists = ["One", "Two", "Three"];
    const generateDummyData = () => {
        return {
            One: [
                { id: '1', date: '', content: 'Hello' },
                { id: '2', date: '', content: 'World' },
                { id: '3', date: '', content: 'How' },
                { id: '4', date: '', content: 'Are' },
                { id: '5', date: '', content: 'You' },
            ],
            Two: [
                { id: '6', date: '', content: 'Could' },
                { id: '7', date: '', content: 'Some' },
                { id: '8', date: '', content: 'Kind' },
                { id: '9', date: '', content: 'Of' },
                { id: '10', date: '', content: 'Book' },
            ],
            Three: [
                { id: '11', date: '', content: 'Be' },
                { id: '12', date: '', content: 'Told' },
                { id: '13', date: '', content: 'To' },
                { id: '14', date: '', content: 'Have' },
                { id: '15', date: '', content: 'Been' },
            ],
        };
    };
    //TODO Dummy Data------------------------------------------------------
    const [date, setDate] = useState(new Date());
    const [items, setItems] = useState(generateDummyData());
    const [tasks, setTasks] = useState([]);
    const onDragStart = (result) => {
        // console.log(result.draggableId)
        // console.log(result.mode)
        // console.log(result.source)
        // console.log(result.type)
    };
    const onDragEnd = (result) => {
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
                console.log('moving task inside Calendar');
                const newTasks = tasks;
                const [selectedItem] = newTasks.filter((item) => item.date === result.source.droppableId);
                console.log(`selectedItem is: `);
                console.log(selectedItem);
                selectedItem.date = result.destination.droppableId;
                //newTasks.splice(result.destination.index, 0, selectedItem);
                setTasks(newTasks);
                movingInCalendar = true;
                return;
            }
        }
        if (!movingInCalendar) {
            const newItems = items;
            const [selectedItem] = newItems[result.source.droppableId].splice(result.source.index, 1);
            selectedItem.date = result.destination.droppableId;
            setTasks((prev) => [...prev, selectedItem]);
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
    };
    const tileContent = ({ view, date }) => {
        return (_jsx(Droppable, { droppableId: date.toString(), type: 'COL1', children: (provided) => (_jsxs("div", { ...provided.droppableProps, ref: provided.innerRef, ...provided.innerRef, children: [tasks.filter((item) => item.date === provided.droppableProps['data-rbd-droppable-id']).map((task, index) => (_jsx(Dragger, { item: task, index: index }, task.id))), provided.placeholder] })) }));
    };
    return (_jsx("div", { className: 'mt6 pt6', children: _jsxs(DragDropContext, { onDragStart: onDragStart, onDragEnd: onDragEnd, children: [_jsx(Calendar, { value: date, tileContent: tileContent }), _jsx(ListGrid, { children: lists.map((listKey) => (_jsx(Dropper, { droppableId: `${listKey}`, type: 'COL1', items: items[listKey] }, listKey))) })] }) }));
};
export default DND;
