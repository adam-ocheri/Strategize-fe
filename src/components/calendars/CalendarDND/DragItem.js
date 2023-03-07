import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const DragItem = ({ item, updateTimeForDate, droppableProvided, manage, snapshot, className }) => {
    // const style = {
    //   ...provided.draggableProps.style,
    //   backgroundColor: snapshot.isDragging ? 'blue' : 'white',
    //   fontSize: 18,
    // };
    const [time, setTime] = useState(item.date.slice(16, 21));
    useEffect(() => {
        if (item.date) {
            setTime(item.date.slice(16, 21));
            // console.log('time is:')
            // console.log(time);
        }
    }, []);
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
    return (_jsxs("div", { className: 'dragger p3 m3 b-color-dark-2', children: [_jsx("h3", { children: item.taskName }), _jsx("input", { type: 'time', value: time, onChange: (t) => updateTime(t) }), _jsx("a", { className: 'p1 m1 b-color-white border-r2', href: '#', onClick: (e) => manage(e, item._id, item.owningObjective), children: "Manage" })] }));
};
export default DragItem;
