import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
//Child sub-station
import { createTask, getTask, updateTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
function Objective({}) {
    const [formData, setFormData] = useState({
        newTaskName: '',
    });
    const { newTaskName } = formData;
    const [showData, setShowData] = useState(true);
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
            console.log("trying to login...");
            console.log(formData);
            await dispatch(createTask({ taskName: newTaskName, parentId: activeObjective._id, owner: user._id, token: user.token }));
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
    const manageSelectedTask_Remote = async (e, id, parentObjectiveId) => {
        console.log("trying to EDIT Task...........");
        console.log('manageSelectedTask_Remote.....');
        console.log(id);
        await dispatch(getTask({ id: id, parentId: parentObjectiveId, token: user.token }));
        navigator('/project/ltg/objective/task');
    };
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { activeLTG } = useAppSelector((state) => state.ltg);
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { data, activeTask, isLoading } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeObjective.objectiveName) {
            navigator("/");
        }
        else {
            // reset__Task();
            const getData = async () => await dispatch(getAllTasks({ parentId: activeObjective._id, token: user.token }));
            getData();
        }
    }, []);
    useEffect(() => {
        setFormData({ newTaskName: '' });
    }, [creatingNewTask]);
    return (_jsxs("div", { className: 'pt5 mt5', children: [_jsxs("section", { children: [_jsxs("h3", { className: 'font-1 white', children: [" ", _jsx(Link, { to: '/project', children: activeProject.projectName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg', children: activeLTG.LTGName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg/objective', children: activeObjective.objectiveName }), " "] }), _jsxs("h2", { className: 'font-1', children: [activeObjective.objectiveName, " :", `${activeObjective.stationTypeName ? activeObjective.stationTypeName : activeObjective.stationType ? activeObjective.stationType : 'Objective'}`] }), _jsx("div", { children: _jsx("button", { onClick: (e) => { navigator('/project/ltg/objective/settings'); }, children: "Settings" }) })] }), _jsxs("section", { children: [_jsx("h3", { children: " Tasks " }), data && _jsxs("div", { children: [_jsx(CalendarDND, { data: data, getAllSubstations: async () => { await dispatch(getAllTasks({ parentId: activeObjective._id, token: user.token })); }, updateSubStation: updateTask, dispatch: dispatch, user: user, manage: manageSelectedTask_Remote }), _jsxs("article", { children: [_jsxs("div", { className: 'flex f-dir-col jt-center j-even border-white border-w2 border-solid border-r3 b-color-dark-2 white p7 m7', children: [!creatingNewTask &&
                                                _jsxs("a", { onClick: () => setCreatingNewTask(true), children: [_jsx("p", { className: 's4', children: "+" }), _jsx(Button_S2, { className: 's2 p2', onClick: () => setCreatingNewTask(true), children: "Add New Task" })] }), creatingNewTask && _jsxs("form", { className: 'flex f-dir-col m7 p7', onSubmit: (e) => onFormSubmitted(e), children: [_jsx("h3", { className: 'font-1 s3', children: "Create New Task" }), _jsx("input", { className: "form-input", type: "text", placeholder: "Task Name", id: "newTaskName", name: "newTaskName", value: newTaskName, onChange: (e) => { onFormUpdated(e); } }), _jsx(Button_S2, { className: 's2', type: 'submit', children: "Create New" }), _jsx(Button_S2, { className: 's2', onClick: () => setCreatingNewTask(false), children: "Cancel" })] })] }), _jsx("input", { type: 'checkbox', id: 'collapse', checked: showData, onChange: () => setShowData(!showData) }), _jsx("label", { htmlFor: 'collapse', children: " View All Tasks " }), showData && data && data.map((Task) => (_jsxs("div", { className: 'flex j-between p1 m1 pl7 pr7 ml7 mr7 border-white border-w1 border-solid border-r2', children: ["Task: ", Task.taskName, _jsxs("span", { children: [_jsx("button", { onClick: (e) => { manageSelectedStation(e, Task._id); }, children: " Manage " }), _jsx("button", { onClick: () => { dispatch(deleteTask({ id: Task._id, parentId: activeObjective._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, Task._id)))] })] })] })] }));
}
;
export default Objective;
