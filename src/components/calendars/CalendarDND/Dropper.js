import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Droppable } from 'react-beautiful-dnd';
import Dragger from './Dragger';
export default function Dropper({ items, droppableId, type, children, getAllSubstations, updateTime, manage, isDragging }) {
    return (_jsx(Droppable, { droppableId: droppableId, type: type, children: (provided, snapshot) => (_jsxs("div", { ...provided.droppableProps, ref: provided.innerRef, ...provided.innerRef, className: 'normalize-content', children: [items.map((item, index) => (_jsx(Dragger, { item: item, index: index, getAllSubstations: getAllSubstations, updateTimeForDate: updateTime, manage: manage, droppableProvided: provided, isDragging: isDragging }, item._id))), provided.placeholder] })) }));
}
