import React, { ReactNode } from 'react'
import { Droppable, Draggable, DraggableProvided ,DroppableProvided, DraggableStateSnapshot, DraggableChildrenFn } from 'react-beautiful-dnd'
import Dragger from './Dragger'
import Calendar from 'react-calendar'

export default function Dropper({items , droppableId , type, children} : {items : any, droppableId : string, type: string, children? : ReactNode}) {
  return (
    <Droppable droppableId={droppableId} type={type}>
            {(provided : DroppableProvided, snapshot : any) => (
                <div {...provided.droppableProps} ref={provided.innerRef} {...provided.innerRef}>
                    {items.map((item : any, index : any | number) => (
                      <Dragger key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
    </Droppable>
  )
}
