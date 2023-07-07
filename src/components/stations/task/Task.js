import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllLTGs, getLTG } from 'src/app/state_management/LTG/LTGSlice';
//Child sub-station
import { getAllTasks, setActiveTask, updateTask } from 'src/app/state_management/task/taskSlice';
import Settings_Task from './Settings_Task';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, Switch } from '@chakra-ui/react';
import TaskStatus from './taskStatus';
function Task({}) {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { activeLTG, data } = useAppSelector((state) => state.ltg);
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    const [originTask, setOriginTask] = useState(null);
    const [currentTaskIteration, setCurrentTaskIteration] = useState(activeTask?.iteration);
    const [taskCompleted, setTaskCompleted] = useState(activeTask.goalAchieved);
    //INIT component & data
    useEffect(() => {
        if (!activeTask?.taskName) {
            navigator("/project/ltg/objective");
        }
        else {
            const initData = async () => {
                await dispatch(setCurrentStationContext({ newContext: 'task' }));
            };
            initData();
            if (!activeProject || !activeLTG || !activeObjective.objectiveName || activeObjective._id !== activeTask.heritage.objective.id || activeObjective.owningLTG !== activeTask.heritage.ltg.id) {
                const getSuperStations = async () => {
                    await dispatch(getAllLTGs({ parentId: activeProject._id, token: user.token }));
                    let stationsFound = false;
                    for (let LTG of data) {
                        if (!stationsFound) {
                            await dispatch(getObjective({ id: activeTask.owningObjective, parentId: LTG._id, token: user.token }))
                                .then(async (response) => {
                                if (response.payload) {
                                    console.log(' getting ALL LTGs for Task Tree...');
                                    console.log(response);
                                    await dispatch(getLTG({ id: response.payload.owningLTG, parentId: activeProject._id, token: user.token }));
                                    stationsFound = true;
                                }
                            });
                        }
                    }
                };
                getSuperStations();
            }
        }
    }, []);
    useEffect(() => {
        if (activeTask) {
            if (activeTask.isSubtask) {
                const getData = async () => {
                    await dispatch(getAllTasks({ parentId: activeTask.owningObjective, token: user.token }))
                        .then((response) => {
                        if (response.payload) {
                            console.log(response);
                            const [taskOrigin] = response.payload?.filter((item, index) => {
                                console.log('trying to find SubtaskOrigin....');
                                console.log(activeTask.origin === item._id);
                                console.log('Setting TaskOrigin');
                                setOriginTask(item);
                                return activeTask.origin === item._id;
                            });
                        }
                    });
                };
                getData();
            }
            else {
                setOriginTask(activeTask);
            }
            setCurrentTaskIteration(activeTask.iteration);
        }
    }, [activeTask]);
    useEffect(() => {
        console.log('current TaskIteration is:');
        console.log(currentTaskIteration);
        if (activeTask && originTask !== null) {
            console.log('LOGGING OriginTask::');
            console.log(originTask);
            if (currentTaskIteration !== activeTask.iteration) { // TODO WTF
                console.log('currentTaskIteration !== activeTask.iteration');
                if (currentTaskIteration > 0) {
                    console.log('currentTaskIteration > 0');
                    let [subTask] = originTask?.HISTORY_TaskIterations?.filter((item, index) => {
                        return currentTaskIteration === item.iteration;
                    });
                    if (subTask) {
                        console.log('subTask');
                        console.log(subTask);
                        dispatch(setActiveTask({ item: subTask }));
                    }
                    else {
                        console.log('subTask INVALID!!!!!');
                    }
                }
                else {
                    dispatch(setActiveTask({ item: originTask }));
                }
            }
        }
    }, [currentTaskIteration, originTask, activeTask]);
    const onSubtaskIterationChange = (direction) => {
        let newIteration = activeTask.iteration + direction;
        console.log('updating Iteration...');
        console.log(newIteration >= 0 && newIteration);
        console.log(newIteration <= originTask?.HISTORY_TaskIterations?.length);
        console.log(originTask);
        const isIterationInRange = newIteration >= 0 && newIteration <= originTask?.HISTORY_TaskIterations?.length;
        isIterationInRange ? setCurrentTaskIteration(newIteration) : null;
    };
    async function updateTaskCompletionStatus() {
        const response = await dispatch(updateTask({ body: { goalAchieved: !taskCompleted }, id: activeTask._id, parentId: activeTask.owningObjective, token: user.token }));
        dispatch(setActiveTask({ item: response.payload }));
        setTaskCompleted(!taskCompleted);
    }
    return (_jsxs("div", { className: 'pt3 mt3 m3 b-color-dark-2 white border-left-w1 border-left-white border-left-solid border-right-w1 border-right-white border-right-solid border-bottom-w1 border-bottom-white border-bottom-solid', children: [activeLTG && activeObjective &&
                _jsx("h3", { className: 'font-1 white station-nav-link-container b-color-dark-1', children: _jsxs("div", { className: 'p4 m4', children: [_jsx(Link, { to: '/project', className: 'station-nav-link', children: activeProject.projectName }), " ", _jsx(ArrowRightIcon, {}), _jsx(Link, { to: '/project/ltg', className: 'station-nav-link', children: activeLTG.LTGName }), " ", _jsx(ArrowRightIcon, {}), _jsx(Link, { to: '/project/ltg/objective', className: 'station-nav-link', children: activeObjective.objectiveName }), " ", _jsx(ArrowRightIcon, {}), _jsx(Link, { to: '/project/ltg/objective/task', className: 'station-nav-link-active', children: activeTask.taskName })] }) }), _jsx("div", { className: 'pb1 mb5 border-top-w1 border-top-white border-top-solid' }), _jsx("div", { className: ' p3 m3', children: _jsxs("section", { className: 'font-3', children: [originTask?.HISTORY_TaskIterations?.length > 0 && _jsxs("div", { className: 'centered flex f-dir-col', children: [_jsxs("div", { children: [_jsx(Button_S2, { onClick: () => onSubtaskIterationChange(-1), children: '<' }), _jsx("span", { children: "Task Iteration" }), _jsx(Button_S2, { onClick: () => onSubtaskIterationChange(1), children: '>' })] }), originTask && _jsxs("div", { children: [_jsx("button", { className: `red task-iterations ${activeTask.iteration === 0 ? 'task-iteration-active' : ''}`, onClick: () => setCurrentTaskIteration(0), children: 'O' }), originTask && originTask.HISTORY_TaskIterations.map((item) => (_jsx("button", { className: `white task-iterations ${item.iteration === currentTaskIteration ? 'task-iteration-active' : ''}`, onClick: () => setCurrentTaskIteration(item.iteration), children: item.iteration }, item._id)))] })] }), _jsxs("h2", { className: 'font-1 s4', children: [': ', activeTask.taskName, " :", _jsx("span", { className: 'font-5 s2 m3 orange', children: `${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}` })] }), _jsxs(Card, { children: [_jsxs(Flex, { direction: 'column', padding: '1vw', children: [_jsx(CardHeader, { children: "Status" }), _jsxs(Flex, { direction: 'row', padding: '1vw', justifyContent: 'space-between', children: [_jsx(TaskStatus, { item: activeTask }), _jsxs(CardBody, { border: '2px solid black', borderRadius: '10px', maxWidth: '50%', minWidth: '50vw', alignSelf: 'center', children: [_jsxs(Box, { as: 'span', margin: '5px', children: [`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}`, " completion status"] }), _jsx(Switch, { defaultChecked: taskCompleted, onClick: updateTaskCompletionStatus, margin: '5px' })] })] })] }), _jsx(CardFooter, {})] }), _jsxs("div", { className: 'p2 m2', children: [_jsx("span", { className: 's1 orange', children: " Date:" }), "  ", _jsxs("span", { className: 's2 ml4', children: [`${activeTask.date !== '' ? activeTask.date.slice(0, 15) : 'No date is set yet'}`, " "] }), " ", _jsx("br", {}), _jsx("span", { className: 's1 orange', children: "Time:" }), " ", _jsxs("span", { className: 's2 ml4', children: [`${activeTask.date !== '' ? activeTask.date.slice(15, 21) : 'No Time is set yet'}`, " "] })] }), _jsx("div", { className: 'p2 m2 border-top-w0 border-top-white border-top-solid' }), _jsxs("article", { className: 'p2 m2', children: [activeTask.description && _jsxs("div", { className: 'font-5 s2 p3 m3', children: [_jsx("span", { className: 's1 orange', children: " Description: " }), " ", _jsx("span", { className: `s2 ml4`, children: activeTask.description })] }), _jsx("div", { className: 'pb3 mb3 border-top-w0 border-top-white border-top-solid', children: _jsx(Settings_Task, { originTask: originTask, currentTaskIteration: currentTaskIteration }) })] })] }) })] }));
}
;
export default Task;
