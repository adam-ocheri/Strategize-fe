import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { IColumn, ITask } from "../static/data";
import XDrag from "./drag";
import XDrop from "./drop";

const CSS = styled.div`
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

interface IXColumn {
  className?: string;
  column: IColumn;
  tasks: ITask[];
  provided?: DraggableProvided;
}

const XColumn: FC<IXColumn> = ({ column, tasks, provided }) => {
  return (
    <CSS>
      <h3 {...provided?.dragHandleProps}>{column.title}</h3>
      <XDrop droppableId={column.id} type="TASK" className="task-drop">
        {tasks.map((task, index) => (
          <XDrag draggableId={task.id} index={index} key={task.id}>
            <div className="card">{task.id}</div>
          </XDrag>
        ))}
      </XDrop>
    </CSS>
  );
};

export default XColumn;
