import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { reset__Task, setActiveTask } from 'src/app/state_management/task/taskSlice';

//Child sub-station
import { createTask, getTask, updateTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import { refreshStation } from 'src/app/System/Main/Heritage/Utils/heritageUtils';
import { deleteTask_ProfileView } from 'src/app/state_management/project/projectSlice';
import { ArrowRightIcon } from '@chakra-ui/icons';
import StationAccordion from 'src/components/elements/accordions/main/StationAccordion';
import { determineSubstationTypeNameOrigin, formatName } from '../stationGlobals/stationUtils';


function Objective({}) {
    const [formData, setFormData] = useState({
        newTaskName: '',
    })
    const {newTaskName} = formData;

    const [creatingNewTask, setCreatingNewTask] = useState(false);

    const onFormUpdated = (e : Event | any) => {
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
    }
    
    const onFormSubmitted = async (e: Event | any) => {
        e.preventDefault();
        if(!newTaskName)
        {
          throw new Error ("Please enter all fields!");
        }
        else{
          console.log("trying to create new task...");
          console.log(formData);

          const heritage = {
            project: {id: activeProject._id, name: activeProject.projectName},
            ltg: {id: activeLTG._id, name: activeLTG.LTGName},
            objective: {id: activeObjective._id, name: activeObjective.objectiveName}
          }

          const response = await dispatch(createTask({taskName: newTaskName, heritage, parentId: activeObjective._id, owner: user._id, token: user.token}))
          setTaskData((prev) : any => ([...prev, response.payload]))
          setCreatingNewTask(false);
        }
    };

    const manageSelectedStation = async (e : any, id : any) => {
        console.log("trying to EDIT Task...........")
        console.log('ManagingSelected Station.....')
        console.log(id);
        await dispatch(getTask({id: id, parentId: activeObjective._id, token: user.token}));
        navigator('/project/ltg/objective/task');
    }
    
    const manageSelectedTask_Remote = async (e : any, id : any, parentObjectiveId : any, _item : any, {subTask} : any) => {
        console.log("trying to EDIT Task...........")
        console.log('manageSelectedTask_Remote!!!!!!.....')
        console.log(subTask);
        if (subTask !== null){
            console.log('SUBTASK is OK! :)');
            await dispatch(setActiveTask({item: subTask}));
        }
        else{
            console.log('SUBTASK is SHIT!!!!!!! :(');
            await dispatch(getTask({id: id, parentId: parentObjectiveId, token: user.token}));
        }
        
        navigator('/project/ltg/objective/task');
    }
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject, allUserTasks} : any = useAppSelector((state) => state.project)
    const {activeLTG} : any = useAppSelector((state) => state.ltg)
    const {activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {data, activeTask, isLoading} : any = useAppSelector((state : RootState) => state.task);
    const {user, stationContext} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if (!activeObjective.objectiveName)
        {
            navigator("/");
        }
        else {
            // reset__Task();
            const getData = async () => {
                await dispatch(setCurrentStationContext({newContext: 'objective'}));
                const response = await dispatch(getAllTasks({parentId: activeObjective._id, token: user.token}));
                setTaskData(response.payload);
            }
            getData();
        }
    }, [])

    useEffect(() => {
        setFormData({newTaskName: ''});
    } , [creatingNewTask])

    const [taskData, setTaskData] = useState([]);

    useEffect(()=> {

        refreshStation('objective', activeObjective, allUserTasks, setTaskData);

    }, [allUserTasks])

    const [stationTypeName, setStationTypeName] = useState('');

    useEffect(() => {

    }, [activeObjective])

    async function deleteSingleTask(Task : any){
        const response = await dispatch(deleteTask({id: Task._id, parentId: activeObjective._id, owner: user._id, token: user.token}));
        dispatch(deleteTask_ProfileView({task: response.payload}));
    }
    
    return (
    <div className='pt3 mt3 m3 b-color-dark-2 white border-left-w1 border-left-white border-left-solid border-right-w1 border-right-white border-right-solid border-bottom-w1 border-bottom-white border-bottom-solid'>
            <h3 className='font-1 white station-nav-link-container b-color-dark-1'>
                <div className='p4 m4'>
                    <Link to='/project' className='station-nav-link'>{activeProject.projectName}</Link> <ArrowRightIcon/>
                    <Link to='/project/ltg' className='station-nav-link'>{activeLTG.LTGName}</Link> <ArrowRightIcon/>
                    <Link to='/project/ltg/objective' className='station-nav-link-active'>{activeObjective.objectiveName}</Link>
                    {/* <Link to='/project/ltg/objective/task' className='station-nav-link-active'>{activeTask.taskName}</Link> */}
                </div>
            </h3>
            <div className='pb1 mb5 border-top-w1 border-top-white border-top-solid'></div>
        <section className='p1 m1'>
            
            {/* <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link> {'>'} <Link to='/project/ltg/objective'>{activeObjective.objectiveName}</Link> </h3> */}
            <h2 className='font-1 s4'> 
                {activeObjective.objectiveName} : 
                <span className='font-5 s2 m3 orange'>{activeObjective.stationTypeName} </span>
            </h2>
            <div>
                <Button_S2 onClick={(e : any) => {navigator('/project/ltg/objective/settings')}}>Settings</Button_S2>
            </div>
        </section>
        <section className='p3 m3 border-top-w1 border-top-white border-top-solid'>
            <h3 className='s3 font-4'> {
                    determineSubstationTypeNameOrigin({scope: 'Task', activeProject, activeLTG, activeObjective})
                }{'s'}
            </h3>
            {data && <div className='p3 m3 font-5 border-bottom-w0 border-bottom-white border-bottom-solid'>
                <CalendarDND 
                    data={taskData} 
                    getAllSubstations={async () => {await dispatch(getAllTasks({parentId: activeObjective._id, token: user.token}))}} 
                    updateSubStation={updateTask} 
                    dispatch={dispatch} 
                    user={user} 
                    manage={manageSelectedTask_Remote}
                    activeTask={activeTask}
                    currentContext={stationContext}
                />
                <article>
                    <div className='flex f-dir-col jt-center j-even border-white border-w2 border-solid border-r3 b-color-dark-1 white p7 m7'>
                        {!creatingNewTask && 
                        <a  onClick={()=>setCreatingNewTask(true)}>
                            <p className='s4'>+</p>
                            <Button_S2 className='s2 p2' onClick={()=>setCreatingNewTask(true)}> 
                                Add New {/*Task*/} {
                                    determineSubstationTypeNameOrigin({scope: 'Task', activeProject, activeLTG, activeObjective})

                                }  
                            </Button_S2>  
                        </a>}
                       {creatingNewTask && <form className='flex f-dir-col m7 p7' onSubmit={(e) => onFormSubmitted(e)}>
                            <h3 className='font-1 s3'>
                                Create New {/*Task*/} {
                                    determineSubstationTypeNameOrigin({scope: 'Task', activeProject, activeLTG, activeObjective})
                                } 
                            </h3>
                            <input className="form-input" type="text" placeholder="Task Name" id="newTaskName" 
                                name="newTaskName" value={newTaskName} onChange={(e) => {onFormUpdated(e)}}/>
                            <Button_S2 className={'s2'} type='submit'>Create New</Button_S2>
                            <Button_S2 className={'s2'} onClick={()=> setCreatingNewTask(false)}>Cancel</Button_S2>
                        </form> }
                    </div>

                    <StationAccordion title={`${activeObjective.objectiveName}`}>
                        {data && data.map((Task : any) => (<div key={Task._id} className='flex j-between p3 m3 pl7 pr7 ml7 mr7 border-white border-w1 border-solid border-r2 b-color-dark-1'>
                            <h4 className='font-5'>{/*Task*/} {
                                    activeObjective.defaults ? 
                                    formatName(activeObjective.defaults.taskStation_TypeName, false) : 
                                    formatName(activeProject.defaults.taskStation_TypeName, false) 
                                } 
                                <span className='font-2 s2'> {': '}{Task.taskName} </span>
                            </h4>
                            <span>
                                <Button_S2 onClick={(e : any) => {manageSelectedStation(e, Task._id)}}> Manage </Button_S2>
                                <Button_S2 onClick={() => {deleteSingleTask(Task)}}>Delete</Button_S2>
                            </span>
                        </div>))}
                    </StationAccordion>
                    
                </article>
                
            </div>}
        </section>
    </div>
    )
};

export default  Objective
