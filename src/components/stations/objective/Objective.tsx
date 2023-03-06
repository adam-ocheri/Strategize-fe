import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

//Child sub-station
import { createTask, getTask, updateTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S1 from 'src/components/elements/buttons/Button_S1/Button_S1';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';



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
            dispatch(getAllTasks({parentId: activeObjective._id, token: user.token}));
        }
    }, [])

    useEffect(() => {
        setFormData({newTaskName: ''});
    } , [creatingNewTask])
    
    return (
    <div className='pt5 mt5'>
        <section>
            <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link> {'>'} <Link to='/project/ltg/objective'>{activeObjective.objectiveName}</Link> </h3>
            <h2 className='font-1'> 
                {activeObjective.objectiveName} : 
                {`${activeObjective.stationTypeName ? activeObjective.stationTypeName : activeObjective.stationType ? activeObjective.stationType : 'Objective'}`} 
            </h2>
            <div>
                <button onClick={(e) => {navigator('/project/ltg/objective/settings')}}>Settings</button>
            </div>
        </section>
        <section>
            <h3> Tasks </h3>
            {data && <div>
                <CalendarDND 
                    data={data} 
                    getAllSubstations={() => {dispatch(getAllTasks({parentId: activeObjective._id, token: user.token}))}} 
                    updateSubStation={updateTask} 
                    dispatch={dispatch} 
                    activeStation={activeObjective} 
                    user={user} 
                    isLoading={isLoading}
                    manage={manageSelectedStation}
                />
                <article>
                    <div className='flex f-dir-col jt-center j-even border-white border-w2 border-solid border-r3 b-color-dark-2 white p7 m7'>
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

                    {showData && data.map((Task : any) => (<div key={Task._id} className='flex j-between p1 m1 pl7 pr7 ml7 mr7 border-white border-w1 border-solid border-r2'>
                        Task: {Task.taskName}
                        <span>
                            <button onClick={(e) => {manageSelectedStation(e, Task._id)}}> Manage </button>
                            <button onClick={() => {dispatch(deleteTask({id: Task._id, parentId: activeObjective._id, owner: user._id, token: user.token}))}}>Delete</button>
                        </span>
                    </div>))}
                </article>
                
            </div>}
        </section>
    </div>
    )
};

export default  Objective
