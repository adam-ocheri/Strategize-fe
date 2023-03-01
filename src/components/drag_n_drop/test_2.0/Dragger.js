import { jsx as _jsx } from "react/jsx-runtime";
import { Draggable } from 'react-beautiful-dnd';
import ListItem from './DragItem';
export default function Dragger({ item, index }) {
    return (_jsx(Draggable, { draggableId: item.id, index: index, children: (provided, snapshot) => (_jsx("div", { ref: provided.innerRef, ...provided?.draggableProps, ...provided?.dragHandleProps, children: _jsx(ListItem, { item: item }) })) }));
}
