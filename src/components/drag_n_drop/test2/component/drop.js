import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
const Content = styled.div `
  background-color: ${(props) => (props.isDraggingOver ? "#f7f7f7" : "#fff")};
`;
const XDrop = ({ children, className, ...props }) => {
    return (_jsx(Droppable, { ...props, children: (provided, snapshot) => (_jsxs(Content, { ...provided.innerRef, ref: provided.innerRef, className: className, isDraggingOver: snapshot.isDraggingOver, children: [children, provided.placeholder] })) }));
};
export default XDrop;
