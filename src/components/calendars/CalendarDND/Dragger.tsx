import {useState} from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import DragItem from './DragItem'
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setActiveTask } from 'src/app/state_management/task/taskSlice';

export default function Dragger({item, index, getAllSubstations, updateTimeForDate, updateSubStation, manage, droppableProvided, isDragging} : any) {
  const dispatch = useAppDispatch();
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
            onMouseOver={()=>{setIsItemHovered(true); dispatch(setActiveTask({item}))}}
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
