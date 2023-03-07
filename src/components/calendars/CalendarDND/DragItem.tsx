import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { DraggableProvided, DraggableStateSnapshot, DroppableProvided, Position } from 'react-beautiful-dnd'
import Button_S1 from 'src/components/elements/buttons/Button_S1/Button_S1';

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

const DragItem : any = ({item, updateTimeForDate, droppableProvided, manage, snapshot, className} : {item: DataElement, droppableProvided: DroppableProvided, snapshot: DraggableStateSnapshot} | any )  => {
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
  },[])

  const updateTime : any = async (t : any) => {
    setTime(t.target.value);
    console.log('trying to update time...');
    console.log(droppableProvided.droppableId);
    // item.date = item.date.slice(0, 16) + t.target.value + item.date.slice(21);
    if (item.date === ''){
      // await updateTimeForDate(droppableProvided.droppableId, t.target.value, item._id);
      return;
    }

    await updateTimeForDate(item.date, t.target.value, item._id, item.owningObjective)
    console.log('time is:')
    console.log(t.target.value);
    console.log('date is:')
    console.log(item.date);
  }

  return (
    
    <div className='dragger p3 m3 b-color-dark-2'>
        <h3 >{item.taskName}</h3>

        <input type='time' value={time} onChange={(t)=> updateTime(t)}></input>
        <a className='p1 m1 b-color-white border-r2' href='#' onClick={(e : any) => manage(e, item._id, item.owningObjective)}>Manage</a>
        
    </div>
  )
}

export default DragItem;