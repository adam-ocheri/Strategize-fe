import { getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';
import { Button, Card, Heading, Input, Select, SelectField, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { getAllLTGs } from 'src/app/state_management/LTG/LTGSlice';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { SettingsView } from 'src/types/stationGenerics';
import { canSaveSettings, formUpdate, formatFormSubmission, isDefaults } from '../stationGlobals/stationUtils';

 function Settings_Project() {

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {user} : any = useAppSelector((state : RootState) => state.auth);
    const {activeProject} : any = useAppSelector((state) => state.project)
    const {data} : any = useAppSelector((state : RootState) => state.ltg);

    useEffect(() => {
        if(!activeProject.projectName)
        {
            navigator('/');
        }
    }, [activeProject])

    const [deletePrompt, setDeletePrompt] = useState(false);
    const [currentTabView, setCurrentTabView] = useState<SettingsView>('Settings');

    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        projectName: '',
        stationTypeName: '',
        defaults : {
            ltgStation_TypeName: '',
            objStation_TypeName: '',
            taskStation_TypeName: ''
        }
    })

    const {
        projectName, 
        stationTypeName, 
        defaults
    } = formData;
    const {
        ltgStation_TypeName,
        objStation_TypeName,
        taskStation_TypeName
    } = defaults;

    useEffect(()=> {
        setSavePrevented(canSaveSettings(formData));
    }, [formData, defaults])
 
    const onFormSubmitted = async (e: Event | any) => {
        e.preventDefault();
        if (savePrevented) return;
        
        const placeholders : Object = {
            ltgStation_TypeName: activeProject.defaults.ltgStation_TypeName, 
            objStation_TypeName: activeProject.defaults.objStation_TypeName, 
            taskStation_TypeName: activeProject.defaults.taskStation_TypeName
        }
        
        let body : Object = formatFormSubmission({...formData}, placeholders);
       
        await dispatch(updateProject({body, id: activeProject._id, token: user.token}))
        await dispatch(getProject({id: activeProject._id, token: user.token}))
        navigator('/project');
    }

    const onDeleteProject = async () => {
        await dispatch(deleteProject({id: activeProject._id, owner: user._id, token: user.token}));
        navigator('/')
    }
    //'whiteAlpha.50'
  return (
    <div style={{marginTop: '65px'}}>
        <Tabs colorScheme={'yellow'} textColor={'#23ffff'} background={'#010111'}  display={'flex'} flexDirection={'column'}>
            <TabList background={'#12012f'}>
                <Tab  _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('Settings')}>Settings</Tab>
                <Tab _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('Statistics')}>Statistics</Tab>
                <Tab _hover={{color: '#ffcf22'}} onClick={() => setCurrentTabView('X-Station')}>Station X</Tab>
            </TabList>

            <div className='b-color-dark-2' style={{minWidth: '50%', alignSelf: 'center'}}>
                <Card padding={'8'} margin={'6'} background={'#1a0638'}>
                    <h2 className='font-1 s4 white'> 
                        {activeProject.projectName} :     
                        <span className='font-5 s2 m3 orange'>{activeProject.stationTypeName}{` ${currentTabView}`}</span>
                    </h2>
                    <Button_S2 className='s1 m4' onClick={(e : any) => {navigator('/project')}}>{'<- '}Back To {`${activeProject.stationTypeName ? activeProject.stationTypeName : activeProject.stationType ? activeProject.stationType : 'Project'}`}</Button_S2>
                </Card>
            </div>

            <TabPanels maxWidth={'50%'} alignSelf={'center'}>
                
                <TabPanel role='group' className='b-color-dark-2 p5 flex f-dir-col' 
                    style={{height:'100%', width: '100%', marginTop: '0px'}}
                >
                    
                    <Card padding={'8'} margin={'2'} background={'#1a0638'}>
                        
                        <form onSubmit={(e) => {onFormSubmitted(e)}}>  
                            <Heading as='h3'>{activeProject.stationTypeName} Global Settings</Heading> 
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>Project Name</h3>
                                </div>
                                <Input className="font-3" type="text" placeholder={activeProject.projectName} id="projectName"  background={'AppWorkspace'} color={'black'}
                                    name="projectName" value={projectName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <h3 className='m1 s2 font-3 white'>Station Type Name</h3>
                                <Input className="font-3" type="text" placeholder="Project" id="stationTypeName" background={'AppWorkspace'} color={'black'}
                                    name="stationTypeName" value={stationTypeName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>

                            <Heading as='h3'>Defaults</Heading>  
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>Long Term Goal</h3>
                                </div>
                                <Input className="font-3" type="text" placeholder={activeProject.defaults.ltgStation_TypeName} id="ltgStation_TypeName"  background={'AppWorkspace'} color={'black'}
                                    name="ltgStation_TypeName" value={ltgStation_TypeName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <h3 className='m1 s2 font-3 white'>Objective</h3>
                                <Input className="font-3" type="text" placeholder={activeProject.defaults.objStation_TypeName} id="objStation_TypeName" background={'AppWorkspace'} color={'black'}
                                    name="objStation_TypeName" value={objStation_TypeName} onChange={(e) => {formUpdate(e, setFormData)}}/>
                            </Card>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <h3 className='m1 s2 font-3 white'>Task</h3>
                                <Input className="font-3" type="text" placeholder={activeProject.defaults.taskStation_TypeName} id="objStation_TypeName" background={'AppWorkspace'} color={'black'}
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
                        <div className='p3 m3 border-top-w0 border-top-white border-top-solid'></div>
                        
                    </Card>
            {deletePrompt ? 
            <div className='p3 m3 border-top-w1 border-top-white border-top-solid b-color-dark-0 white border-bottom-r2'>
                This will delete the project and all of it's sub-stations! <br/>
                Are you sure? <br/>
                <Button colorScheme='red' onClick={() => onDeleteProject()} minWidth={'110px'} margin={'3'}>Delete</Button>
                <Button onClick={() => setDeletePrompt(false)} minWidth={'110px'} margin={'3'}>Cancel</Button>
            </div> 
            : <div className='p3 m3 border-top-w1 border-top-white border-top-solid'>
                <Button colorScheme='red' onClick={() => setDeletePrompt(true)} minWidth={'110px'} margin={'3'}>DELETE</Button>
            </div>}
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


export default Settings_Project;

