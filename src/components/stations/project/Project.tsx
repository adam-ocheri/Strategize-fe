import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { createLTG, getLTG, getAllLTGs, updateLTG, deleteLTG } from 'src/app/state_management/LTG/LTGSlice';
import { getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';
import { RootState } from 'src/app/store';


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

    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {user} : any = useAppSelector((state : RootState) => state.auth);
    const {data, activeLTG} : any = useAppSelector((state : RootState) => state.ltg);

    useEffect(() => {
        if (!activeProject.projectName)
        {
            navigator("/");
        }
        else {
            dispatch(getAllLTGs({parentId: activeProject._id, token: user.token}));
        }
    }, [])
    
    return (
    <div className='pt5 mt5'>
        <section>
            <h2> 
                {activeProject.projectName} :    
                {`${activeProject.stationTypeName ? activeProject.stationTypeName : activeProject.stationType ? activeProject.stationType : 'Project'}`}
            </h2>
            <div>
                <button onClick={(e) => {navigator('/project/settings')}}>Settings</button>
            </div>
        </section>
        <section>
            <h3> Long Term Goals </h3>
            {data && <div>
                {data.map((LTG : any) => (<div key={LTG._id}>
                    Long Term Goal: {LTG.LTGName}
                    <p>
                        <button onClick={(e) => {manageSelectedStation(e, LTG._id)}}> Manage </button>
                        <button onClick={() => {dispatch(deleteLTG({id: LTG._id, parentId: activeProject._id, owner: user._id, token: user.token}))}}>Delete</button>
                    </p>
                </div>))}
            </div>}
        </section>
        <section>
            <form onSubmit={(e) => onFormSubmitted(e)}>
                <input className="form-input" type="text" placeholder="LTG Name" id="newLTGName" 
                    name="newLTGName" value={newLTGName} onChange={(e) => {onFormUpdated(e)}}/>
                <button type='submit'>Add New</button>
            </form> 
        </section>
    </div>
    )
};

export default  Project
