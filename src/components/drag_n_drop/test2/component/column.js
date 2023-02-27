import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import XDrag from "./drag";
import XDrop from "./drop";
const CSS = styled.div `
  width: 30vw;
  min-height: 50vw;
  border: 1px solid lightgray;
  background-color: #fff;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .task-drop {
    padding: 5px;
  }
  .card {
    width: 27vw;
    border: 1px solid lightgray;
    margin-bottom: 0.5em;
    background-color: #fff;
  }
`;
const XColumn = ({ column, tasks, provided }) => {
    return (_jsxs(CSS, { children: [_jsx("h3", { ...provided?.dragHandleProps, children: column.title }), _jsx(XDrop, { droppableId: column.id, type: "TASK", className: "task-drop", children: tasks.map((task, index) => (_jsx(XDrag, { draggableId: task.id, index: index, children: _jsx("div", { className: "card", children: task.id }) }, task.id))) })] }));
};
export default XColumn;
