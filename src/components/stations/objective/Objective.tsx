import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { reset__Task } from 'src/app/state_management/task/taskSlice';

//Child sub-station
import { createTask, getTask, updateTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';




function Objective({}) {
    const [formData, setFormData] = useState({
        newTaskName: '',
    })
    const {newTaskName} = formData;

    const [showData, setShowData] = useState(true);

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
          console.log("trying to login...");
          console.log(formData);
          await dispatch(createTask({taskName: newTaskName, parentId: activeObjective._id, owner: user._id, token: user.token}))
          setCreatingNewTask(false)
        }
    };

    const manageSelectedStation = async (e : any, id : any) => {
        console.log("trying to EDIT Task...........")
        console.log('ManagingSelected Station.....')
        console.log(id);
        await dispatch(getTask({id: id, parentId: activeObjective._id, token: user.token}));
        navigator('/project/ltg/objective/task');
    }
    
    const manageSelectedTask_Remote = async (e : any, id : any, parentObjectiveId : any) => {
        console.log("trying to EDIT Task...........")
        console.log('manageSelectedTask_Remote.....')
        console.log(id);
        await dispatch(getTask({id: id, parentId: parentObjectiveId, token: user.token}));
        navigator('/project/ltg/objective/task');
    }
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {activeLTG} : any = useAppSelector((state) => state.ltg)
    const {activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {data, activeTask, isLoading} : any = useAppSelector((state : RootState) => state.task);
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if (!activeObjective.objectiveName)
        {
            navigator("/");
        }
        else {
            // reset__Task();
            const getData = async () => await dispatch(getAllTasks({parentId: activeObjective._id, token: user.token}));
            getData();
        }
    }, [])

    useEffect(() => {
        setFormData({newTaskName: ''});
    } , [creatingNewTask])
    
    return (
    <div className='pt7 mt7 p3 m3 b-color-dark-2 white'>
        <section>
            <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link> {'>'} <Link to='/project/ltg/objective'>{activeObjective.objectiveName}</Link> </h3>
            <h2 className='font-1 s4'> 
                {activeObjective.objectiveName} : 
                <span className='font-5 s2 m3 orange'>{`${activeObjective.stationTypeName ? activeObjective.stationTypeName : activeObjective.stationType ? activeObjective.stationType : 'Objective'}`} </span>
            </h2>
            <div>
                <Button_S2 onClick={(e : any) => {navigator('/project/ltg/objective/settings')}}>Settings</Button_S2>
            </div>
        </section>
        <section className='p3 m3 border-top-w1 border-top-white border-top-solid'>
            <h3 className='s3 font-4'> Tasks </h3>
            {data && <div className='p3 m3 font-5 border-bottom-w0 border-bottom-white border-bottom-solid'>
                <CalendarDND 
                    data={data} 
                    getAllSubstations={async () => {await dispatch(getAllTasks({parentId: activeObjective._id, token: user.token}))}} 
                    updateSubStation={updateTask} 
                    dispatch={dispatch} 
                    user={user} 
                    manage={manageSelectedTask_Remote}
                    activeTask={activeTask}
                />
                <article>
                    <div className='flex f-dir-col jt-center j-even border-white border-w2 border-solid border-r3 b-color-dark-1 white p7 m7'>
                        {!creatingNewTask && 
                        <a  onClick={()=>setCreatingNewTask(true)}>
                            <p className='s4'>+</p>
                            <Button_S2 className='s2 p2' onClick={()=>setCreatingNewTask(true)}> 
                                Add New Task 
                            </Button_S2>  
                        </a>}
                       {creatingNewTask && <form className='flex f-dir-col m7 p7' onSubmit={(e) => onFormSubmitted(e)}>
                            <h3 className='font-1 s3'>Create New Task</h3>
                            <input className="form-input" type="text" placeholder="Task Name" id="newTaskName" 
                                name="newTaskName" value={newTaskName} onChange={(e) => {onFormUpdated(e)}}/>
                            <Button_S2 className={'s2'} type='submit'>Create New</Button_S2>
                            <Button_S2 className={'s2'} onClick={()=> setCreatingNewTask(false)}>Cancel</Button_S2>
                        </form> }
                    </div>

                    <input type='checkbox' id='collapse' checked={showData} onChange={() => setShowData(!showData)}></input> 
                    <label htmlFor='collapse'> View All Tasks </label>

                    {showData && data && data.map((Task : any) => (<div key={Task._id} className='flex j-between p3 m3 pl7 pr7 ml7 mr7 border-white border-w1 border-solid border-r2 b-color-dark-1'>
                        <h4 className='font-5'>Task: <span className='font-2 s2'> {Task.taskName} </span></h4>
                        <span>
                            <Button_S2 onClick={(e : any) => {manageSelectedStation(e, Task._id)}}> Manage </Button_S2>
                            <Button_S2 onClick={() => {dispatch(deleteTask({id: Task._id, parentId: activeObjective._id, owner: user._id, token: user.token}))}}>Delete</Button_S2>
                        </span>
                    </div>))}
                </article>
                
            </div>}
        </section>
    </div>
    )
};

export default  Objective
