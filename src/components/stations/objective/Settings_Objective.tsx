import { getObjective, updateObjective, deleteObjective, reset__Objective } from 'src/app/state_management/objective/objectiveSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';
import { Button, Card, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { SettingsView } from 'src/types/stationGenerics';

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
    const [currentTabView, setCurrentTabView] = useState<SettingsView>('Settings');

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
        // <- HERE -> will need to update ALL tasks of this objective
        await dispatch(getObjective({id: activeObjective._id, parentId: activeObjective.owningLTG, token: user.token}));
        navigator('/project/ltg/objective');
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
    <div style={{marginTop: '65px'}}>
        <Tabs colorScheme={'yellow'} textColor={'#23ffff'} background={'#010111'} display={'flex'} flexDirection={'column'}>
            <TabList background={'#12012f'}>
                <Tab  _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('Settings')}>Settings</Tab>
                <Tab _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('Statistics')}>Statistics</Tab>
                <Tab _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('X-Station')}>Station X</Tab>
            </TabList>
            <div className='b-color-dark-2' style={{minWidth: '50%', alignSelf: 'center'}}>
                <Card padding={'8'} margin={'6'} background={'#1a0638'}>
                    <h2 className='font-1 s4 white'> 
                        {activeObjective.objectiveName} :     
                        <span className='font-5 s2 m3 orange'>{`Objective ${currentTabView}`}</span>
                    </h2>
                    <Button_S2 className='s1 m4' onClick={(e : any) => {navigator('/project/ltg/objective')}}>{'<- '}Back To Objective</Button_S2>
                </Card>
            </div>
            <TabPanels maxWidth={'50%'} alignSelf={'center'}>
                <TabPanel role='group' className='b-color-dark-2 p5 flex f-dir-col' 
                    style={{height:'100%', width: '100%'}}>
                        
                    <Card padding={'8'} margin={'2'} background={'#1a0638'}>
                        <form onSubmit={(e) => {onFormSubmitted(e)}}>
                            <Card  margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>Objective Name</h3>
                                </div>
                                <Input className="font-3" type="text" placeholder={activeObjective.objectiveName} id="objectiveName" background={'AppWorkspace'} color={'black'}
                                    name="objectiveName" value={objectiveName} onChange={(e) => {onFormUpdated(e)}}/>
                            </Card>
                            <Card  margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>Station Type Name</h3>
                                </div>
                                <Input className="font-3" type="text" placeholder={activeObjective.stationTypeName} id="stationTypeName" background={'AppWorkspace'} color={'black'}
                                    name="stationTypeName" value={stationTypeName} onChange={(e) => {onFormUpdated(e)}}/>
                            </Card>
                            <Button type='submit' _hover={!savePrevented ? {background: '#acffff'} : {background: '#004444', cursor: 'auto'}} 
                                disabled={savePrevented} 
                                minWidth={'110px'} 
                                margin={'10'} 
                                bgColor={!savePrevented ? '#21ffff' : '#004444'}
                            >
                                Save
                            </Button>
                            {/* <div>
                                Station Type Name: <br/>
                                <input className="form-input" type="text" placeholder={activeObjective.stationTypeName} id="stationTypeName" 
                                    name="stationTypeName" value={stationTypeName} onChange={(e) => {onFormUpdated(e)}}/>
                            </div> */}
                            {/* <button type='submit' disabled={savePrevented}>Save</button> */}
                        </form>
                        {/* <div className='p3 m3 border-top-w0 border-top-white border-top-solid'></div> */}
                        {deletePrompt ? <div className='p3 m3 border-top-w1 border-top-white border-top-solid b-color-dark-0 white border-bottom-r2'>
                            This will delete the Objective and all of it's sub-stations! <br/>
                            Are you sure? <br/>
                            <Button colorScheme='red' onClick={() => onDeleteObjective()} minWidth={'110px'} margin={'3'}>Delete</Button>
                            <Button onClick={() => setDeletePrompt(false)} minWidth={'110px'} margin={'3'}>Cancel</Button>
                            {/* <button onClick={() => onDeleteObjective()}>Delete</button>
                            <button onClick={() => setDeletePrompt(false)}>Cancel</button> */}
                            </div> 
                            : <div className='p3 m3 border-top-w1 border-top-white border-top-solid'>
                                <Button colorScheme='red' onClick={() => setDeletePrompt(true)} minWidth={'110px'} margin={'3'}>DELETE</Button>
                            </div>}
                    </Card>
                </TabPanel>

                <TabPanel className='b-color-dark-2 p5 flex f-dir-col' 
                    style={{height:'100%', width: '100%'}}
                >
                    <Card padding={'8'} background={'#1a0638'}>
                        
                    </Card>
                </TabPanel>

                <TabPanel className='b-color-dark-2 p5 flex f-dir-col' 
                    style={{height:'100%', width: '100%'}}
                >
                    <Card padding={'8'} background={'#1a0638'}>
                        
                    </Card>
                </TabPanel>
            </TabPanels>
        </Tabs>
        
    </div>
  )
}


export default Settings_Objective;

