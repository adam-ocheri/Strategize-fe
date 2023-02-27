import { jsx as _jsx } from "react/jsx-runtime";
import "./styles.css";
import XDrop from "./component/drop";
import XDrag from "./component/drag";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import styled from "styled-components";
import { initialData } from "./static/data";
import XColumn from "./component/column";
import { addTask, deleteTask, onChange } from "./utils";
const CSS = styled.div `
  .column-content {
    display: flex;
  }
`;
export default function DND_Container() {
    const [data, setData] = useState(initialData);
    const onDragEnd = (res) => {
        const { source, destination, draggableId } = res;
        if (!destination)
            return;
        if (onChange(source, destination))
            return;
        if (res.type === "TASK") {
            let newData = deleteTask(data, source);
            newData = addTask(newData, destination, draggableId);
            setData(newData);
        }
        if (res.type === "COLUMN") {
            let columnOrder = [...data.columnOrder];
            columnOrder.splice(source.index, 1);
            columnOrder.splice(destination.index, 0, draggableId);
            data.columnOrder = columnOrder;
            setData({ ...data });
        }
    };
    return (_jsx(CSS, { className: "App", children: _jsx(DragDropContext, { onDragEnd: onDragEnd, children: _jsx(XDrop, { className: "column-content", droppableId: "all-columns", type: "COLUMN", direction: "horizontal", children: data.columnOrder.map((columnId, index) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
                    return (_jsx(XDrag, { draggableId: columnId, index: index, dragAll: false, children: _jsx(XColumn, { column: column, tasks: tasks }) }, columnId));
                }) }) }) }));
}
