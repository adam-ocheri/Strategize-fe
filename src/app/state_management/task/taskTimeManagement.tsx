import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'src/app/hooks';
import { getTask, setActiveTask, updateTask } from './taskSlice';
import { updateTask_ProfileView } from '../project/projectSlice';
import { getObjective } from '../objective/objectiveSlice';

export default function TaskTimeManagement({user, item, type} : any) {

    const dispatch = useAppDispatch();

    const [timeType, setTimeType] = useState<string>(type)
    const [time, setTime] = useState('');

    const refreshStationData = async (updatedTask : any) => {

        console.log('Triggered profile view task update!!! | Updated Task is: ', updatedTask)
        return await dispatch(updateTask_ProfileView({task: updatedTask}));
    }

    // Update Task Time
    const updateTaskTime = async (date : any, newTime : any, id : any, parentId : any) => {
        console.log('TRYING TO: UpdateTaskTime', newTime);

        let body = {};

        setTime(newTime)

        if (item.isSubtask){

            //TODO Subtask update - update algorithm needs refactoring and generalization
            let sIndex = 0;
            let taskOrigin : any;

            await dispatch(getTask({id: item.origin, parentId: parentId, token: user.token})).then((response : any) => {
                taskOrigin = response.payload;
            })

            const newArray = taskOrigin.HISTORY_TaskIterations.filter((doc : any, index : number) => {
                if (doc._id === id){
                    sIndex = index;
                }
                return doc._id !== id
            });
            
            const newDateAndTime = date.slice(0, 16) + newTime + date.slice(21);
            let updatedSubtask = {...item};
            type === "start" ? updatedSubtask.date : updatedSubtask.endTime = newDateAndTime;
            newArray.splice(sIndex, 0, updatedSubtask);
            body = {HISTORY_TaskIterations: newArray};
            const response = await dispatch(updateTask({body, id: item.origin, parentId: parentId, token: user.token}));
            await dispatch(setActiveTask({item: response.payload}))
            await refreshStationData(response.payload);
        }
        else {
            const newTaskTime = date.slice(0, 16) + newTime + date.slice(21);
            console.log('newTaskTime IS:', newTaskTime)
            body = type === "start" ? {date: newTaskTime} : {endTime: newTaskTime};
            const res = await dispatch(updateTask({body, id: id, parentId: parentId, token: user.token}))
            console.log('UPDATE TIME RESPONSE Incoming: ', res, body)
            await dispatch(getObjective({id: item.owningObjective, parentId: item.heritage.ltg.id, owner: user._id, token: user.token}));
            await dispatch(setActiveTask({item: res.payload}))
            await refreshStationData(res.payload)
        }
    }

    useEffect(() => {
        setTime(timeType == 'start' ? item.date.slice(16, 21) : item.endTime.slice(16, 21));
    }, [item])
  return (
    <div style={{maxWidth: '200px'}}>
        <input className='mb5 time-input jt-center font-11' type='time' value={time} onChange={async (t)=> updateTaskTime(item.date, t.target.value, item._id, item.owningObjective)}/>
    </div>
  )
}
