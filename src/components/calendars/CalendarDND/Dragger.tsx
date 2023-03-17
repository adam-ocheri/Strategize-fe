import {useState} from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import DragItem from './DragItem'
import { useAppSelector } from 'src/app/hooks';

export default function Dragger({item, index, getAllSubstations, updateTimeForDate, updateSubStation, manage, droppableProvided, isDragging} : any) {
  const {activeTask} : any = useAppSelector((state) => state.task);
  const [isItemHovered, setIsItemHovered] = useState(false);
  return (
    <Draggable draggableId={item._id} index={index}>
        {(provided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
          <div 
              ref={provided.innerRef} 
              {...provided?.draggableProps} 
              {...provided?.dragHandleProps}
              className={`${item.date && isItemHovered && !isDragging ? 'drag-hover' : isDragging && activeTask._id === item._id ? 'drag-allow' : ''}`}
              onMouseEnter={()=>setIsItemHovered(true)}
              onMouseLeave={()=>setIsItemHovered(false)}    
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
