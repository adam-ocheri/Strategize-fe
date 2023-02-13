import { getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';

 function Settings_Project() {

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if(!activeProject.projectName)
        {
            navigator('/');
        }
    }, [activeProject])

    const [deletePrompt, setDeletePrompt] = useState(false);

    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        projectName: '',
        stationTypeName: ''
    })
    const {projectName, stationTypeName} = formData;

    useEffect(()=> {
        setSavePrevented(canSaveSettings())
    }, [projectName, stationTypeName])

    const onFormUpdated = (e : Event | any) => {
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
    }
    
    const onFormSubmitted = async (e: Event | any) => {
        e.preventDefault();
        let body : Object = {};

        for  (let field in formData)
        {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0)
            {
                Object.defineProperty(body, field, {value: val, writable: true, enumerable: true, configurable: true});
            }
        }

        await dispatch(updateProject({body, id: activeProject._id, token: user.token}))
    }

    const canSaveSettings : () => boolean = () : boolean => {
        let numModifiedProperties = 0;
        for  (let field in formData)
        {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0)
            {
                ++numModifiedProperties;
            }
        }
        return numModifiedProperties === 0;
    }

    const onDeleteProject = async () => {
        await dispatch(deleteProject({id: activeProject._id, owner: user._id, token: user.token}));
        navigator('/')
    }

  return (
    <div>
        <h2>Project Settings</h2>
        <form onSubmit={(e) => {onFormSubmitted(e)}}>
            
            <div>
                Name: <br/> 
                <input className="form-input" type="text" placeholder={activeProject.projectName} id="projectName" 
                    name="projectName" value={projectName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <div>
                Station Type Name: <br/>
                <input className="form-input" type="text" placeholder="Project" id="stationTypeName" 
                    name="stationTypeName" value={stationTypeName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <button type='submit' disabled={savePrevented}>Save</button>
        </form>
        {deletePrompt ? <div>
            This will delete the project and all of it's sub-stations! <br/>
            Are you sure? <br/>
            <button onClick={() => onDeleteProject()}>Delete</button>
            <button onClick={() => setDeletePrompt(false)}>Cancel</button>
            </div> 
            : <div>
                <button onClick={() => setDeletePrompt(true)}>DELETE</button>
            </div>}
        
    </div>
  )
}


export default Settings_Project;

