import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { logout, User, reset } from 'src/app/state_management/user/authSlice';
import { RootState } from 'src/app/store';
import { createProject, getAllProjects, getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';

import ChartBar from 'src/components/charts/ChartBar/ChartBar';
import ChartLine from 'src/components/charts/ChartLine/ChartLine';
import ChartPie from 'src/components/charts/ChartPie/ChartPie';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { Card, CardHeader, CardBody, CardFooter, Text, Center, Divider, Menu, MenuButton, MenuList, MenuItem, Icon, IconButton, Button, MenuGroup, MenuDivider, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import StatsHomeStyled from './StatsHomeStyled';

function HomeUI() {

  //! To be migrated!! ------------------------------------------------------------------------------------------------------------------------
    const [formData, setFormData] = useState({
      projectName: '',
  })
  const {projectName} = formData;
  
  const {data, allUserTasks} = useAppSelector((state) => state.project)

  const onFormUpdated = (e : Event | any) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onFormSubmitted = (e: Event | any) => {
    e.preventDefault();
    if(!projectName)
    {
      throw new Error ("Please enter all fields!");
    }
    else{
      console.log("trying to login...");
      console.log(formData);
      dispatch(createProject({projectName: projectName, owner: user._id, token: user.token}))
    }
  }

  const onLogoutClicked = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigator('/register');
  }

  const onUpdateProjectName = async (e : any, id : any) => {
    console.log(id);
    await dispatch(updateProject({projectName: projectName, id: id, token: user.token}));
  }

  const manageSelectedStation = async (e : any, id : any) => {
    console.log("trying to EDIT PROJECT...........")
    console.log(id);
    await dispatch(getProject({id: id, token: user.token}));
    navigator('/project');
  }

  //! Immigrants Border -----------------------------------------------------------------------------------------------------------------------
  
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const {user} : any = useAppSelector((state : RootState) => state.auth);

  useEffect(() => {
    if (!user)
    {
      navigator('/register');
    }
    else {
      dispatch(getAllProjects({owner: user._id, token: user.token}));
    }

  }, [user, navigator])

  return (
    <main className='p1 m1' style={{height: '100vh'}}>
        {/* {user && <Card>
            <CardBody className='mt6 pt6'>
                <Text>View a summary of all your customers over the last month.</Text>
                <h1 className='font-1 white s3'>Welcome!</h1>
                <div className='generic-container-3 font-5'>
                    <p>
                        <strong className='font-6'>Name : </strong> {user.name}
                    </p>
                    <p>
                    <strong className='font-6'>Email : </strong> {user.email}
                    </p>
                    <p>
                        <Button_S2 onClick={onLogoutClicked}> Logout </Button_S2>
                    </p>
                
                </div>
            </CardBody>
        </Card>} */}
      {/* {user && <div className='generic-container-3 font-5'>
          <div className='generic-container-3 card-sub-main quad-box-shadow-2'>  
            <h1 className='font-1 white s3'>Welcome!</h1>
            <div className='generic-container-3 font-5'>
              <p>
                <strong className='font-6'>Name : </strong> {user.name}
              </p>
              <p>
              <strong className='font-6'>Email : </strong> {user.email}
              </p>
              <p>
                <Button_S2 onClick={onLogoutClicked}> Logout </Button_S2>
              </p>
              
            </div>
          </div>
        </div>} */}
      <Card className='card-main quad-box-shadow-4' background={'blackAlpha.400'}>  {/*className='card-main quad-box-shadow-4 p1 m1'*/}
        <CardBody className='b-color-dark-1 p4 quad-box-shadow-1'>
            <CardHeader className='b-color-dark-2 border-r2 p5'>
                <h1 className=' m3 font-3 white s3'>Welcome back, <span className='orange font-5'>strategizer</span></h1>
                <section className='flex f-dir-row j-between p5'>
                    <div className=' font-5 white'>
                        <p className='p1 m1'>
                            <strong className='font-6 white p2 m2'>Name : </strong> <span className='p2 m2'>{user.name}</span>
                        </p>
                        <p className='p1 m1'>
                        <strong className='font-6 white p2 m2'>Email : </strong> <span className='p2 m2'>{user.email}</span>
                        </p>
                        <p>
                            {/* <Button_S2 onClick={onLogoutClicked}> Logout </Button_S2> */}
                        </p>
                    </div>
                    <div>
                        <Center height='130px'>
                            <Divider orientation='vertical' />
                        </Center>
                    </div>
                    <div className='centered flex f-dir-col p4 m4'>
                        <h2 className='font-3 s2 orange'>Create New Project</h2>
                        <form className='form-generic flex f-dir-col' onSubmit={(e) => onFormSubmitted(e)}>
                            <input className="form-generic-input font-2" type="text" placeholder="Project Name" id="projectName" 
                                name="projectName" value={projectName} onChange={(e) => {onFormUpdated(e)}}/>
                            <Button_S2 type='submit'>Create</Button_S2>
                        </form>  
                    </div>
                </section>
            </CardHeader>
          
          {/* {
            
            type UserStatistics {
                usageTracking : {
                    current : {
                        todayTotalMinutes : int,
                        todayTotalClicks : int,
                        todayTotalRequests : int,
                    }
                    history : {
                        totalMinutes : std::vector<std::map<date, int>>,
                        totalClicks : std::vector<std::map<date, int>>,
                        totalRequests : std::vector<std::map<date, int>>,
                        totalDaysSinceRegistered : number,
                        totalDaysWithoutActivitySinceRegistered : number,
                        TotalActivityRatio : () => {return (totalDaysSinceRegistered / totalDaysWithoutActivitySinceRegistered) * 100}
                    },

                    avgDailyMinutes : number,
                    avgDailyInteraction : number,
                    avgDailyActivity : number,

                    avgWeeklyMinutes : number,
                    avgWeeklyInteraction : number,
                    avgWeeklyActivity : number
                }

                overdueTracking : {
                    current : {
                        weeklyTotalMinutes : std::vector<std::map<date, int>>,,
                    }
                    history : {
                        totalMinutes : std::vector<std::map<date, int>>,
                    },

                    avgWeeklyMinutes : number,
                    currentWeekOverdueRatio : float () => { return`${( totalMinutes / weeklyTotalMinutes )}`;},
                }

                total[stationType] : number,
                totalCompletedAndArchived[stationType] : number,
                current[stationType]CompletionRatio : float () => { return`${(total[stationType] / totalCompleted[stationType]) * 100.0f} %`;},

                featuresPreferencesTracking : {
                    totalNumRequests_FeatureX : number,
                    totalNumRequests_FeatureY : number,
                    totalNumRequests_FeatureZ : number,
                    ...,
                    sortedPreferredFeatures : number () => {return [...totalNumRequests_..., ...].sort()}
                }
                
            }

          } */}
          <div className='centered'>
            <Accordion>
                {data && user  && 
                <Card className='card-sub p3 m3 quad-box-shadow-1'>
                  <h4 className='s3 p2 m2 font-6 centered' style={{color: '#ffc8a3'}}>Existing Projects</h4>
                  {data.map((project : any) => (
                  <AccordionItem key={project._id} _hover={{background: '#ffc8a3'}}>
                      <h2>
                        <AccordionButton className='card-sub-child orange' border={'2px solid #fab50066'} _hover={{border: '2px solid #fab500'}}>
                          <Box as="span" flex='1' textAlign='left' className='card-sub-child-2' borderRadius={'6px'} padding={'4px'}>
                            {project.projectName}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel style={{width: '50vw'}} className='card-sub-child-2'>
                          <section className='flex f-dir-col j-even'>
                              <h2 className='font-1 s1 p1 m1 orange '>Project Name :</h2> <h3 className='font-6 s3 p3 m3 white'>{project.projectName}</h3> 
                              {allUserTasks &&
                              <div>
                                <StatsHomeStyled allUserTasks={allUserTasks} station={project} user={user}/>
                              </div>
                              }
                          </section>
                          <section className='flex f-dir-col j-even'>
                            <div>
                                <h2 className='font-1 s1 p1 m1 orange'>Owner :</h2> <h3 className='font-2 s2 p1 m1 white'>{user.name}</h3> 
                            </div>
                            <div className='flex parent flex-flow-left'>
                                <Button_S2 className='p2 m3' onClick={(e : any) => {manageSelectedStation(e, project._id)}}> Manage </Button_S2>
                            </div>
                          </section>
                      </AccordionPanel >
                  </AccordionItem>
                  ))}
                </Card>}
            </Accordion>
          </div>
        </CardBody>
      </Card>
    </main>
  )
}

export default HomeUI;