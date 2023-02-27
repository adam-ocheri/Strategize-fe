import React, { FC, ReactNode } from "react";
import { Draggable, DraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface IXDrag extends Omit<DraggableProps, "children"> {
  className?: string;
  children: ReactNode;
  dragAll?: boolean;
}

const XDrag: FC<IXDrag> = ({ className, children, dragAll, ...props }) => {
  console.log(React.isValidElement(children));
  if (!React.isValidElement(children)) return <div />;
  return (
    <Draggable {...props}>
      {(provided) => {
        //const dragHandleProps = dragAll ? provided.dragHandleProps : {};
        //const dragHandleProps : DraggableProvidedDragHandleProps | null | undefined = provided.dragHandleProps;
        return (
          <div
            className={className}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {React.cloneElement(children, { ...provided.innerRef })}
          </div>
        );
      }}
    </Draggable>
  );
};

XDrag.defaultProps = {
  dragAll: true
};

export default XDrag;
