import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

//Child sub-station
import { createTask, getTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';



function Task({}) {
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
          dispatch(createTask({taskName: newTaskName, parentId: activeTask._id, owner: user._id, token: user.token}))
        }
    };

    const manageSelectedStation = async (e : any, id : any) => {
        console.log("trying to EDIT Task...........")
        console.log(id);
        await dispatch(getTask({id: id, parentId: activeTask._id, token: user.token}));
        navigator('/project/ltg/objective/task');
    }
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {activeTask} : any = useAppSelector((state : RootState) => state.task);
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if (!activeTask.taskName)
        {
            navigator("/project/ltg/objective");
        }
        else {
            dispatch(getAllTasks({parentId: activeTask._id, token: user.token}));
        }
    }, [])
    
    return (
    <div>
        <section>
            <h2> {activeTask.taskName} </h2>
            <div>
                <button onClick={(e) => {navigator('/project/ltg/objective/task/settings')}}>Settings</button>
            </div>
        </section>
    </div>
    )
};

export default Task;
