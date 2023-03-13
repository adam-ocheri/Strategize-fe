import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllLTGs, getLTG } from 'src/app/state_management/LTG/LTGSlice';
//Child sub-station
import { createTask, getTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
import Settings_Task from './Settings_Task';



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
    const {activeLTG, data} : any = useAppSelector((state) => state.ltg)
    const {activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {activeTask} : any = useAppSelector((state : RootState) => state.task);
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    //INIT component & data
    useEffect(() => {
        if (!activeTask.taskName)
        {
            navigator("/project/ltg/objective");
        }
        else {
            if (!activeObjective.objectiveName){
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
    
    return (
    <div className='pt7 mt7 p3 m3 b-color-dark-2 white'>
        {activeLTG && activeObjective && <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link> {'>'} <Link to='/project/ltg/objective'>{activeObjective.objectiveName}</Link> {'>'} <Link to='/project/ltg/objective/task'>{activeTask.taskName}</Link></h3>}
        <section className='font-3'>
            <h2 className='font-1 s4'> 
                {activeTask.taskName} : 
                <span className='font-5 s2 m3 orange'>{`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}`}</span>
            </h2>
            Date: {`${activeTask.date !== '' ? activeTask.date.slice(0, 15) : 'No date is set yet'}`} <br/>
            Time: {`${activeTask.date !== '' ? activeTask.date.slice(15, 21) : 'No Time is set yet'}`}
            <div className='p3 m3 border-top-w1 border-top-white border-top-solid'>
                {/* <button onClick={(e) => {navigator('/project/ltg/objective/task/settings')}}>Settings</button> */}
                <Settings_Task />
            </div>
        </section>
    </div>
    )
};

export default Task;
