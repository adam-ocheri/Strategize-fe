import { getLTG, updateLTG, deleteLTG, reset__LTG } from 'src/app/state_management/LTG/LTGSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';

 function Settings_LTG() {

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeLTG} : any = useAppSelector((state) => state.ltg)
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if(!activeLTG.LTGName)
        {
            navigator('/project');
        }
    }, [activeLTG])

    const [deletePrompt, setDeletePrompt] = useState(false);

    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        LTGName: '',
        stationTypeName: ''
    })
    const {LTGName, stationTypeName} = formData;

    useEffect(()=> {
        setSavePrevented(canSaveSettings())
    }, [LTGName, stationTypeName])

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

        await dispatch(updateLTG({body, id: activeLTG._id, parentId: activeLTG.owningProject, token: user.token}))
        await dispatch(getLTG({id: activeLTG._id, parentId: activeLTG.owningProject, token: user.token}));
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

    const onDeleteLTG = async () => {
        await dispatch(deleteLTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}));
        navigator('/')
    }

  return (
    <div>
        <h2>LTG Settings</h2>
        <form onSubmit={(e) => {onFormSubmitted(e)}}>
            
            <div>
                Name: <br/> 
                <input className="form-input" type="text" placeholder={activeLTG.LTGName} id="LTGName" 
                    name="LTGName" value={LTGName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <div>
                Station Type Name: <br/>
                <input className="form-input" type="text" placeholder={activeLTG.stationTypeName} id="stationTypeName" 
                    name="stationTypeName" value={stationTypeName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <button type='submit' disabled={savePrevented}>Save</button>
        </form>
        {deletePrompt ? <div>
            This will delete the LTG and all of it's sub-stations! <br/>
            Are you sure? <br/>
            <button onClick={() => onDeleteLTG()}>Delete</button>
            <button onClick={() => setDeletePrompt(false)}>Cancel</button>
            </div> 
            : <div>
                <button onClick={() => setDeletePrompt(true)}>DELETE</button>
            </div>}
    </div>
  )
}


export default Settings_LTG;

