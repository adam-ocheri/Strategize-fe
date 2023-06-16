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
import { Card, CardHeader, CardBody, CardFooter, Text, Center, Divider, Menu, MenuButton, MenuList, MenuItem, Icon, IconButton, Button, MenuGroup, MenuDivider } from '@chakra-ui/react'

function HomeUI() {

  //! To be migrated!! ------------------------------------------------------------------------------------------------------------------------
    const [formData, setFormData] = useState({
      projectName: '',
  })
  const {projectName} = formData;
  
  const {data} = useAppSelector((state) => state.project)

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
    <main className='p1 m1'>
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
      <Card >  {/*className='card-main quad-box-shadow-4 p1 m1'*/}
        <CardBody className='b-color-dark-1 p4 m5 quad-box-shadow-1'>
            <CardHeader className='b-color-dark-2 border-r2 p5'>
                <h1 className=' m3 font-3 white s3'>Welcome back, <span className='orange font-5'>strategizer</span></h1>
                <section className='flex f-dir-row j-between p5'>
                    <div className=' font-5 white'>
                        <p className='p2 m2'>
                            <strong className='font-6 white p2 m2'>Name : </strong> <span className='p2 m2'>{user.name}</span>
                        </p>
                        <p className='p2 m2'>
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
                    <div className='centered '>
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
                    current[stationType]CompletionRatio : float () => { return`${( / )}`;},
                }

                total[stationType] : number,
                totalCompletedAndArchived[stationType] : number,
                current[stationType]CompletionRatio : float () => { return`${(total[stationType] / totalCompleted[stationType]) * 100.0f} %`;},

                featuresPreferencesTracking : {
                    
                }
                
            }

          } */}

            <Menu>
                <MenuButton as={Button} colorScheme='pink'>
                    Projects
                </MenuButton>
                {data && user  && 
                <MenuList className='card-sub p3 m3 quad-box-shadow-1'>
                <h4 className='s3 p2 m2 font-3 centered'>Existing Projects</h4>
                {data.map((project : any) => (
                <MenuGroup key={project._id} className='card-sub-child m3' title={project._id}>
                    <MenuItem className='card-sub-child'>
                        <div className='flex'>
                            <h2 className='font-1 s1 p1 m1 orange '>Project Name :</h2> <h3 className='font-6 s2 p3 m3 white'>{project.projectName}</h3>
                            <div className='flex parent flex-flow-left'>
                                <Button_S2 className='p3 m3' onClick={(e : any) => {manageSelectedStation(e, project._id)}}> Manage </Button_S2>
                            </div>
                        </div>
                        <div>
                            <h2 className='font-1 s1 p1 m1 orange'>Owner :</h2> <h3 className='font-2 s2 p1 m1 white'>{user.name}</h3> 
                        </div>
                    </MenuItem>
                    {/* <MenuDivider /> */}
                </MenuGroup>
                ))}
                </MenuList>}
            </Menu>
        </CardBody>
      </Card>
    </main>
  )
}

export default HomeUI;