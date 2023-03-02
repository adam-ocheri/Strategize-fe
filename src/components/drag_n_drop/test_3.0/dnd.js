import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Dropper from './Dropper';
import Dragger from './Dragger';
import Button_S1 from 'src/components/elements/buttons/Button_S1/Button_S1';
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
                { id: '1', date: Date(), content: 'Hello' },
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
    const [currentlyViewedMonth, setCurrentlyViewedMonth] = useState('');
    const [items, setItems] = useState(generateDummyData()); //backend unmodified tasks
    const [tasks, setTasks] = useState([]); //backend modified tasks
    //Handle init data
    useEffect(() => {
        let initTasks = [];
        for (let doc in items) {
            //console.log(item);
            const init = items[doc].filter((item, index) => {
                if (item.date !== '') {
                    items[doc].splice(index, 1);
                }
                return item.date;
            });
            initTasks = [...initTasks, ...init];
        }
        setTasks((prev) => [...prev, ...initTasks]);
    }, []);
    useEffect(() => { console.log(tasks); }, [tasks]);
    const onDragStart = (result) => {
        // console.log(result.draggableId)
        // console.log(result.mode)
        // console.log(result.source)
        // console.log(result.type)
    };
    //Drag and drop logic
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
    };
    //Day Tile JSX function
    const tileContent = ({ view, date }) => {
        const bBelongsToMonth = date.toString().slice(4, 7) === currentlyViewedMonth;
        if (view == 'year' || view == 'decade') {
            return _jsx("div", { className: 'p1 m1 tile-inner' });
        }
        return (_jsx(Droppable, { droppableId: date.toString(), type: 'COL1', children: (provided) => (_jsxs("div", { className: `p1 m1 ${bBelongsToMonth ? 'tile-inner' : 'tile-inner-outdate'}`, ...provided.droppableProps, ref: provided.innerRef, ...provided.innerRef, children: [tasks.filter((item) => item.date.slice(0, 15)
                        ===
                            provided.droppableProps['data-rbd-droppable-id'].slice(0, 15))
                        .map((task, index) => (_jsxs("div", { children: [_jsx(Dragger, { item: task, index: index }), task.date, provided.droppableProps['data-rbd-droppable-id'], console.log('LOGGING WITHIN DIV!!!:'), console.log(task.date), console.log(provided.droppableProps['data-rbd-droppable-id'])] }, task.id))), provided.placeholder] })) }));
    };
    //Day tile className callback function
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
    //DEFAULT: Station Calendar
    return (_jsx("div", { className: 'mt6 pt6', children: _jsxs(DragDropContext, { onDragStart: onDragStart, onDragEnd: onDragEnd, children: [_jsx(Calendar, { navigationLabel: updateNavigation, value: date, tileContent: tileContent, tileClassName: tileClassName, className: 'calendar-container' }), _jsx(Button_S1, { onClick: saveChanges, children: "Save Changes" }), _jsx(ListGrid, { children: lists.map((listKey) => (_jsx(Dropper, { droppableId: `${listKey}`, type: 'COL1', items: items[listKey] }, listKey))) })] }) }));
};
export default DND;
