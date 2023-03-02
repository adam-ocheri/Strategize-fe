import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const DragItem = ({ item, provided, snapshot, className }) => {
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
    const updateTime = (t) => {
        setTime(t.target.value);
        item.date = item.date.slice(0, 16) + t.target.value + item.date.slice(21);
        console.log('time is:');
        console.log(t.target.value);
        console.log('date is:');
        console.log(item.date);
    };
    return (_jsxs("div", { className: 'dragger p3 m3 b-color-dark-2', children: [_jsx("h3", { children: item.id }), _jsx("h3", { children: item.content }), _jsx("input", { type: 'time', value: time, onChange: (t) => updateTime(t) })] }));
};
export default DragItem;
