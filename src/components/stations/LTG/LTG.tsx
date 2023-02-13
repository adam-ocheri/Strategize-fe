import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';

//Child sub-station
import { createObjective, getObjective, deleteObjective, getAllObjectives } from 'src/app/state_management/objective/objectiveSlice';



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
    const {activeLTG} : any = useAppSelector((state : RootState) => state.ltg);
    const {data, activeObjective} : any = useAppSelector((state : RootState) => state.objective);
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
    
    return (
    <div>
        <section>
            <h2> {activeLTG.LTGName} </h2>
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
    </div>
    )
};

export default  LTG
