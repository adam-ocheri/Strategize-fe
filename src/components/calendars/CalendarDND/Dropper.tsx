import React, { ReactNode } from 'react'
import { Droppable, Draggable, DraggableProvided ,DroppableProvided, DraggableStateSnapshot, DraggableChildrenFn } from 'react-beautiful-dnd'
import Dragger from './Dragger'
import Calendar from 'react-calendar'

export default function Dropper({items , droppableId , type, children, updateTime, manage} : {items : any, droppableId : string, type: string, children? : ReactNode, updateTime : any, manage : any}) {
  return (
    <Droppable droppableId={droppableId} type={type}>
            {(provided : DroppableProvided, snapshot : any) => (
                <div {...provided.droppableProps} ref={provided.innerRef} {...provided.innerRef} className='normalize-content'>
                    {items.map((item : any, index : any | number) => (
                      <Dragger key={item._id} item={item} index={index} updateTimeForDate={updateTime} manage={manage} droppableProvided={provided}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
    </Droppable>
  )
}
