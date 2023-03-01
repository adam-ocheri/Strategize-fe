import React, { useEffect, useState } from 'react'
import { Draggable, DraggableProps, DraggableOptions, DraggableProvided, 
  DraggableChildrenFn, DraggableDescriptor, DraggableId, DraggableRubric, 
  DraggingState, DragActions, DragDropContext, DraggableProvidedDragHandleProps, 
  DraggableDimension, DraggableDimensionMap, DraggableProvidedDraggableProps, DraggableStateSnapshot, Position,   } from 'react-beautiful-dnd'

interface DataElement {
    id: string;
    content: string;
}

type DropReason = 'DROP' | 'CANCEL';

type DropAnimation = {
  // how long the animation will run for
  duration: number;
  // the animation curve that we will be using for the drop
  curve: string;
  // the x,y position will be be animating to as a part of the drop
  moveTo: Position;
  // when combining with another item, we animate the opacity when dropping
  opacity: number | null | undefined;
  // when combining with another item, we animate the scale when dropping
  scale: number | null | undefined;
};

const DragItem : any = ({item, provided, snapshot, className} : {item: DataElement, provided: DraggableProvided, snapshot: DraggableStateSnapshot} | any )  => {
  // const style = {
  //   ...provided.draggableProps.style,
  //   backgroundColor: snapshot.isDragging ? 'blue' : 'white',
  //   fontSize: 18,
  // };
  const [time, setTime] = useState(item.date.slice(16, 21));
  useEffect(()=>{
    if(item.date){
      setTime(item.date.slice(16, 21));
      // console.log('time is:')
      // console.log(time);
    }
  },[item.date])
  return (
    
    <div className='dragger p3 m3 b-color-dark-2'>
        <h3>{item.id}</h3>
        <h3 >{item.content}</h3>
        <input type='time' value={time} onChange={(t)=> setTime(t)}></input>
    </div>
  )
}

export default DragItem;