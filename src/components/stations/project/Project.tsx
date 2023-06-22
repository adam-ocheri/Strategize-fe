import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { refreshStation } from 'src/app/System/Main/Heritage/Utils/heritageUtils';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { createLTG, getLTG, getAllLTGs, updateLTG, deleteLTG } from 'src/app/state_management/LTG/LTGSlice';
import { getProject, updateProject, deleteProject, reset__project, getAllSubstations_Project } from 'src/app/state_management/project/projectSlice';
import { updateTask, getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import { RootState } from 'src/app/store';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';



function Project({}) {
    const [formData, setFormData] = useState({
        newLTGName: '',
    });
    const {newLTGName} = formData;

    const onFormUpdated = (e : Event | any) => {
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
    }
    
    const onFormSubmitted = (e: Event | any) => {
        e.preventDefault();
        if(!newLTGName)
        {
          throw new Error ("Please enter all fields!");
        }
        else{
          console.log("trying to login...");
          console.log(formData);
          dispatch(createLTG({LTGName: newLTGName, parentId: activeProject._id, owner: user._id, token: user.token}))
        }
    };

    const manageSelectedStation = async (e : any, id : any) => {
        console.log("trying to EDIT LTG...........")
        console.log(id);
        await dispatch(getLTG({id: id, parentId: activeProject._id, token: user.token}));
        navigator('/project/ltg');
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

    // Data
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject, subData, allUserTasks} : any = useAppSelector((state) => state.project)
    const {user, stationContext} : any = useAppSelector((state : RootState) => state.auth);
    const {data, activeLTG} : any = useAppSelector((state : RootState) => state.ltg);
    const {activeTask, isLoading} : any = useAppSelector((state) => state.task)
    

    // Init
    useEffect(() => {
        if (!activeProject.projectName)
        {
            navigator("/");
        }
        else {
            const initData = async () => {
                await dispatch(setCurrentStationContext({newContext: 'project'}));
                await dispatch(getAllLTGs({parentId: activeProject._id, token: user.token}));
            }
            initData();
        }
    }, [])

    // Post Init
    useEffect(() => {
        if (activeProject._id){
            const getSubData = async () => {
                console.log('TRYING TO SEE USER ID.....');
                console.log(user._id)
                const response = await dispatch(getAllSubstations_Project({id: activeProject._id, owner: user._id, token: user.token}));
                setTaskData(response.payload);
            }
            getSubData();
        }
    }, [activeProject])

    const [taskData, setTaskData] = useState([]);

    useEffect(()=> {

        refreshStation('project', activeProject, allUserTasks, setTaskData);

    }, [allUserTasks])
    
    return (
    <div className='pt7 mt7 p3 m3 b-color-dark-2 white' style={{borderLeft: '2px solid white', borderRight: '2px solid white', borderBottom: '2px solid white'}}>
        <section>
            <h2 className='font-1 s4'> 
                {activeProject.projectName} :     
                <span className='font-5 s2 m3 orange'>{`${activeProject.stationTypeName ? activeProject.stationTypeName : activeProject.stationType ? activeProject.stationType : 'Project'}`} </span>
            </h2>
            <div>
                <Button_S2 onClick={(e : any) => {navigator('/project/settings')}}>Settings</Button_S2>
            </div>
        </section>
        <section className='p3 m3 border-top-w1 border-top-white border-top-solid'>
            <h3 className='s3 font-4'> Long Term Goals </h3>
            {data && <div className='p3 m3 font-5 border-bottom-w0 border-bottom-white border-bottom-solid'>
                {data.map((LTG : any) => (<div key={LTG._id} className='p3 m3 font-5 b-color-dark-1 border-w1 border-r2 border-solid border-color-white'>
                    Long Term Goal: <span className='font-2 s2'>{LTG.LTGName}</span>
                    <p>
                        <Button_S2 onClick={(e : any) => {manageSelectedStation(e, LTG._id)}}> Manage </Button_S2>
                        <Button_S2 onClick={() => {dispatch(deleteLTG({id: LTG._id, parentId: activeProject._id, owner: user._id, token: user.token}))}}>Delete</Button_S2>
                    </p>
                </div>))}
            </div>}
        </section>
        <section className='p3 m3'>
            <form onSubmit={(e) => onFormSubmitted(e)}>
                <input className="form-input" type="text" placeholder="LTG Name" id="newLTGName" 
                    name="newLTGName" value={newLTGName} onChange={(e) => {onFormUpdated(e)}}/>
                <Button_S2 type='submit'>Add New</Button_S2>
            </form> 
        </section>
        <section>
        <CalendarDND 
                data={taskData} 
                getAllSubstations={() => {dispatch(getAllSubstations_Project({id: activeProject._id, owner: user._id, token: user.token}))}} 
                updateSubStation={updateTask} 
                dispatch={dispatch} 
                user={user} 
                manage={manageSelectedTask_Remote}
                activeTask={activeTask}
                currentContext={'project'}
            />
        </section>
    </div>
    )
};

export default Project;
