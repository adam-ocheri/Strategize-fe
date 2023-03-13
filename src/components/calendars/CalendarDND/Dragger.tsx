import React from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import DragItem from './DragItem'

export default function Dragger({item, index, getAllSubstations, updateTimeForDate, updateSubStation, manage, droppableProvided, isDragging} : any) {
  return (
    <Draggable draggableId={item._id} index={index}>
        {(provided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
          <div 
              ref={provided.innerRef} 
              {...provided?.draggableProps} 
              {...provided?.dragHandleProps}    
          >       
              <DragItem 
                item={item} 
                droppableProvided={droppableProvided} 
                getAllSubstations={getAllSubstations} 
                updateTimeForDate={updateTimeForDate} 
                updateSubStation={updateSubStation} 
                manage={manage}
                isDragging={isDragging}
              />
          </div>
        )}
    </Draggable>
  )
}
