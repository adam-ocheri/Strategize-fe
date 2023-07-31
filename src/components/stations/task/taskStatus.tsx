import { Badge, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

export default function TaskStatus({item} : any) {

const [activeBadges, setActiveBadges] = useState({
  fresh: false,
  inProgress: false,
  success: false, 
  overdue: false
})
const {fresh, inProgress, success, overdue} = activeBadges;

useEffect(()=>{
  reportBadgesStatus();
},[item])
  
const reportBadgesStatus = () => {

  const currentDate = new Date();
  console.log('hello Time!!!');
  const createdAt = item.createdAt.toString();
  const year = createdAt.slice(0, 4);
  const month = createdAt.slice(5, 7);
  const day = createdAt.slice(8, 10);
  const formatted = `${month.length > 1 && month[0] == 0 ? month[1] : month }/${day.length > 1 && day[0] == 0 ?  day[1] : day }/${year}`;
  console.log(formatted.toLocaleLowerCase(), currentDate.toLocaleDateString())

  const initDate = formatted.toString();
  const presentDate = currentDate.toLocaleDateString().toString();
  const isNew : boolean = initDate == presentDate;

  if (item.goalAchieved === true){
    setActiveBadges((prev : any) => ({success: true, inProgress: false, overdue: false, fresh: false}))
  }
  else if (isNew){
    setActiveBadges((prev : any) => ({...prev, success: false, fresh: true}))
  }
  else if (item.date !== '' && item.date.length > 10 && !isNew){
    
    const taskDueDate = new Date(item.date);

    
    if(taskDueDate < currentDate && !item.goalAchieved){
      const taskDueTime = new Date(item.endTime)
      
      if (taskDueDate < currentDate && taskDueTime > currentDate && item.endTime !== ''){
        console.log('CHECKING IF TASK TIME IS OVERDUE OR IN PROGRESS...');
    console.log(taskDueTime, currentDate)
    console.log('taskDueTime > currentDate',taskDueTime > currentDate)
        setActiveBadges((prev : any) => ({...prev, inProgress: true, overdue: false}))
      } else{
        setActiveBadges((prev : any) => ({...prev, overdue: true, inProgress: false}))
      }
    }
  }

  
  
};
  return (
    <div className='m1'>
      <Stack direction='row' >
        {inProgress && <Badge colorScheme='orange'>In Progress</Badge>}
        {success && <Badge colorScheme='green'>Success</Badge>}
        {overdue && <Badge colorScheme='red'>Overdue</Badge>}
        {fresh && <Badge colorScheme='purple'>New</Badge>}
      </Stack>
    </div>
  )
}
