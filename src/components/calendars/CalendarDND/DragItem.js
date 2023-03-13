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
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [isLMBPressed, setIsLMBPressed] = useState(false);
    useEffect(() => {
        if (item.date) {
            setTime(item.date.slice(16, 21));
            // console.log('time is:')
            // console.log(time);
        }
    }, []);
    // useEffect(() => {
    //   console.log('______________________________________________________________________')
    //   console.log('isDragging is')
    //   console.log(isDragging)
    //   console.log('isItemHovered is')
    //   console.log(isItemHovered)
    //   console.log('CONDITION:');
    //   console.log(isItemHovered && !isDragging )
    // }, [isDragging, isItemHovered])
    const updateTime = async (t) => {
        setTime(t.target.value);
        console.log('trying to update time...');
        console.log(droppableProvided.droppableId);
        // item.date = item.date.slice(0, 16) + t.target.value + item.date.slice(21);
        if (item.date === '') {
            // await updateTimeForDate(droppableProvided.droppableId, t.target.value, item._id);
            return;
        }
        await updateTimeForDate(item.date, t.target.value, item._id, item.owningObjective);
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
        // const initBody = item.isSubtask ? {} : {iteration: item.iteration + 1};
        // await dispatch(updateSubStation({body : initBody, id: id, parentId: item.owningObjective, token: user.token}))
        let newIteration = {};
        for (let field in item) {
            console.log('LOGGING FIELDs in item........');
            console.log(field + ': ');
            console.log(item[field]);
            // Exclude out the ID, date, and TaskIterations array of the original item from the copy
            if (field !== 'HISTORY_TaskIterations') {
                // if (field === 'iteration'){
                //   Object.defineProperty(newIteration, field, {value: item[field], writable: true, enumerable: true, configurable: true})
                // }
                if (field === '_id') {
                    if (!item.isSubtask) {
                        Object.defineProperty(newIteration, 'origin', { value: item[field], writable: true, enumerable: true, configurable: true });
                        Object.defineProperty(newIteration, 'isSubtask', { value: true, writable: true, enumerable: true, configurable: true });
                    }
                    Object.defineProperty(newIteration, field, { value: new mongoose.Types.ObjectId(), writable: true, enumerable: true, configurable: true });
                }
                else if (field === 'date') {
                    Object.defineProperty(newIteration, field, { value: '', writable: true, enumerable: true, configurable: true });
                }
                else {
                    Object.defineProperty(newIteration, field, { value: item[field], writable: true, enumerable: true, configurable: true });
                }
            }
        }
        const newArray = item.isSubtask ? [...historyArray] : [...item.HISTORY_TaskIterations];
        const body = { HISTORY_TaskIterations: [...newArray, newIteration] };
        const id = item.isSubtask ? item.origin : item._id;
        await dispatch(updateSubStation({ body, id: id, parentId: item.owningObjective, token: user.token }));
        await getAllSubstations();
    };
    const setSelectedItemAsActiveTask = async () => {
        setIsItemSelected(true);
        if (item._id !== activeTask._id) {
            // setActiveTask(item);
            dispatch(setActiveTask({ item }));
            ;
            // await dispatch(getTask({id: item._id, parentId: item.owningObjective, token: user.token}));
        }
    };
    return (
    // className={`dragger p3 m3 b-color-dark-2 ${isItemHovered && !isLMBPressed && !isDragging ? 'drag-hover' : 'drag-drag'}`} 
    _jsxs("div", { className: `dragger p3 m3 b-color-dark-2 ${item.date && isItemHovered && !isLMBPressed && !isDragging ? 'drag-hover' : ''}`, onMouseOver: async () => { setIsItemHovered(true); await setSelectedItemAsActiveTask(); }, onMouseLeave: () => { setIsItemHovered(false); }, onMouseDown: () => { setIsLMBPressed(true); }, onMouseUp: () => setIsLMBPressed(false), onClick: () => setSelectedItemAsActiveTask(), children: [_jsx("h3", { children: item.taskName }), _jsx("input", { className: 'time-input jt-center font-11', type: 'time', value: time, onChange: (t) => updateTime(t) }), _jsx("a", { className: 'p1 m1 b-color-white border-r2', href: '#', onClick: (e) => manage(e, item._id, item.owningObjective), children: "Manage" })] }));
};
export default DragItem;
