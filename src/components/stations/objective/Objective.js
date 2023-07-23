import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { setActiveTask } from 'src/app/state_management/task/taskSlice';
//Child sub-station
import { createTask, getTask, updateTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import { refreshStation } from 'src/app/System/Main/Heritage/Utils/heritageUtils';
import { deleteTask_ProfileView } from 'src/app/state_management/project/projectSlice';
import { ArrowRightIcon } from '@chakra-ui/icons';
import StationAccordion from 'src/components/elements/accordions/main/StationAccordion';
import { determineSubstationTypeNameOrigin, formatName } from '../stationGlobals/stationUtils';
function Objective({}) {
    const [formData, setFormData] = useState({
        newTaskName: '',
    });
    const { newTaskName } = formData;
    const [creatingNewTask, setCreatingNewTask] = useState(false);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = async (e) => {
        e.preventDefault();
        if (!newTaskName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to create new task...");
            console.log(formData);
            const heritage = {
                project: { id: activeProject._id, name: activeProject.projectName },
                ltg: { id: activeLTG._id, name: activeLTG.LTGName },
                objective: { id: activeObjective._id, name: activeObjective.objectiveName }
            };
            const response = await dispatch(createTask({ taskName: newTaskName, heritage, parentId: activeObjective._id, owner: user._id, token: user.token }));
            setTaskData((prev) => ([...prev, response.payload]));
            setCreatingNewTask(false);
        }
    };
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT Task...........");
        console.log('ManagingSelected Station.....');
        console.log(id);
        await dispatch(getTask({ id: id, parentId: activeObjective._id, token: user.token }));
        navigator('/project/ltg/objective/task');
    };
    const manageSelectedTask_Remote = async (e, id, parentObjectiveId, _item, { subTask }) => {
        console.log("trying to EDIT Task...........");
        console.log('manageSelectedTask_Remote!!!!!!.....');
        console.log(subTask);
        if (subTask !== null) {
            console.log('SUBTASK is OK! :)');
            await dispatch(setActiveTask({ item: subTask }));
        }
        else {
            console.log('SUBTASK is SHIT!!!!!!! :(');
            await dispatch(getTask({ id: id, parentId: parentObjectiveId, token: user.token }));
        }
        navigator('/project/ltg/objective/task');
    };
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject, allUserTasks } = useAppSelector((state) => state.project);
    const { activeLTG } = useAppSelector((state) => state.ltg);
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { data, activeTask, isLoading } = useAppSelector((state) => state.task);
    const { user, stationContext } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeObjective.objectiveName) {
            navigator("/");
        }
        else {
            // reset__Task();
            const getData = async () => {
                await dispatch(setCurrentStationContext({ newContext: 'objective' }));
                const response = await dispatch(getAllTasks({ parentId: activeObjective._id, token: user.token }));
                setTaskData(response.payload);
            };
            getData();
        }
    }, []);
    useEffect(() => {
        setFormData({ newTaskName: '' });
    }, [creatingNewTask]);
    const [taskData, setTaskData] = useState([]);
    useEffect(() => {
        refreshStation('objective', activeObjective, allUserTasks, setTaskData);
    }, [allUserTasks]);
    useEffect(() => {
    }, [activeObjective]);
    async function deleteSingleTask(Task) {
        const response = await dispatch(deleteTask({ id: Task._id, parentId: activeObjective._id, owner: user._id, token: user.token }));
        dispatch(deleteTask_ProfileView({ task: response.payload }));
    }
    return (_jsxs("div", { className: 'pt3 mt3 m3 b-color-dark-2 white border-left-w1 border-left-white border-left-solid border-right-w1 border-right-white border-right-solid border-bottom-w1 border-bottom-white border-bottom-solid', children: [_jsx("h3", { className: 'font-1 white station-nav-link-container b-color-dark-1', children: _jsxs("div", { className: 'p4 m4', children: [_jsx(Link, { to: '/project', className: 'station-nav-link', children: activeProject.projectName }), " ", _jsx(ArrowRightIcon, {}), _jsx(Link, { to: '/project/ltg', className: 'station-nav-link', children: activeLTG.LTGName }), " ", _jsx(ArrowRightIcon, {}), _jsx(Link, { to: '/project/ltg/objective', className: 'station-nav-link-active', children: activeObjective.objectiveName })] }) }), _jsx("div", { className: 'pb1 mb5 border-top-w1 border-top-white border-top-solid' }), _jsxs("section", { className: 'p1 m1', children: [_jsxs("h2", { className: 'font-1 s4', children: [activeObjective.objectiveName, " :", _jsxs("span", { className: 'font-5 s2 m3 orange', children: [activeObjective.stationTypeName, " "] })] }), _jsx("div", { children: _jsx(Button_S2, { onClick: (e) => { navigator('/project/ltg/objective/settings'); }, children: "Settings" }) })] }), _jsxs("section", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: [_jsxs("h3", { className: 's3 font-4', children: [" ", formatName(determineSubstationTypeNameOrigin({ scope: 'Task', activeProject, activeLTG, activeObjective }), true)] }), data && _jsxs("div", { className: 'p3 m3 font-5 border-bottom-w0 border-bottom-white border-bottom-solid', children: [_jsx(CalendarDND, { data: taskData, getAllSubstations: async () => { await dispatch(getAllTasks({ parentId: activeObjective._id, token: user.token })); }, updateSubStation: updateTask, dispatch: dispatch, user: user, manage: manageSelectedTask_Remote, activeTask: activeTask, currentContext: stationContext }), _jsxs("article", { children: [_jsxs("div", { className: 'flex f-dir-col jt-center j-even border-white border-w2 border-solid border-r3 b-color-dark-1 white p7 m7', children: [!creatingNewTask &&
                                                _jsxs("a", { onClick: () => setCreatingNewTask(true), children: [_jsx("p", { className: 's4', children: "+" }), _jsxs(Button_S2, { className: 's2 p2', onClick: () => setCreatingNewTask(true), children: ["Add New ", " ", determineSubstationTypeNameOrigin({ scope: 'Task', activeProject, activeLTG, activeObjective })] })] }), creatingNewTask && _jsxs("form", { className: 'flex f-dir-col m7 p7', onSubmit: (e) => onFormSubmitted(e), children: [_jsxs("h3", { className: 'font-1 s3', children: ["Create New ", " ", determineSubstationTypeNameOrigin({ scope: 'Task', activeProject, activeLTG, activeObjective })] }), _jsx("input", { className: "form-input", type: "text", placeholder: "Task Name", id: "newTaskName", name: "newTaskName", value: newTaskName, onChange: (e) => { onFormUpdated(e); } }), _jsx(Button_S2, { className: 's2', type: 'submit', children: "Create New" }), _jsx(Button_S2, { className: 's2', onClick: () => setCreatingNewTask(false), children: "Cancel" })] })] }), _jsx(StationAccordion, { title: `${activeObjective.objectiveName}`, children: data && data.map((Task) => (_jsxs("div", { className: 'flex j-between p3 m3 pl7 pr7 ml7 mr7 border-white border-w1 border-solid border-r2 b-color-dark-1', children: [_jsxs("h4", { className: 'font-5', children: [" ", activeObjective.defaults ?
                                                            formatName(activeObjective.defaults.taskStation_TypeName, false) :
                                                            formatName(activeProject.defaults.taskStation_TypeName, false), _jsxs("span", { className: 'font-2 s2', children: [" ", ': ', Task.taskName, " "] })] }), _jsxs("span", { children: [_jsx(Button_S2, { onClick: (e) => { manageSelectedStation(e, Task._id); }, children: " Manage " }), _jsx(Button_S2, { onClick: () => { deleteSingleTask(Task); }, children: "Delete" })] })] }, Task._id))) })] })] })] })] }));
}
;
export default Objective;
