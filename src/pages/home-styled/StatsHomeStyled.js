import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
export default function StatsHomeStyled({ allUserTasks, station, user }) {
    //! State variables data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const [tasks, setTasks] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [LTGs, setLTGs] = useState([]);
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.ltg);
    //! Initialize ${Project} heritage data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        if (allUserTasks)
            getStatData();
    }, [allUserTasks]);
    //! Gather the Tasks, Objectives and LTGs data of a given ${Project} - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const getStatData = () => {
        const projectTasks = allUserTasks.filter((task) => task.heritage.project.id == station._id);
        let projectLTGs = processStationData(projectTasks, 'ltg', 'project');
        let projectObjectives = processStationData(projectTasks, 'objective', 'ltg');
        setTasks(projectTasks);
        setObjectives(projectObjectives);
        setLTGs(projectLTGs);
    };
    //! Generate a list of objects containing the ${name} and ${id} of relative station (Obj || LTG) and it's parent station (LTG || Project) respectively - - - - - - - 
    const processStationData = (stations, stationType, parentType) => {
        let stationData = [{
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
            const notInArrayYet = stationData.every((stationD) => {
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
    };
    return (_jsx(_Fragment, { children: allUserTasks && LTGs && objectives && tasks &&
            _jsx(Accordion, { defaultIndex: [-1], allowMultiple: true, children: LTGs.filter((ltg) => ltg.parent.id == station._id)
                    .map((ltg) => (_jsxs(AccordionItem, { children: [_jsx("h2", { children: _jsxs(AccordionButton, { className: 'card-sub-child orange', border: '2px solid #fab50066', _hover: { border: '2px solid #fab500' }, children: [_jsx(Box, { as: "span", flex: '1', textAlign: 'left', className: 'card-sub-child-2 s2', borderRadius: '6px', padding: '4px', color: 'green', children: ltg.station.name }), _jsx(AccordionIcon, {})] }) }), _jsx(AccordionPanel, { children: _jsx(Accordion, { defaultIndex: [-1], allowMultiple: true, children: objectives.filter((obj) => obj.parent.id == ltg.station.id)
                                    .map((objective) => (_jsxs(AccordionItem, { children: [_jsx("h2", { children: _jsxs(AccordionButton, { className: 'card-sub-child orange', border: '2px solid #fab50066', _hover: { border: '2px solid #fab500' }, children: [_jsx(Box, { as: "span", flex: '1', textAlign: 'left', className: 'card-sub-child-2', borderRadius: '6px', padding: '4px', color: 'red', children: objective.station.name }), _jsx(AccordionIcon, {})] }) }), _jsx(AccordionPanel, { background: '#fab500', children: tasks.filter((task) => task.owningObjective == objective.station.id)
                                                .map((task) => {
                                                return (_jsx("div", { className: 'm1 font-1 s1 b-color-dark-2 white border-r1', children: _jsxs("span", { className: '', children: [_jsx("span", { className: 's2', children: `● ` }), task.taskName] }) }, task._id));
                                            }) })] }, objective.station.id))) }) })] }, ltg.station.id))) }) }));
}
