import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import mongoose from 'mongoose';
import { DraggableProvided, DraggableStateSnapshot, DroppableProvided, Position } from 'react-beautiful-dnd'
import Button_S1 from 'src/components/elements/buttons/Button_S1/Button_S1';
import { getTask } from 'src/app/state_management/task/taskSlice';



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

const DragItem : any = ({item, getAllSubstations, updateTimeForDate, updateSubStation, droppableProvided, manage, snapshot, className} : {item: DataElement , droppableProvided: DroppableProvided, snapshot: DraggableStateSnapshot} | any )  => {
  // const style = {
  //   ...provided.draggableProps.style,
  //   backgroundColor: snapshot.isDragging ? 'blue' : 'white',
  //   fontSize: 18,
  // };
  const dispatch = useAppDispatch();
  const {user} : any = useAppSelector((state) => state.auth);
  const {activeTask} : any = useAppSelector((state) => state.task);

  const [time, setTime] = useState(item.date.slice(16, 21));
  const [isItemHovered, setIsItemHovered] = useState(false);
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

  const addNewIteration = async () => {
    
    let historyArray : any[] = [];
    if( item.isSubtask ){
      await dispatch(getTask({id: item.origin, parentId: item.owningObjective, token: user.token})).then((response) => {
        historyArray = [...response.payload.HISTORY_TaskIterations];
      });
    }
    
    // const initBody = item.isSubtask ? {} : {iteration: item.iteration + 1};
    // await dispatch(updateSubStation({body : initBody, id: id, parentId: item.owningObjective, token: user.token}))

    

    
    let newIteration = {};

    for (let field in item){
      console.log('LOGGING FIELDs in item........');
      console.log(field + ': ');
      console.log(item[field]);
      // Exclude out the ID, date, and TaskIterations array of the original item from the copy
      if (field !== 'HISTORY_TaskIterations')
      {
        // if (field === 'iteration'){
        //   Object.defineProperty(newIteration, field, {value: item[field], writable: true, enumerable: true, configurable: true})
        // }
        if (field === '_id'){
          if(!item.isSubtask){
            Object.defineProperty(newIteration, 'origin', {value: item[field], writable: true, enumerable: true, configurable: true})
            Object.defineProperty(newIteration, 'isSubtask', {value: true, writable: true, enumerable: true, configurable: true})
          }
          Object.defineProperty(newIteration, field, {value: new mongoose.Types.ObjectId(), writable: true, enumerable: true, configurable: true})
        }
        else if (field === 'date'){
          Object.defineProperty(newIteration, field, {value: '', writable: true, enumerable: true, configurable: true})
        }
        else{
          Object.defineProperty(newIteration, field, {value: item[field], writable: true, enumerable: true, configurable: true})
        } 
      }
    }
    const newArray = item.isSubtask ? [...historyArray] : [...item.HISTORY_TaskIterations];
    const body = {HISTORY_TaskIterations: [...newArray, newIteration]};
    const id = item.isSubtask ? item.origin : item._id;

    await dispatch(updateSubStation({body, id: id, parentId: item.owningObjective, token: user.token}))
    await getAllSubstations();
  }

  return (
    
    <div className={`dragger p3 m3 b-color-dark-2 ${isItemHovered ? 'drag-hover' : ''}`} onMouseOver={()=>setIsItemHovered(true)} onMouseLeave={()=>setIsItemHovered(false)} onMouseDown={() => setIsItemHovered(false)}>
        {/* {item.date !== '' ? <span className='circle-clicker-active' onClick={addNewIteration}> + </span> : <span className='circle-clicker-inactive'> + </span>} */}
        <h3 >{item.taskName}</h3>
  
        <input className='time-input jt-center font-11' type='time' value={time} onChange={(t)=> updateTime(t)}></input>
        <a className='p1 m1 b-color-white border-r2' href='#' onClick={(e : any) => manage(e, item._id, item.owningObjective)}>Manage</a>
        
    </div>
  )
}

export default DragItem;