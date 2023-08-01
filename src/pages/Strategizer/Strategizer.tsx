import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { logout, User, reset } from 'src/app/state_management/user/authSlice';
import { RootState } from 'src/app/store';
import { createProject, getAllProjects, getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';

import ChartBar from 'src/components/charts/ChartBar/ChartBar';
import ChartLine from 'src/components/charts/ChartLine/ChartLine';
import ChartPie from 'src/components/charts/ChartPie/ChartPie';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { Card, CardHeader, CardBody, CardFooter, Text, Center, Divider, Menu, MenuButton, MenuList, MenuItem, Icon, IconButton, Button, MenuGroup, MenuDivider, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Input } from '@chakra-ui/react'
import StrateGStats from './StrateGStats';
import { StationsContext } from 'src/components/stations/stationGlobals/StationsGlobalProvider';

function Strategizer() {

  const {testThisLogicWorks, manageSelectedTask_Remote} = useContext(StationsContext)
 
  
  const {data, allUserTasks} = useAppSelector((state) => state.project)

  

  const manageSelectedStation = async (e : any, id : any) => {
    console.log("trying to EDIT PROJECT...........")
    console.log(id);
    await dispatch(getProject({id: id, token: user.token}));
    navigator('/project');
  }

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
    <main className='p1' style={{minHeight: '100vh', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#010111', width: '100%'}}>
        <Card className='card-main quad-box-shadow-4 jt-center' background={'blackAlpha.400'} style={{width: '100%'}}>  {/*className='card-main quad-box-shadow-4 p1 m1'*/}
          <CardBody className='b-color-dark-1 p4 quad-box-shadow-1'>
            <CardHeader className='b-color-dark-2 border-r2 p5'>
              <h1 className=' m3 font-3 white s3 jt-left'>Strategizer</h1>
            </CardHeader>
          </CardBody>
        </Card>
      <Card className='card-main quad-box-shadow-4' background={'blackAlpha.400'} >  {/*className='card-main quad-box-shadow-4 p1 m1'*/}
        <CardBody className='b-color-dark-1 p4 quad-box-shadow-1'>
          <div className='centered'>
            <Accordion>
                {data && user  && 
                <Card className=' p3 m3 quad-box-shadow-1' backgroundColor={'#13122f'} style={{borderLeft: '2px solid aqua', borderRight:'2px solid aqua', borderBottom:'2px solid aqua', borderTop:'22px solid aqua'}}>
                  <h4 className='s3 p2 m2 font-6 centered' style={{color: '#ffefef'}}>Existing Projects</h4>
                  {data.map((project : any) => (
                  <AccordionItem key={project._id} _hover={{background: '#ffc8a3'}}>
                      <h2>
                        <AccordionButton className='orange' background={'#110628'} border={'2px solid #fab50066'} _hover={{border: '2px solid #fab500', background: '#ffc8a3', color: '#001102'}}>
                          <Box as="span" flex='1' textAlign='left' className='' borderRadius={'6px'} padding={'4px'}>
                            {project.projectName}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel style={{width: '50vw'}} className='card-sub-child-2' onClick={testThisLogicWorks}>
                          <section className='flex f-dir-col j-even'>
                              <h2 className='font-1 s1 p1 m1 orange '>Project Name :</h2> <h3 className='font-6 s3 p3 m3 white'>{project.projectName}</h3> 
                              {allUserTasks &&
                              <div>
                                <StrateGStats allUserTasks={allUserTasks} station={project} user={user} manageSelectedTask={manageSelectedTask_Remote}/>
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

export default Strategizer;

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