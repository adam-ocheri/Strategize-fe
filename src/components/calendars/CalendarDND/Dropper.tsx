import React, { ReactNode } from 'react'
import { Droppable, Draggable, DraggableProvided ,DroppableProvided, DraggableStateSnapshot, DraggableChildrenFn } from 'react-beautiful-dnd'
import Dragger from './Dragger'
import Calendar from 'react-calendar'

export default function Dropper({items , droppableId , type, children, getAllSubstations, updateTime, manage, isDragging, isDropDisabled=false} : 
  {items : any, droppableId : string, type: string, children? : ReactNode, getAllSubstations : any, updateTime : any, manage : any, isDragging : boolean, isDropDisabled : boolean}) {
  return (
    <Droppable droppableId={droppableId} type={type} isDropDisabled={isDropDisabled}>
            {(provided : DroppableProvided, snapshot : any) => (
                <div {...provided.droppableProps} ref={provided.innerRef} {...provided.innerRef} className='normalize-content'>
                    {items.map((item : any, index : any | number) => (
                      <Dragger key={item._id} item={item} index={index} getAllSubstations={getAllSubstations} updateTimeForDate={updateTime} manage={manage} droppableProvided={provided} isDragging={isDragging}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
    </Droppable>
  )
}
