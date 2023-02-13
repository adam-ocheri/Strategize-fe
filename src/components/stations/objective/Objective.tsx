import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

//Child sub-station
import { createTask, getTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';



function Objective({}) {
    const [formData, setFormData] = useState({
        newTaskName: '',
    })
    const {newTaskName} = formData;

    const onFormUpdated = (e : Event | any) => {
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
    }
    
    const onFormSubmitted = (e: Event | any) => {
        e.preventDefault();
        if(!newTaskName)
        {
          throw new Error ("Please enter all fields!");
        }
        else{
          console.log("trying to login...");
          console.log(formData);
          dispatch(createTask({taskName: newTaskName, parentId: activeObjective._id, owner: user._id, token: user.token}))
        }
    };

    const manageSelectedStation = async (e : any, id : any) => {
        console.log("trying to EDIT Task...........")
        console.log(id);
        await dispatch(getTask({id: id, parentId: activeObjective._id, token: user.token}));
        navigator('/project/ltg/objective/task');
    }
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {data, activeTask} : any = useAppSelector((state : RootState) => state.task);
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
    
    return (
    <div>
        <section>
            <h2> {activeObjective.objectiveName} </h2>
            <div>
                <button onClick={(e) => {navigator('/project/ltg/objective/settings')}}>Settings</button>
            </div>
        </section>
        <section>
            <h3> Tasks </h3>
            {data && <div>
                {data.map((Task : any) => (<div key={Task._id}>
                    Task: {Task.taskName}
                    <p>
                        <button onClick={(e) => {manageSelectedStation(e, Task._id)}}> Manage </button>
                        <button onClick={() => {dispatch(deleteTask({id: Task._id, parentId: activeObjective._id, owner: user._id, token: user.token}))}}>Delete</button>
                    </p>
                </div>))}
            </div>}
        </section>
        <section>
            <form onSubmit={(e) => onFormSubmitted(e)}>
                <input className="form-input" type="text" placeholder="Task Name" id="newTaskName" 
                    name="newTaskName" value={newTaskName} onChange={(e) => {onFormUpdated(e)}}/>
                <button type='submit'>Add New</button>
            </form> 
        </section>
    </div>
    )
};

export default  Objective
