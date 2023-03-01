import React from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import ListItem from './DragItem'

export default function Dragger({item, index} : any) {
  return (
    <Draggable draggableId={item.id} index={index}>
        {(provided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
            <div 
                ref={provided.innerRef} 
                {...provided?.draggableProps} 
                {...provided?.dragHandleProps}    
            >       
                <ListItem item={item}/>
            </div>
        )}
    </Draggable>
  )
}
