import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import mongoose from 'mongoose';
import { getTask } from 'src/app/state_management/task/taskSlice';
import { Badge, Stack } from '@chakra-ui/react';
const DragItem = ({ item, getAllSubstations, updateTimeForDate, updateSubStation, droppableProvided, manage, snapshot, className, isDragging }) => {
    // const style = {
    //   ...provided.draggableProps.style,
    //   backgroundColor: snapshot.isDragging ? 'blue' : 'white',
    //   fontSize: 18,
    // };
    const dispatch = useAppDispatch();
    const { user, stationContext } = useAppSelector((state) => state.auth);
    const { activeTask } = useAppSelector((state) => state.task);
    const [time, setTime] = useState(item.date.slice(16, 21));
    const [endTime, setEndTime] = useState(item?.endTime?.slice(16, 21));
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
        reportBadgesStatus();
    }, [item]);
    const [activeBadges, setActiveBadges] = useState({
        fresh: false,
        inProgress: false,
        success: false,
        overdue: false
    });
    const { fresh, inProgress, success, overdue } = activeBadges;
    const reportBadgesStatus = () => {
        const currentDate = new Date();
        console.log('hello Time!!!');
        const createdAt = item.createdAt.toString();
        const year = createdAt.slice(0, 4);
        const month = createdAt.slice(5, 7);
        const day = createdAt.slice(8, 10);
        const formatted = `${month.length > 1 && month[0] == 0 ? month[1] : month}/${day.length > 1 && day[0] == 0 ? day[1] : day}/${year}`;
        console.log(formatted.toLocaleLowerCase(), currentDate.toLocaleDateString());
        const initDate = formatted.toString();
        const presentDate = currentDate.toLocaleDateString().toString();
        const isNew = initDate == presentDate;
        if (isNew) {
            setActiveBadges((prev) => ({ ...prev, fresh: true }));
        }
        else if (item.date !== '' && item.date.length > 10 && !isNew) {
            const taskDueDate = new Date(item.date);
            if (taskDueDate < currentDate && !item.goalAchieved) {
                const taskDueTime = new Date(item.endTime);
                if (taskDueDate < currentDate && taskDueTime > currentDate && item.endTime !== '') {
                    console.log('CHECKING IF TASK TIME IS OVERDUE OR IN PROGRESS...');
                    console.log(taskDueTime, currentDate);
                    console.log('taskDueTime > currentDate', taskDueTime > currentDate);
                    setActiveBadges((prev) => ({ ...prev, inProgress: true, overdue: false }));
                }
                else {
                    setActiveBadges((prev) => ({ ...prev, overdue: true, inProgress: false }));
                }
            }
        }
        if (item.goalAchieved) {
            setActiveBadges((prev) => ({ success: true, inProgress: false, overdue: false, fresh: false }));
        }
    };
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
    const updateTime = async (t, type) => {
        type === "start" ? setTime(t.target.value) : setEndTime(t.target.value);
        console.log('trying to update time...');
        console.log(droppableProvided.droppableId);
        // item.date = item.date.slice(0, 16) + t.target.value + item.date.slice(21);
        if (item.date === '') {
            // await updateTimeForDate(droppableProvided.droppableId, t.target.value, item._id);
            return;
        }
        await updateTimeForDate(item.date, t.target.value, item._id, item.owningObjective, item, type);
        console.log(`Newly set ${type} time is:`);
        console.log(t.target.value);
        reportBadgesStatus();
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
        await getAllSubstations(); //! MUST FIX to dynamic
        reportBadgesStatus();
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
        await manage(e, item._id, item.owningObjective, item, { subTask });
    };
    return (_jsxs("div", { className: `dragger p3 b-color-dark-4`, 
        //style={{position: `${item.date && isItemHovered && !isDragging ? 'absolute' : isDragging && activeTask._id === item._id ? 'fixed' : 'relative'}`}}
        onMouseOver: async () => { setIsItemHovered(true); }, onMouseLeave: () => { setIsItemHovered(false); }, onMouseDown: () => { setIsLMBPressed(true); }, onMouseUp: () => setIsLMBPressed(false), children: [isItemHovered &&
                _jsx("div", { children: item.date !== '' ? _jsx("span", { className: 'circle-clicker-active', onClick: addNewIteration, children: " + " }) : _jsx("span", { className: 'circle-clicker-inactive', children: " + " }) }), _jsx("h3", { children: item.taskName }), stationContext !== 'task' &&
                _jsxs("div", { className: 'jt-left mb5', children: [stationContext === 'profile' &&
                            _jsx("span", { className: 'font-4 teal', style: { fontSize: '10pt' }, children: item.heritage.project.name }), " ", _jsx("br", {}), stationContext !== 'ltg' && stationContext !== 'objective' &&
                            _jsxs("span", { className: 'font-4 teal ml2', style: { fontSize: '6pt' }, children: ['•', " ", item.heritage.ltg.name] }), " ", _jsx("br", {}), stationContext !== 'objective' &&
                            _jsxs("span", { className: 'font-4 teal ml3', style: { fontSize: '6pt' }, children: ['•', " ", item.heritage.objective.name] }), " ", _jsx("br", {})] }), isItemHovered && item.date &&
                _jsxs("div", { className: '', children: [_jsx("input", { className: 'mb5 time-input jt-center font-11', type: 'time', value: time, onChange: (t) => updateTime(t, "start") }), _jsx("input", { className: 'mb5 time-input jt-center font-11', type: 'time', value: endTime, onChange: (t) => updateTime(t, "end") }), _jsx("a", { className: 'p1 mb5 b-color-white border-r2', href: '#', onClick: (e) => manageItem(e), children: "Manage" })] }), _jsxs(Stack, { direction: 'row', children: [inProgress && _jsx(Badge, { colorScheme: 'orange', children: "In Progress" }), success && _jsx(Badge, { colorScheme: 'green', children: "Success" }), overdue && _jsx(Badge, { colorScheme: 'red', children: "Overdue" }), fresh && _jsx(Badge, { colorScheme: 'purple', children: "New" })] })] }));
};
export default DragItem;
