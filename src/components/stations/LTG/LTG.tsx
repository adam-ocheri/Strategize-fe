import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';

//Child sub-station
import { getAllSubStations_LTG } from 'src/app/state_management/LTG/LTGSlice';
import { createObjective, getObjective, deleteObjective, getAllObjectives, } from 'src/app/state_management/objective/objectiveSlice';
import { updateTask, getTask } from 'src/app/state_management/task/taskSlice';






function LTG({}) {
    const [formData, setFormData] = useState({
        newObjectiveName: '',
    })
    const {newObjectiveName} = formData;

    const onFormUpdated = (e : Event | any) => {
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
    }
    
    const onFormSubmitted = (e: Event | any) => {
        e.preventDefault();
        if(!newObjectiveName)
        {
          throw new Error ("Please enter all fields!");
        }
        else{
          console.log("trying to login...");
          console.log(formData);
          dispatch(createObjective({objectiveName: newObjectiveName, parentId: activeLTG._id, owner: user._id, token: user.token}))
        }
    };

    const manageSelectedStation = async (e : any, id : any) => {
        console.log("trying to EDIT Objective...........")
        console.log(id);
        await dispatch(getObjective({id: id, parentId: activeLTG._id, token: user.token}));
        navigator('/project/ltg/objective');
    }

    const manageSelectedTask_Remote = async (e : any, id : any, parentObjectiveId : any) => {
        console.log("trying to EDIT Objective...........")
        console.log(id);
        await dispatch(getTask({id: id, parentId: parentObjectiveId, token: user.token}));
        navigator('/project/ltg/objective/task');
    }
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {activeLTG, subData, isLoading} : any = useAppSelector((state : RootState) => state.ltg);
    const {data, activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {activeTask} : any = useAppSelector((state : RootState) => state.task);
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if (!activeLTG.LTGName)
        {
            navigator("/");
        }
        else {
            dispatch(getAllObjectives({parentId: activeLTG._id, token: user.token}));
        }
    }, [])

    useEffect(() => {
        const getStuff = async() => {
            if (data){
                await dispatch(getAllSubStations_LTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}))
            }
        }
        getStuff();
    }, [data])
    
    return (
    <div className='pt7 mt7 p3 m3 b-color-dark-2 white'>
        <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link></h3>
        <section>
            <h2 className='font-1 s4'> 
                {activeLTG.LTGName} : 
                <span className='font-5 s2 m3 orange'> {`${activeLTG.stationTypeName ? activeLTG.stationTypeName : activeLTG.stationType ? activeLTG.stationType : 'Long Term Goal'}`} </span>
            </h2>
            <div>
                <Button_S2 onClick={(e : any) => {navigator('/project/ltg/settings')}}>Settings</Button_S2>
            </div>
        </section>
        <section className='p3 m3 border-top-w1 border-top-white border-top-solid'>
            <h3 className='s3 font-4'> Objectives </h3>
            {data && <div className='p3 m3 font-5 border-bottom-w0 border-bottom-white border-bottom-solid'>
                {data.map((Objective : any) => (<div key={Objective._id} className='p3 m3 font-5 b-color-dark-1 border-w1 border-r2 border-solid border-color-white'>
                    Objective: {Objective.objectiveName}
                    <p>
                        <Button_S2 onClick={(e : any) => {manageSelectedStation(e, Objective._id)}}> Manage </Button_S2>
                        <Button_S2 onClick={() => {dispatch(deleteObjective({id: Objective._id, parentId: activeLTG._id, owner: user._id, token: user.token}))}}>Delete</Button_S2>
                    </p>
                </div>))}
            </div>}
        </section>
        <section className='p3 m3'>
            <form onSubmit={(e) => onFormSubmitted(e)}>
                <input className="form-input" type="text" placeholder="Objective Name" id="newObjectiveName" 
                    name="newObjectiveName" value={newObjectiveName} onChange={(e) => {onFormUpdated(e)}}/>
                <Button_S2 type='submit'>Add New</Button_S2>
            </form> 
        </section>
        <section>
            <CalendarDND 
                data={subData} 
                getAllSubstations={() => {dispatch(getAllSubStations_LTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}))}} 
                updateSubStation={updateTask} 
                dispatch={dispatch} 
                user={user} 
                manage={manageSelectedTask_Remote}
            />
        </section>
    </div>
    )
};

export default  LTG
