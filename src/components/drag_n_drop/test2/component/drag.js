import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
const XDrag = ({ className, children, dragAll, ...props }) => {
    console.log(React.isValidElement(children));
    if (!React.isValidElement(children))
        return _jsx("div", {});
    return (_jsx(Draggable, { ...props, children: (provided) => {
            //const dragHandleProps = dragAll ? provided.dragHandleProps : {};
            //const dragHandleProps : DraggableProvidedDragHandleProps | null | undefined = provided.dragHandleProps;
            return (_jsx("div", { className: className, ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, children: React.cloneElement(children, { ...provided.innerRef }) }));
        } }));
};
XDrag.defaultProps = {
    dragAll: true
};
export default XDrag;
