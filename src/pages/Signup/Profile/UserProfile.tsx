import { Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { getLTG } from 'src/app/state_management/LTG/LTGSlice';
import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllProjectsAndSubstations, getProject } from 'src/app/state_management/project/projectSlice';
import { getAllTasks, getTask, setActiveTask, updateTask } from 'src/app/state_management/task/taskSlice';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';

//! Should add ability to archive completed stations!

export default function UserProfile() {

  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const {user, stationContext, isLoading : Loading_User} : any = useAppSelector((state) => state.auth);
  const {activeProject, allUserTasks, isLoading : Loading_Project} : any = useAppSelector((state)=> state.project);
  const {activeLTG, isLoading : Loading_LTG} : any = useAppSelector((state)=> state.ltg);
  const {activeObjective, isLoading : Loading_Objective} : any = useAppSelector((state)=> state.objective);
  const {activeTask, isLoading : Loading_Task} : any = useAppSelector((state)=> state.task);

  // const intervalUpdate = () => {
  //   const currentTime = new Date();
  //   console.log("TIME IS: ", currentTime.toString().slice(0, 21));
  //   console.log(" COME ON!!! ");
  //   console.log('allUserTasks, ', allUserTasks)
    
  //   // for (let task in allUserTasks){
  //   //   //console.log('IN-2 TASK LOOP...')
  //   //   console.log(" Looping over Task, ", task);
  //   //   console.log(allUserTasks[task].date.slice(0, 21) , "|", currentTime.toString().slice(0, 21));
  //   //   if (allUserTasks[task].date.slice(0, 21) == currentTime.toString().slice(0, 21))
  //   //   {
  //   //     console.log("Should now play audio")
  //   //   }
  //   // }

  //   console.log(allUserTasks)
  //   const [nr] = allUserTasks.filter((task: any ) => task.date.toString().slice(0, 21) == currentTime.toString().slice(0, 21));
  //   console.log ("NR is:" ,nr);
  //   if(nr){
  //     const notification = new Audio('/notify.wav');
  //     notification.play();
  //   }
  // }

  useEffect(() => {
    if (!user){
      navigator('/')
    }
      const initData = async () => {
          await dispatch(setCurrentStationContext({newContext: 'profile'}));
          await dispatch(getAllProjectsAndSubstations({owner: user._id, token: user.token}));
      }
      initData();

    
  }, [])

  // useEffect(()=> {
  //     console.log('allUserTasks UPDATED!')
  //     console.log(allUserTasks);

  //     const timer = setInterval(intervalUpdate, 10000)

  //   return () => {
  //     clearInterval(timer)
  //   }

  // }, [allUserTasks])

  useEffect(()=> {
    console.log('stationContext Changed:');
    console.log(stationContext);
  }, [stationContext])

  const manageSelectedTask_Remote = async (e : any, id : any, parentObjectiveId : any, item: any, {subTask} : any) => {
    console.log("trying to EDIT Task...........")
    console.log('manageSelectedTask_Remote!!!!!!.....')
    console.log(subTask);

    await dispatch(getObjective({id: item.heritage.objective.id, parentId: item.heritage.ltg.id, token: user.token}));
    await dispatch(getLTG({id: item.heritage.ltg.id, parentId: item.heritage.project.id, token: user.token}));
    await dispatch(getProject({id: item.heritage.project.id, token: user.token}));

    if (subTask !== null){
        await dispatch(setActiveTask({item: subTask}));
    }
    else{
        await dispatch(getTask({id: id, parentId: parentObjectiveId, token: user.token}));
    }
    
    navigator('/project/ltg/objective/task');
  }

  // if (Loading_User || Loading_Project || Loading_LTG || Loading_Objective){
  //   return (<div className='p7 m7'>
  //     <p className=' p7 m7'>
  //       Loading Data...
  //     </p>
  //   </div>);
  // }
  return (
    <div>
      <div className='flex j-center p4 m4'>
        <div className='flex f-dir-row j-even f-basis-5 p4 m4'>
          {Loading_Project && <h2 className='s3 font-6'>Refreshing Projects Data . . .</h2>}
          <Spinner size={"xl"} color='aqua' hidden={!Loading_Project} className='pt7 mt7'/>
        </div>
      </div>
      <CalendarDND 
        data={allUserTasks} 
        getAllSubstations={async () => {await dispatch(getAllProjectsAndSubstations({owner: user._id, token: user.token}))}} 
        updateSubStation={updateTask} 
        dispatch={dispatch} 
        user={user} 
        manage={manageSelectedTask_Remote}
        activeTask={activeTask}
        currentContext={'profile'}
      />
    </div>
  )
}
