import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllLTGs, getLTG } from 'src/app/state_management/LTG/LTGSlice';
//Child sub-station
import { createTask, getTask, deleteTask, getAllTasks, setActiveTask } from 'src/app/state_management/task/taskSlice';
import Settings_Task from './Settings_Task';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';



function Task({}) {

    
    const [originTask, setOriginTask] : any = useState(null);

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

    const [currentTaskIteration, setCurrentTaskIteration] = useState(activeTask?.iteration);

    //INIT component & data
    useEffect(() => {
        if (!activeTask?.taskName)
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

            //setCurrentTaskIteration(activeTask.iteration);

            
        }
    }, [])

    useEffect(()=> {
        if(activeTask){
            if(activeTask.isSubtask){
                // let taskOrigin : any = {};
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
        console.log(newIteration <= originTask.HISTORY_TaskIterations.length)
        console.log(originTask)
        const isIterationInRange = newIteration >= 0 && newIteration <= originTask.HISTORY_TaskIterations.length;
        isIterationInRange ? setCurrentTaskIteration(newIteration) : null;
    };
    
    return (
    <div className='pt7 mt7 p3 m3 b-color-dark-2 white'>
        {activeLTG && activeObjective && <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link> {'>'} <Link to='/project/ltg/objective'>{activeObjective.objectiveName}</Link> {'>'} <Link to='/project/ltg/objective/task'>{activeTask.taskName}</Link></h3>}
        <section className='font-3'>
            {originTask.HISTORY_TaskIterations.length > 0 && <div className='centered flex f-dir-col'>
                <div>
                    <Button_S2 onClick={() => onSubtaskIterationChange(-1)}>{'<'}</Button_S2> 
                    <span>Task Iteration</span> 
                    <Button_S2 onClick={() =>onSubtaskIterationChange(1)}>{'>'}</Button_S2>
                </div>
                {originTask && <div >
                    <button className={`white task-iterations ${activeTask.iteration === 0 ? 'task-iteration-active':''}`}  onClick={()=>setCurrentTaskIteration(0)}>{'0'}</button>
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
            <h2 className='font-1 s4'> 
                {activeTask.taskName} : 
                <span className='font-5 s2 m3 orange'>{`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}`}</span>
            </h2>
            <article className='p3 m3'>
                Date: <span className='s3 ml4'>{`${activeTask.date !== '' ? activeTask.date.slice(0, 15) : 'No date is set yet'}`} </span> <br/>
                Time: <span className='s3 ml4'>{`${activeTask.date !== '' ? activeTask.date.slice(15, 21) : 'No Time is set yet'}`} </span>
                {activeTask.description && <div className='font-5 s2 p3 m3'>
                    Description: <span className={`s3 ml4`}>
                        {activeTask.description}
                        </span>
                    </div>}
                <div className='p3 m3 border-top-w1 border-top-white border-top-solid'>
                    {/* <button onClick={(e) => {navigator('/project/ltg/objective/task/settings')}}>Settings</button> */}
                    <Settings_Task />
                </div>
            </article>
        </section>
    </div>
    )
};

export default Task;
