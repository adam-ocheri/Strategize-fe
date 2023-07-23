import React, { ReactNode } from 'react'
import { Droppable, Draggable, DraggableProvided ,DroppableProvided, DraggableStateSnapshot, DraggableChildrenFn } from 'react-beautiful-dnd'
import Dragger from './Dragger'
import Calendar from 'react-calendar'
import { Flex } from '@chakra-ui/react'

export default function Dropper({items , droppableId , type, children, getAllSubstations, updateTime, manage, isDragging, isDropDisabled=false, notifyItemHovered, spacer} : 
  {items : any, droppableId : string, type: string, children? : ReactNode, getAllSubstations : any, updateTime : any, manage : any, isDragging : boolean, isDropDisabled : boolean, notifyItemHovered: any, spacer: string}) {
  return (
    <Droppable droppableId={droppableId} type={type} isDropDisabled={isDropDisabled}>
            {(provided : DroppableProvided, snapshot : any) => (
                <div {...provided.droppableProps} ref={provided.innerRef} {...provided.innerRef} className='normalize-content'>
                    {items.map((item : any, index : any | number) => (
                      <div key={item._id}>
                      <Dragger  item={item} index={index} getAllSubstations={getAllSubstations} updateTimeForDate={updateTime} manage={manage} droppableProvided={provided} isDragging={isDragging} notifyItemHovered={notifyItemHovered}/>
                      {spacer && spacer === item._id &&
                        <Flex minH={'10vh'} margin={'10vh'}>

                        </Flex> }
                      </div>
                    ))}
                    {provided.placeholder}
                </div>
            )}
    </Droppable>
  )
}
