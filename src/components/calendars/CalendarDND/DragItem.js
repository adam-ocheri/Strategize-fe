import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import mongoose from 'mongoose';
import { getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';
const DragItem = ({ item, getAllSubstations, updateTimeForDate, updateSubStation, droppableProvided, manage, snapshot, className, isDragging }) => {
    // const style = {
    //   ...provided.draggableProps.style,
    //   backgroundColor: snapshot.isDragging ? 'blue' : 'white',
    //   fontSize: 18,
    // };
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { activeTask } = useAppSelector((state) => state.task);
    const [time, setTime] = useState(item.date.slice(16, 21));
    const [isItemHovered, setIsItemHovered] = useState(false);
    const [itemBehaviorClass, setItemBehaviorClass] = useState('');
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [isLMBPressed, setIsLMBPressed] = useState(false);
    useEffect(() => {
        if (item.date) {
            setTime(item.date.slice(16, 21));
            // console.log('time is:')
            // console.log(time);
        }
    }, []);
    useEffect(() => {
        console.log('______________________________________________________________________');
        console.log('isDragging is');
        console.log(isDragging);
        console.log('isItemHovered is');
        console.log(isItemHovered);
        console.log('CONDITION:');
        console.log(isItemHovered && !isDragging);
        if (isItemHovered && !isDragging) {
            setItemBehaviorClass('drag-hover');
        }
        else {
            setItemBehaviorClass('drag-allow');
        }
    }, [isDragging, isItemHovered]);
    useEffect(() => {
        console.log('______________________________________________________________________');
        console.log("itemBehaviorClass is:");
        console.log(itemBehaviorClass);
    }, [itemBehaviorClass]);
    const updateTime = async (t) => {
        setTime(t.target.value);
        console.log('trying to update time...');
        console.log(droppableProvided.droppableId);
        // item.date = item.date.slice(0, 16) + t.target.value + item.date.slice(21);
        if (item.date === '') {
            // await updateTimeForDate(droppableProvided.droppableId, t.target.value, item._id);
            return;
        }
        await updateTimeForDate(item.date, t.target.value, item._id, item.owningObjective, item);
        console.log('time is:');
        console.log(t.target.value);
        console.log('date is:');
        console.log(item.date);
    };
    const addNewIteration = async () => {
        let historyArray = [];
        if (item.isSubtask) {
            await dispatch(getTask({ id: item.origin, parentId: item.owningObjective, token: user.token })).then((response) => {
                historyArray = [...response.payload.HISTORY_TaskIterations];
            });
        }
        let newIteration = {};
        for (let field in item) {
            console.log('LOGGING FIELDs in item........');
            console.log(field + ': ');
            console.log(item[field]);
            // Exclude out the ID, date, and TaskIterations array of the original item from the copy
            if (field !== 'HISTORY_TaskIterations' && field !== 'description' && field !== 'notes') {
                if (field === '_id') {
                    if (!item.isSubtask) {
                        Object.defineProperty(newIteration, 'origin', { value: item[field], writable: true, enumerable: true, configurable: true });
                        Object.defineProperty(newIteration, 'isSubtask', { value: true, writable: true, enumerable: true, configurable: true });
                    }
                    Object.defineProperty(newIteration, field, { value: new mongoose.Types.ObjectId(), writable: true, enumerable: true, configurable: true });
                }
                else if (field === 'iteration') {
                    let value = item.isSubtask ? historyArray.length + 1 : item.HISTORY_TaskIterations.length + 1;
                    Object.defineProperty(newIteration, 'iteration', { value: value, writable: true, enumerable: true, configurable: true });
                }
                else if (field === 'date') {
                    Object.defineProperty(newIteration, field, { value: '', writable: true, enumerable: true, configurable: true });
                }
                else {
                    Object.defineProperty(newIteration, field, { value: item[field], writable: true, enumerable: true, configurable: true });
                }
            }
        }
        const id = item.isSubtask ? item.origin : item._id;
        const newArray = item.isSubtask ? [...historyArray] : [...item.HISTORY_TaskIterations];
        const body = { HISTORY_TaskIterations: [...newArray, newIteration] };
        await dispatch(updateSubStation({ body, id: id, parentId: item.owningObjective, token: user.token }));
        await getAllSubstations();
    };
    // const setSelectedItemAsActiveTask = async () => {
    //   setIsItemSelected(true)
    //   if(item._id !== activeTask._id){
    //     dispatch(setActiveTask({item}));
    //   }
    // }
    const manageItem = async (e) => {
        // if (item.isSubtask){
        //   manage(e, item.origin, item.owningObjective)
        // }
        // else{
        //   manage(e, item._id, item.owningObjective)
        // }
        e.preventDefault();
        const subTask = item.isSubtask ? item : null;
        // if(item._id !== activeTask._id){
        //   dispatch(setActiveTask({item}));
        // }
        await manage(e, item._id, item.owningObjective, { subTask });
    };
    return (_jsxs("div", { className: `dragger p3 m3 b-color-dark-2 `, 
        //style={{position: `${item.date && isItemHovered && !isDragging ? 'absolute' : isDragging && activeTask._id === item._id ? 'fixed' : 'relative'}`}}
        onMouseOver: async () => { setIsItemHovered(true); dispatch(setActiveTask({ item })); }, onMouseLeave: () => { setIsItemHovered(false); }, onMouseDown: () => { setIsLMBPressed(true); }, onMouseUp: () => setIsLMBPressed(false), children: [item.date !== '' ? _jsx("span", { className: 'circle-clicker-active', onClick: addNewIteration, children: " + " }) : _jsx("span", { className: 'circle-clicker-inactive', children: " + " }), _jsx("h3", { children: item.taskName }), _jsx("input", { className: 'time-input jt-center font-11', type: 'time', value: time, onChange: (t) => updateTime(t) }), _jsx("a", { className: 'p1 m1 b-color-white border-r2', href: '#', onClick: (e) => manageItem(e), children: "Manage" })] }));
};
export default DragItem;
