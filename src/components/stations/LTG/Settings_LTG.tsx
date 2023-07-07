import { getLTG, updateLTG, deleteLTG, reset__LTG } from 'src/app/state_management/LTG/LTGSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';
import { Button, Card, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { SettingsView } from 'src/types/stationGenerics';
import { canSaveSettings, determineSubstationTypeNameOrigin, formUpdate, formatFormSubmission } from '../stationGlobals/stationUtils';



function Settings_LTG() {

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {activeLTG} : any = useAppSelector((state) => state.ltg)
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if(!activeLTG.LTGName)
        {
            navigator('/project');
        }
    }, [activeLTG])

    const [deletePrompt, setDeletePrompt] = useState(false);
    const [currentTabView, setCurrentTabView] = useState<SettingsView>('Settings')

    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        LTGName: '',
        stationTypeName: '',
        defaults : {
            objStation_TypeName: '',
            taskStation_TypeName: ''
        }
    })
    const {LTGName, stationTypeName, defaults} = formData;
    const {objStation_TypeName, taskStation_TypeName} = defaults;

    useEffect(()=> {
        setSavePrevented(canSaveSettings(formData))
    }, [formData])

    const onFormSubmitted = async (e: Event | any) => {
        e.preventDefault();
        let body : Object = formatFormSubmission(formData, {
            objStation_TypeName: activeLTG?.defaults?.objStation_TypeName, 
            taskStation_TypeName: activeLTG?.defaults?.taskStation_TypeName
        });

        await dispatch(updateLTG({body, id: activeLTG._id, parentId: activeLTG.owningProject, token: user.token}))
        await dispatch(getLTG({id: activeLTG._id, parentId: activeLTG.owningProject, token: user.token}));
        navigator('/project/ltg');
    }

    const onDeleteLTG = async () => {
        const deleted = await dispatch(deleteLTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}));
        if (deleted) navigator('/');
    }

  return (
    <div style={{marginTop: '65px'}}>
        <Tabs colorScheme={'yellow'} textColor={'#23ffff'} background={'#010111'} display={'flex'} flexDirection={'column'}>
            <TabList background={'#12012f'}>
                <Tab _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('Settings')}>Settings</Tab>
                <Tab _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('Statistics')}>Statistics</Tab>
                <Tab _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('X-Station')}>Station X</Tab>
            </TabList>
            <div className='b-color-dark-2' style={{minWidth: '50%', alignSelf: 'center'}}>
                <Card padding={'8'} margin={'6'} background={'#1a0638'} alignSelf={'center'}>
                    <h2 className='font-1 s4 white'> 
                        {activeLTG.LTGName} :     
                        <span className='font-5 s2 m3 orange'>
                            {activeLTG.stationTypeName}{` ${currentTabView} `}
                        </span>
                    </h2>
                    <Button_S2 className='s1 m4' onClick={(e : any) => {navigator('/project/ltg/')}}>
                        {'<- '}Back To {activeLTG.stationTypeName}
                    </Button_S2>
                </Card>
            </div>
            <TabPanels maxWidth={'50%'} alignSelf={'center'}>

                <TabPanel role='group' className='b-color-dark-2 p5 flex f-dir-col' 
                    style={{height:'100%', width: '100%'}}
                >
                    <Card padding={'8'} margin={'2'} background={'#1a0638'}>
                        <form onSubmit={(e) => {onFormSubmitted(e)}}>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>
                                        {activeLTG.stationTypeName} Name
                                    </h3>
                                </div>
                                    <Input className="font-3" type="text" placeholder={activeLTG.LTGName} id="LTGName" background={'AppWorkspace'} color={'black'}
                                        name="LTGName" value={LTGName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>Station Type Name</h3>
                                </div>
                                    <Input className="font-3" type="text" placeholder={activeLTG.stationTypeName} id="stationTypeName" background={'AppWorkspace'} color={'black'}
                                        name="stationTypeName" value={stationTypeName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <h3 className='m1 s2 font-3 white'>Objective</h3>
                                <Input className="font-3" type="text"  id="objStation_TypeName" background={'AppWorkspace'} color={'black'}
                                    placeholder={determineSubstationTypeNameOrigin({scope: 'Objective', activeProject, activeLTG})}
                                    name="objStation_TypeName" value={objStation_TypeName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <h3 className='m1 s2 font-3 white'>Task</h3>
                                <Input className="font-3" type="text" id="objStation_TypeName" background={'AppWorkspace'} color={'black'}
                                    placeholder={determineSubstationTypeNameOrigin({scope: 'Task', activeProject, activeLTG})}
                                    name="taskStation_TypeName" value={taskStation_TypeName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>
                            <Button type='submit' _hover={!savePrevented ? {background: '#acffff'} : {background: '#004444', cursor: 'auto'}} 
                                disabled={savePrevented} 
                                minWidth={'110px'} 
                                margin={'10'} 
                                bgColor={!savePrevented ? '#21ffff' : '#004444'}
                            >
                                Save
                            </Button>
                        </form>
                        {deletePrompt ? 
                        <div className='p3 m3 border-top-w1 border-top-white border-top-solid b-color-dark-0 white border-bottom-r2'>
                            This will delete the {activeLTG.stationTypeName} and all of it's sub-stations! 
                            <br/>
                            Are you sure? 
                            <br/>
                            <Button colorScheme='red' onClick={() => onDeleteLTG()} minWidth={'110px'} margin={'3'}>Delete</Button>
                            <Button onClick={() => setDeletePrompt(false)} minWidth={'110px'} margin={'3'}>Cancel</Button>
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

                <TabPanel role='group' className='b-color-dark-2 p5 flex f-dir-col' 
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


export default Settings_LTG;

