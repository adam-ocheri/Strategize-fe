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
import { Card, CardHeader, CardBody, CardFooter, Text, Center, Divider, Menu, MenuButton, MenuList, MenuItem, Icon, IconButton, Button, MenuGroup, MenuDivider, Box, Input } from '@chakra-ui/react'
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
    <main className='p7' style={{minHeight: '100vh', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#010111', width: '100%'}}>
        <Card className='card-main quad-box-shadow-4 jt-center' background={'blackAlpha.400'} style={{width: '100%', borderLeft: '2px dashed aqua', borderRight:'2px dashed aqua', borderBottom:'2px dashed aqua'}}>  {/*className='card-main quad-box-shadow-4 p1 m1'*/}
          <CardBody className='b-color-dark-1 p4 quad-box-shadow-1'>
            <CardHeader className='b-color-dark-2 border-r2 p5'>
              <h1 className=' m3 font-3 white s3'>Welcome back, <span className='orange font-5'>strategizer</span></h1>
            </CardHeader>
          </CardBody>
        </Card>
      <Card className='card-main quad-box-shadow-4' background={'blackAlpha.400'} style={{borderLeft: '2px dashed aqua', borderRight:'2px dashed aqua', borderBottom:'2px dashed aqua'}}>  {/*className='card-main quad-box-shadow-4 p1 m1'*/}
        <CardBody className='b-color-dark-1 p4 quad-box-shadow-1'>
            <CardHeader className='b-color-dark-2 border-r2 p5'>
                <section className='flex f-dir-row j-between p5'>
                    <div className=' font-5 white m2'>
                        <p className='p1 m1'>
                            <strong className='font-6 white p2 m2'>Name : </strong> <span className='p2 m2'>{user?.name}</span>
                        </p>
                        <p className='p1 m1'>
                        <strong className='font-6 white p2 m2'>Email : </strong> <span className='p2 m2'>{user?.email}</span>
                        </p>
                        <p>
                            {/* <Button_S2 onClick={onLogoutClicked}> Logout </Button_S2> */}
                        </p>
                    </div>
                    <div className='m2'>
                        <Center height='130px'>
                            <Divider orientation='vertical' />
                        </Center>
                    </div>
                    <div className='centered flex f-dir-col m2'>
                        <h2 className='font-3 s2 orange'>Create New Project</h2>
                        <form className='form-generic flex f-dir-row f-wrap j-center' onSubmit={(e) => onFormSubmitted(e)}>
                            <Input className="form-generic-input font-1" type="text" placeholder="Project Name" id="projectName" 
                                name="projectName" value={projectName} onChange={(e) => {onFormUpdated(e)}}/>
                            <Button_S2 type='submit'>Create</Button_S2>
                        </form>  
                    </div>
                </section>
            </CardHeader>
          <div className='centered m4'>
            <div>
                {data && user  && 
                <Card className=' p5 m3 quad-box-shadow-1' backgroundColor={'#13122f'} style={{borderLeft: '2px solid aqua', borderRight:'2px solid aqua', borderBottom:'2px solid aqua', borderTop:'22px solid aqua'}}>
                  <h4 className='s3 p2 m2 font-6 centered' style={{color: '#ffefef'}}>Existing Projects</h4>
                  {data.map((project : any) => (
                  <Card key={project._id} _hover={{background: '#ffc8a3'}} margin={'0.5'} borderTopRadius={'20px'}>
                      {/* <h2>
                        <divButton className='card-sub-child orange' border={'2px solid #fab50066'} _hover={{border: '2px solid #fab500'}}>
                          <Box as="span" flex='1' textAlign='left' className='card-sub-child-2' borderRadius={'6px'} padding={'4px'}>
                            {project.projectName}
                          </Box>
                          <divIcon />
                        </divButton>
                      </h2> */}
                      <article style={{width: '50vw'}} className='card-sub-child-3'>
                          <section className='flex f-dir-col j-even'>
                              <h2 className='font-1 s1 p1 m1 orange '>Project Name :</h2> <h3 className='font-6 s3 p3 m3 white'>{project.projectName}</h3> 
                          </section>
                          <section className='flex f-dir-col j-even'>
                            <div>
                                <h2 className='font-1 s1 p1 m1 orange'>Owner :</h2> <h3 className='font-2 s2 p1 m1 white'>{user.name}</h3> 
                            </div>
                            <div className='flex parent flex-flow-left'>
                                <Button_S2 className='p2 m3' onClick={(e : any) => {manageSelectedStation(e, project._id)}}> Manage </Button_S2>
                            </div>
                          </section>
                      </article >
                  </Card>
                  ))}
                </Card>}
            </div>
          </div>
        </CardBody>
      </Card>
    </main>
  )
}

export default HomeUI;

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

    } 
*/}