import { getObjective, updateObjective, deleteObjective, reset__Objective } from 'src/app/state_management/objective/objectiveSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';

 function Settings_Objective() {

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeObjective} : any = useAppSelector((state) => state.objective)
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if(!activeObjective.objectiveName)
        {
            navigator('/project/ltg');
        }
    }, [activeObjective])

    const [deletePrompt, setDeletePrompt] = useState(false);

    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        objectiveName: '',
        stationTypeName: ''
    })
    const {objectiveName, stationTypeName} = formData;

    useEffect(()=> {
        setSavePrevented(canSaveSettings())
    }, [objectiveName, stationTypeName])

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

        await dispatch(updateObjective({body, id: activeObjective._id, parentId: activeObjective.owningLTG, token: user.token}));
        await dispatch(getObjective({id: activeObjective._id, parentId: activeObjective.owningLTG, token: user.token}));
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

    const onDeleteObjective = async () => {
        await dispatch(deleteObjective({id: activeObjective._id, owningLTG: activeObjective.owningLTG, owner: user._id, token: user.token}));
        navigator('/')
    }

  return (
    <div>
        <h2>Objective Settings</h2>
        <form onSubmit={(e) => {onFormSubmitted(e)}}>
            
            <div>
                Name: <br/> 
                <input className="form-input" type="text" placeholder={activeObjective.objectiveName} id="objectiveName" 
                    name="objectiveName" value={objectiveName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <div>
                Station Type Name: <br/>
                <input className="form-input" type="text" placeholder={activeObjective.stationTypeName} id="stationTypeName" 
                    name="stationTypeName" value={stationTypeName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <button type='submit' disabled={savePrevented}>Save</button>
        </form>
        {deletePrompt ? <div>
            This will delete the Objective and all of it's sub-stations! <br/>
            Are you sure? <br/>
            <button onClick={() => onDeleteObjective()}>Delete</button>
            <button onClick={() => setDeletePrompt(false)}>Cancel</button>
            </div> 
            : <div>
                <button onClick={() => setDeletePrompt(true)}>DELETE</button>
            </div>}
    </div>
  )
}


export default Settings_Objective;

