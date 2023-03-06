import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

//Child sub-station
import { getAllSubStations_LTG } from 'src/app/state_management/LTG/LTGSlice';
import { createObjective, getObjective, deleteObjective, getAllObjectives, } from 'src/app/state_management/objective/objectiveSlice';
import { updateTask } from 'src/app/state_management/task/taskSlice';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';





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

    // useEffect(() => {
    //     if (data.length > 0){
    //         dispatch(getAllSubStations_LTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}))
    //     }
    // }, [data])
    
    return (
    <div className='pt5 mt5'>
        <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link></h3>
        <section>
            <h2> 
                {activeLTG.LTGName} : 
                {`${activeLTG.stationTypeName ? activeLTG.stationTypeName : activeLTG.stationType ? activeLTG.stationType : 'Long Term Goal'}`} 
            </h2>
            <div>
                <button onClick={(e) => {navigator('/project/ltg/settings')}}>Settings</button>
            </div>
        </section>
        <section>
            <h3> Objectives </h3>
            {data && <div>
                {data.map((Objective : any) => (<div key={Objective._id}>
                    Objective: {Objective.objectiveName}
                    <p>
                        <button onClick={(e) => {manageSelectedStation(e, Objective._id)}}> Manage </button>
                        <button onClick={() => {dispatch(deleteObjective({id: Objective._id, parentId: activeLTG._id, owner: user._id, token: user.token}))}}>Delete</button>
                    </p>
                </div>))}
            </div>}
        </section>
        <section>
            <form onSubmit={(e) => onFormSubmitted(e)}>
                <input className="form-input" type="text" placeholder="Objective Name" id="newObjectiveName" 
                    name="newObjectiveName" value={newObjectiveName} onChange={(e) => {onFormUpdated(e)}}/>
                <button type='submit'>Add New</button>
            </form> 
        </section>
        <section>
        {/* <CalendarDND 
                    data={data} 
                    getAllSubstations={() => {dispatch(getAllSubStations_LTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}))}} 
                    updateSubStation={updateTask} 
                    dispatch={dispatch} 
                    activeStation={activeLTG} 
                    user={user} 
                    isLoading={isLoading}
                    manage={manageSelectedStation}
                /> */}
        </section>
    </div>
    )
};

export default  LTG
