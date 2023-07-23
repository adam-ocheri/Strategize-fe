import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllLTGs, getLTG } from 'src/app/state_management/LTG/LTGSlice';
//Child sub-station
import { createTask, getTask, deleteTask, getAllTasks, setActiveTask, updateTask } from 'src/app/state_management/task/taskSlice';
import Settings_Task from './Settings_Task';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import { PhoneIcon, AddIcon, WarningIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Badge, Box, Card, CardBody, CardFooter, CardHeader, Flex, Switch } from '@chakra-ui/react';
import TaskStatus from './taskStatus';
import TaskTimeManagement from 'src/app/state_management/task/taskTimeManagement';



function Task({}) {

    
    const navigator = useNavigate();
    const dispatch = useAppDispatch();

    const {activeProject} : any = useAppSelector((state) => state.project)
    const {activeLTG, data} : any = useAppSelector((state) => state.ltg)
    const {activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {activeTask} : any = useAppSelector((state : RootState) => state.task);
    const {user} : any = useAppSelector((state : RootState) => state.auth);
    
    const [originTask, setOriginTask] : any = useState(null);
    const [currentTaskIteration, setCurrentTaskIteration] = useState(activeTask?.iteration);
    const [taskCompleted, setTaskCompleted] : any = useState(activeTask.goalAchieved);
    //INIT component & data
    useEffect(() => {
        if (!activeTask?.taskName)
        {
            navigator("/project/ltg/objective");
        }
        else {
            const initData = async() => {
                await dispatch(setCurrentStationContext({newContext: 'task'}));
            }
            initData();

            if (!activeProject || !activeLTG || !activeObjective.objectiveName || activeObjective._id !== activeTask.heritage.objective.id || activeObjective.owningLTG !== activeTask.heritage.ltg.id){
                const getSuperStations = async () => {
                    await dispatch(getAllLTGs({parentId: activeProject._id, token: user.token}));
                    let stationsFound = false;

                    for (let LTG of data){
                        if (!stationsFound){
                            await dispatch(getObjective({id: activeTask.owningObjective, parentId: LTG._id, token: user.token}))
                            .then(async (response) => {
                                if (response.payload){
                                    console.log(' getting ALL LTGs for Task Tree...'); console.log(response);
                                    await dispatch(getLTG({id: response.payload.owningLTG, parentId: activeProject._id, token: user.token}));
                                    stationsFound = true;
                                }  
                            });
                        }
                        
                    }  
                }
                getSuperStations();
            }

        }
    }, [])

    useEffect(()=> {
        if(activeTask){
            if(activeTask.isSubtask){
                const getData = async () => {
                    await dispatch(getAllTasks({parentId: activeTask.owningObjective, token: user.token}))
                    .then((response: any) => {
                        if (response.payload){
                            console.log(response);
                            const [taskOrigin] = response.payload?.filter((item : any, index : number) => {
                                console.log('trying to find SubtaskOrigin....');
                                console.log(activeTask.origin === item._id);
                                console.log('Setting TaskOrigin')
                                setOriginTask(item);    
                                return activeTask.origin === item._id;
                            });
                        }
                    })
                }
                getData();  
            }
            else {
                setOriginTask(activeTask);
            } 
            setCurrentTaskIteration(activeTask.iteration);
        }    
    }, [activeTask])

    useEffect(() => {
        console.log('current TaskIteration is:');
        console.log(currentTaskIteration);
        if(activeTask && originTask !== null)
        {
            console.log('LOGGING OriginTask::')
            console.log(originTask);
            if (currentTaskIteration !== activeTask.iteration){ // TODO WTF
                console.log('currentTaskIteration !== activeTask.iteration')
                if (currentTaskIteration > 0){
                    console.log('currentTaskIteration > 0')
                    let [subTask] : any = originTask?.HISTORY_TaskIterations?.filter((item : any, index : number) => {
                        return currentTaskIteration === item.iteration
                    });
                    if (subTask){
                        console.log('subTask');
                        console.log(subTask);
                        dispatch(setActiveTask({item: subTask}))
                    } else {
                        console.log('subTask INVALID!!!!!')
                    }
                    
                }
                else{
                    dispatch(setActiveTask({item: originTask}))
                }
            }   
        }
    }, [currentTaskIteration, originTask, activeTask])

    const onSubtaskIterationChange = (direction : number)=> {
        let newIteration = activeTask.iteration + direction;
        console.log('updating Iteration...')
        console.log(newIteration >= 0 && newIteration)
        console.log(newIteration <= originTask?.HISTORY_TaskIterations?.length)
        console.log(originTask)
        const isIterationInRange = newIteration >= 0 && newIteration <= originTask?.HISTORY_TaskIterations?.length;
        isIterationInRange ? setCurrentTaskIteration(newIteration) : null;
    };

    async function updateTaskCompletionStatus(){
        console.log('Trying to updateTaskCompletionStatus!!!!!');
        const response = await dispatch(updateTask({body: {goalAchieved : !taskCompleted}, id: activeTask._id, parentId: activeTask.owningObjective, token: user.token}));
        dispatch(setActiveTask({item: response.payload}))
        console.log('TASK UPDATE RESPONSE:',response)
        setTaskCompleted(!taskCompleted);
    }
    
    return (
    <div className='pt3 mt3 m3 b-color-dark-2 white border-left-w1 border-left-white border-left-solid border-right-w1 border-right-white border-right-solid border-bottom-w1 border-bottom-white border-bottom-solid'>
        {activeLTG && activeObjective && 
        <h3 className='font-1 white station-nav-link-container b-color-dark-1'> 
            <div className='p4 m4'>
                <Link to='/project' className='station-nav-link'>{activeProject.projectName}</Link> <ArrowRightIcon/>
                <Link to='/project/ltg' className='station-nav-link'>{activeLTG.LTGName}</Link> <ArrowRightIcon/>
                <Link to='/project/ltg/objective' className='station-nav-link'>{activeObjective.objectiveName}</Link> <ArrowRightIcon/>
                <Link to='/project/ltg/objective/task' className='station-nav-link-active'>{activeTask.taskName}</Link>
            </div>
        </h3>}
        <div className='pb1 mb5 border-top-w1 border-top-white border-top-solid'></div>
        <div className=' p3 m3'>
            <section className='font-3'>
                {originTask?.HISTORY_TaskIterations?.length > 0 && <div className='centered flex f-dir-col'>
                    <div>
                        <Button_S2 onClick={() => onSubtaskIterationChange(-1)}>{'<'}</Button_S2> 
                        <span>Task Iteration</span> 
                        <Button_S2 onClick={() =>onSubtaskIterationChange(1)}>{'>'}</Button_S2>
                    </div>
                    {originTask && <div >
                        <button className={`red task-iterations ${activeTask.iteration === 0 ? 'task-iteration-active':''}`}  onClick={()=>setCurrentTaskIteration(0)}>{'O'}</button>
                        {originTask && originTask.HISTORY_TaskIterations.map((item : any) => (
                            <button 
                                className={`white task-iterations ${item.iteration === currentTaskIteration ? 'task-iteration-active':''}`} 
                                key={item._id} 
                                onClick={()=>setCurrentTaskIteration(item.iteration)}
                            >
                                    {item.iteration}
                            </button>
                        ))} 
                    </div>}
                </div>} 
                
                <div  style={{borderRadius: '10px', marginBottom: '3%'}}>
                    <Card background={'transparent'} padding={'1%'} border={'2px dashed white'} borderRadius={'10px'}>
                    {/* <h2 className='font-1 s4 white'> 
                        {activeTask.taskName} : 
                        <span className='font-5 s2 m3 orange'>{`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}`}</span>
                    </h2> */}
                        
                            
                        
                        <Flex direction={'row'} padding={'1vw'} justifyContent={'space-between'} alignSelf={''}>
                                {/* <Badge colorScheme='green' width={'fit-content'} height={'fit-content'}>Success</Badge> */}
                                
                                
                                <CardBody border={'1px solid white'} borderRadius={'10px'} alignSelf={'center'} minW={'55vw'} background={'#5f22ed'}>
                                    <h2 className='font-1 s4 white'> 
                                        {activeTask.taskName} : 
                                        <span className='font-5 s2 m3 orange'>{`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}`}</span>
                                    </h2>
                                    {activeTask.description && 
                                    <div className='font-5 s2 p3 m3'>
                                        <span className='s1 orange'> Description: </span> <span className={`s2 ml4`}>
                                            {activeTask.description}
                                        </span>
                                    </div>}
                                    <Flex direction={'row'} justifyContent={'space-between'} padding={'1vw'} margin={'1%'} >
                                        
                                        <Box as={'article'} margin={'5px'}>
                                            <Box as={'span'} margin={'5px'} className='orange font-5'>
                                                {`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}`} completed
                                            </Box>
                                            <Switch defaultChecked={taskCompleted} onChange={updateTaskCompletionStatus} margin={'5px'} colorScheme={'green'}/>
                                        </Box>
                                        <Flex direction={'column'} alignItems={'center'}>
                                            <CardHeader className='font-1 s2 white'>Status</CardHeader>
                                            <TaskStatus item={activeTask}/>
                                        </Flex>
                                    </Flex>
                                </CardBody>
                            </Flex>

                            <div className='p2 m2'>
                            <span className='s1 orange'> Date:</span>  <span className='s2 ml4 white'>
                                {`${activeTask.date !== '' ? activeTask.date.slice(0, 15) : 'No date is set yet'}`} 
                                
                            </span> 
                            <br/>
                            <br/>
                            <br/>
                            <span className='s1 orange'>
                                Start Time:</span> <span className='s2 ml4 white'>{`${activeTask.date !== '' ? activeTask.date.slice(15, 21) : 'No Time is set yet'}`} 
                                <TaskTimeManagement user={user} item={activeTask} type={'start'}/>
                            </span>
                            <br/>
                            <span className='s1 orange'>
                                End Time:</span> <span className='s2 ml4 white'>{`${activeTask.endTime !== '' ? activeTask.endTime.slice(15, 21) : 'No Time is set yet'}`} 
                                <TaskTimeManagement user={user} item={activeTask} type={'end'}/>
                            </span>
                        </div>
                    </Card>
                    
                </div>

                
                <div className='p2 m2 border-top-w0 border-top-white border-top-solid'></div>
                <article className='p2 m2'>
                    
                    
                    <div className='pb3 mb3 border-top-w0 border-top-white border-top-dashed'>
                        {/* <button onClick={(e) => {navigator('/project/ltg/objective/task/settings')}}>Settings</button> */}
                        <Settings_Task originTask={originTask} currentTaskIteration={currentTaskIteration} />
                    </div>
                </article>
            </section>
        </div>
    </div>
    )
};

export default Task;
