import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getAllLTGs } from 'src/app/state_management/LTG/LTGSlice';
import { getAllObjectives } from 'src/app/state_management/objective/objectiveSlice';

export default function StrateGStats({allUserTasks, station, user} : {allUserTasks : any, station : any, user : any}) {

    //! State variables data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const [tasks, setTasks] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [LTGs, setLTGs] = useState([]);

    const dispatch = useAppDispatch();
    const {data} = useAppSelector((state) => state.ltg)

    //! Initialize ${Project} heritage data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(()=>{
        if (allUserTasks) getStatData();
    }, [allUserTasks])

    //! Gather the Tasks, Objectives and LTGs data of a given ${Project} - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const getStatData = ()=> {
        
        const projectTasks = allUserTasks.filter((task : any) => task.heritage.project.id == station._id);

        let projectLTGs : any = processStationData(projectTasks, 'ltg', 'project');
        let projectObjectives : any = processStationData(projectTasks, 'objective', 'ltg');

        setTasks(projectTasks);
        setObjectives(projectObjectives);
        setLTGs(projectLTGs);
    }

    //! Generate a list of objects containing the ${name} and ${id} of relative station (Obj || LTG) and it's parent station (LTG || Project) respectively - - - - - - - 
    const processStationData = (stations : any, stationType : string, parentType : string) => {
        let stationData : any = [{
            station: {
                name: '',
                id: ''
            }, 
            parent: { 
                name: '',
                id: ''
            }
        }];

        for (let projectTask of stations) {

            const notInArrayYet : boolean = stationData.every(
                (stationD : any) => {
                    return stationD.station.id !== projectTask.heritage[`${stationType}`].id;
            });

            if (notInArrayYet) {
                stationData.push({
                    station: {
                        name: projectTask.heritage[`${stationType}`].name,
                        id: projectTask.heritage[`${stationType}`].id
                    }, 
                    parent: { 
                        name: projectTask.heritage[`${parentType}`].name,
                        id: projectTask.heritage[`${parentType}`].id
                    }
                });
            }
        }

        return stationData;
    }

    return (
        <>
            {allUserTasks && LTGs && objectives && tasks &&
            <Accordion defaultIndex={[-1]} allowMultiple>
                {LTGs.filter((ltg : any) => ltg.parent.id == station._id)
                .map((ltg : any) => (
                <AccordionItem key={ltg.station.id} >
                        <h2>
                            <AccordionButton className='card-sub-child orange' border={'2px solid #fab50066'} _hover={{border: '2px solid #fab500'}}>
                            <Box as="span" flex='1' textAlign='left' className='card-sub-child-2 s2' borderRadius={'6px'} padding={'4px'} color={'green'}>
                                {ltg.station.name}
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                        </h2>
                    
                        <AccordionPanel>
                            <Accordion defaultIndex={[-1]} allowMultiple>
                                {objectives.filter((obj : any) => obj.parent.id == ltg.station.id)
                                .map((objective : any) => (
                                <AccordionItem key={objective.station.id}>
                                    <h2>
                                        <AccordionButton className='card-sub-child orange' border={'2px solid #fab50066'} _hover={{border: '2px solid #fab500'}}>
                                        <Box as="span" flex='1' textAlign='left' className='card-sub-child-2' borderRadius={'6px'} padding={'4px'} color={'red'}>
                                            {objective.station.name}
                                        </Box>
                                        <AccordionIcon />
                                        </AccordionButton>
                                    </h2>

                                    <AccordionPanel background={'#fab500'}>
                                        {tasks.filter((task: any) => task.owningObjective == objective.station.id )
                                        .map((task : any) => {
                                            return (
                                                <div key={task._id} className='m1 font-1 s1 b-color-dark-2 white border-r1'>
                                                    <span className=''><span className='s2'>{`● `}</span>{task.taskName}</span>
                                                </div>
                                            )
                                        })}
                                    </AccordionPanel>
                                </AccordionItem>
                                
                                ))}
                            </Accordion>
                        </AccordionPanel>
                </AccordionItem>
                ))}
            </Accordion>}
        </>
    )
}
