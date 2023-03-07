import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
//Child sub-station
import { createTask, getTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
import Settings_Task from './Settings_Task';
function Task({}) {
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
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT Task...........");
        console.log(id);
        await dispatch(getTask({ id: id, parentId: activeTask._id, token: user.token }));
        navigator('/project/ltg/objective/task');
    };
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { activeLTG } = useAppSelector((state) => state.ltg);
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeTask.taskName) {
            navigator("/project/ltg/objective");
        }
        else {
            dispatch(getAllTasks({ parentId: activeObjective._id, token: user.token }));
        }
    }, []);
    return (_jsxs("div", { className: 'p2 m2 pt5 mt5', children: [_jsxs("h3", { className: 'font-1 white', children: [" ", _jsx(Link, { to: '/project', children: activeProject.projectName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg', children: activeLTG.LTGName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg/objective', children: activeObjective.objectiveName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg/objective/task', children: activeTask.taskName })] }), _jsxs("section", { children: [_jsxs("h2", { className: 'font-3', children: [activeTask.taskName, " :", `${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}`] }), "Date: ", `${activeTask.date !== '' ? activeTask.date.slice(0, 15) : 'No date is set yet'}`, " ", _jsx("br", {}), "Time: ", `${activeTask.date !== '' ? activeTask.date.slice(15, 21) : 'No Time is set yet'}`, _jsx("div", { children: _jsx(Settings_Task, {}) })] })] }));
}
;
export default Task;
