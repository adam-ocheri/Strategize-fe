import { getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';
import { Button, Card, Input, Select, SelectField, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { getAllLTGs } from 'src/app/state_management/LTG/LTGSlice';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { SettingsView } from 'src/types/stationGenerics';

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
        // const getData = async () => {
        //     await dispatch(getAllLTGs({parentId: activeProject._id, token: user.token}))
        // }
        // getData();
    }, [activeProject])

    const [deletePrompt, setDeletePrompt] = useState(false);
    const [currentTabView, setCurrentTabView] = useState<SettingsView>('Settings');

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
        if (savePrevented) return;
        
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
        await dispatch(getProject({id: activeProject._id, token: user.token}))
        navigator('/project');
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
                        <span className='font-5 s2 m3 orange'>{`Project ${currentTabView}`}</span>
                    </h2>
                    <Button_S2 className='s1 m4' onClick={(e : any) => {navigator('/project')}}>{'<- '}Back To Project</Button_S2>
                </Card>
            </div>

            <TabPanels maxWidth={'50%'} alignSelf={'center'}>
                
                <TabPanel role='group' className='b-color-dark-2 p5 flex f-dir-col' 
                    style={{height:'100%', width: '100%', marginTop: '0px'}}
                >
                    
                    <Card padding={'8'} margin={'2'} background={'#1a0638'}>
                        
                        <form onSubmit={(e) => {onFormSubmitted(e)}}>  
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>Project Name</h3>
                                </div>
                                <Input className="font-3" type="text" placeholder={activeProject.projectName} id="projectName"  background={'AppWorkspace'} color={'black'}
                                    name="projectName" value={projectName} onChange={(e) => {onFormUpdated(e)}}/>
                            </Card>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <h3 className='m1 s2 font-3 white'>Station Type Name</h3>
                                <Input className="font-3" type="text" placeholder="Project" id="stationTypeName" background={'AppWorkspace'} color={'black'}
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
                        </form>
                        <div className='p3 m3 border-top-w0 border-top-white border-top-solid'></div>
                        <div>
                            <Card margin={'10'} padding={'2'} background={'#110628'}>
                                <div className='flex f-dir-row j-between'>
                                    <h3 className='m1 s2 font-3 white'>Child Stations</h3>
                                </div>
                                {data && <Select placeholder='Long Term Goals' background={'#ffffff'}>
                                {/* <span></span> */}
                                <hr/>
                                {data.map((LTG : any) : any => (
                                    <option key={LTG._id} value={LTG.LTGName}>
                                        {LTG.LTGName}
                                    </option>)
                                )}
                                </Select>}
                            </Card>
                            
                        </div>
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

