import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllLTGs, getLTG } from 'src/app/state_management/LTG/LTGSlice';
//Child sub-station
import { createTask, getAllTasks, setActiveTask } from 'src/app/state_management/task/taskSlice';
import Settings_Task from './Settings_Task';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
function Task({}) {
    const [originTask, setOriginTask] = useState(null);
    const [formData, setFormData] = useState({
        newTaskName: '',
    });
    const { newTaskName } = formData;
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!newTaskName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(createTask({ taskName: newTaskName, parentId: activeTask._id, owner: user._id, token: user.token }));
        }
    };
    // const manageSelectedStation = async (e : any, id : any) => {
    //     console.log("trying to EDIT Task...........")
    //     console.log(id);
    //     await dispatch(getTask({id: id, parentId: activeTask._id, token: user.token}));
    //     navigator('/project/ltg/objective/task');
    // }
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { activeLTG, data } = useAppSelector((state) => state.ltg);
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    const [currentTaskIteration, setCurrentTaskIteration] = useState(activeTask?.iteration);
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
            if (!activeObjective.objectiveName) {
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
            // setCurrentTaskIteration(activeTask.iteration);
        }
    }, []);
    useEffect(() => {
        if (activeTask) {
            if (activeTask.isSubtask) {
                // let taskOrigin : any = {};
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
    return (_jsxs("div", { className: 'pt7 mt7 p3 m3 b-color-dark-2 white', children: [activeLTG && activeObjective && _jsxs("h3", { className: 'font-1 white', children: [" ", _jsx(Link, { to: '/project', children: activeProject.projectName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg', children: activeLTG.LTGName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg/objective', children: activeObjective.objectiveName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg/objective/task', children: activeTask.taskName })] }), _jsxs("section", { className: 'font-3', children: [originTask?.HISTORY_TaskIterations?.length > 0 && _jsxs("div", { className: 'centered flex f-dir-col', children: [_jsxs("div", { children: [_jsx(Button_S2, { onClick: () => onSubtaskIterationChange(-1), children: '<' }), _jsx("span", { children: "Task Iteration" }), _jsx(Button_S2, { onClick: () => onSubtaskIterationChange(1), children: '>' })] }), originTask && _jsxs("div", { children: [_jsx("button", { className: `red task-iterations ${activeTask.iteration === 0 ? 'task-iteration-active' : ''}`, onClick: () => setCurrentTaskIteration(0), children: 'O' }), originTask && originTask.HISTORY_TaskIterations.map((item) => (_jsx("button", { className: `white task-iterations ${item.iteration === currentTaskIteration ? 'task-iteration-active' : ''}`, onClick: () => setCurrentTaskIteration(item.iteration), children: item.iteration }, item._id)))] })] }), _jsxs("h2", { className: 'font-1 s4', children: [activeTask.taskName, " :", _jsx("span", { className: 'font-5 s2 m3 orange', children: `${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}` })] }), _jsxs("article", { className: 'p3 m3', children: ["Date: ", _jsxs("span", { className: 's3 ml4', children: [`${activeTask.date !== '' ? activeTask.date.slice(0, 15) : 'No date is set yet'}`, " "] }), " ", _jsx("br", {}), "Time: ", _jsxs("span", { className: 's3 ml4', children: [`${activeTask.date !== '' ? activeTask.date.slice(15, 21) : 'No Time is set yet'}`, " "] }), activeTask.description && _jsxs("div", { className: 'font-5 s2 p3 m3', children: ["Description: ", _jsx("span", { className: `s3 ml4`, children: activeTask.description })] }), _jsx("div", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: _jsx(Settings_Task, { originTask: originTask, currentTaskIteration: currentTaskIteration }) })] })] })] }));
}
;
export default Task;
