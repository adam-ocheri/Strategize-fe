import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Dropper from './Dropper';
export const clone = (data) => {
    return JSON.parse(JSON.stringify(data));
};
const DND = () => {
    const [tasks, setTasks2] = useState([
        {
            id: "SSS",
            content: "doStuff!!"
        },
        {
            id: "GGG",
            content: "KAKI!!!!!"
        }
    ]);
    const [tasks2, setTasks] = useState([
        {
            id: "AAA",
            content: "YTR! Nahhhhhh!!"
        },
        {
            id: "DDD",
            content: "VGH borrring"
        }
    ]);
    const [items, setItems] = useState(tasks);
    const onDragStart = (result) => {
        // console.log(result.draggableId)
        // console.log(result.mode)
        // console.log(result.source)
        // console.log(result.type)
    };
    const onDragEnd = (result, items, setItems) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.droppableId === result.source.droppableId &&
            result.destination.index === result.source.index)
            return;
        const newItems = [...items];
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);
        // const newItems : List = Array.from(items);
    };
    function getStyle(style, snapshot) {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        const { moveTo, curve, duration } = snapshot.dropAnimation;
        // move to the right spot
        const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
        // add a bit of turn for fun
        const rotate = 'rotate(0.5turn)';
        // patching the existing style
        return {
            ...style,
            transform: `${translate} ${rotate}`,
            // slowing down the drop because we can
            transition: `all ${curve} ${duration + 1}s`,
        };
    }
    return (_jsx(DragDropContext, { onDragStart: onDragStart, onDragEnd: (result) => onDragEnd(result, items, setItems), children: _jsx(Dropper, { droppableId: 'drop1', type: 'COL1', items: items }) }));
};
export default DND;
