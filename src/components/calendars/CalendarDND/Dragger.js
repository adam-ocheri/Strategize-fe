import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DragItem from './DragItem';
import { useAppSelector } from 'src/app/hooks';
export default function Dragger({ item, index, getAllSubstations, updateTimeForDate, updateSubStation, manage, droppableProvided, isDragging }) {
    const { activeTask } = useAppSelector((state) => state.task);
    const [isItemHovered, setIsItemHovered] = useState(false);
    return (_jsx(Draggable, { draggableId: item._id, index: index, children: (provided, snapshot) => (_jsx("div", { ref: provided.innerRef, ...provided?.draggableProps, ...provided?.dragHandleProps, className: `${item.date && isItemHovered && !isDragging ? 'drag-hover' : isDragging && activeTask._id === item._id ? 'drag-allow' : ''}`, onMouseEnter: () => setIsItemHovered(true), onMouseLeave: () => setIsItemHovered(false), children: _jsx(DragItem, { item: item, droppableProvided: droppableProvided, getAllSubstations: getAllSubstations, updateTimeForDate: updateTimeForDate, updateSubStation: updateSubStation, manage: manage, isDragging: isDragging }) })) }));
}
