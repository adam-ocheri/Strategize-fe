import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Droppable } from 'react-beautiful-dnd';
import Dragger from './Dragger';
import { Flex } from '@chakra-ui/react';
export default function Dropper({ items, droppableId, type, children, getAllSubstations, updateTime, manage, isDragging, isDropDisabled = false, notifyItemHovered, spacer }) {
    return (_jsx(Droppable, { droppableId: droppableId, type: type, isDropDisabled: isDropDisabled, children: (provided, snapshot) => (_jsxs("div", { ...provided.droppableProps, ref: provided.innerRef, ...provided.innerRef, className: 'normalize-content', children: [items.map((item, index) => (_jsxs("div", { children: [_jsx(Dragger, { item: item, index: index, getAllSubstations: getAllSubstations, updateTimeForDate: updateTime, manage: manage, droppableProvided: provided, isDragging: isDragging, notifyItemHovered: notifyItemHovered }), spacer && spacer === item._id &&
                            _jsx(Flex, { minH: '10vh', margin: '10vh' })] }, item._id))), provided.placeholder] })) }));
}
