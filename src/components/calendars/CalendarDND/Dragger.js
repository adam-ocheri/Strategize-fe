import { jsx as _jsx } from "react/jsx-runtime";
import { Draggable } from 'react-beautiful-dnd';
import DragItem from './DragItem';
export default function Dragger({ item, index, updateTimeForDate, manage, droppableProvided }) {
    return (_jsx(Draggable, { draggableId: item._id, index: index, children: (provided, snapshot) => (_jsx("div", { ref: provided.innerRef, ...provided?.draggableProps, ...provided?.dragHandleProps, children: _jsx(DragItem, { item: item, droppableProvided: droppableProvided, updateTimeForDate: updateTimeForDate, manage: manage }) })) }));
}
