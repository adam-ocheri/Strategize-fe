import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
//Child sub-station
import { createTask, getTask, deleteTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
function Objective({}) {
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
            dispatch(createTask({ taskName: newTaskName, parentId: activeObjective._id, owner: user._id, token: user.token }));
        }
    };
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT Task...........");
        console.log(id);
        await dispatch(getTask({ id: id, parentId: activeObjective._id, token: user.token }));
        navigator('/project/ltg/objective/task');
    };
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { data, activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeObjective.objectiveName) {
            navigator("/");
        }
        else {
            dispatch(getAllTasks({ parentId: activeObjective._id, token: user.token }));
        }
    }, []);
    return (_jsxs("div", { children: [_jsxs("section", { children: [_jsxs("h2", { children: [" ", activeObjective.objectiveName, " "] }), _jsx("div", { children: _jsx("button", { onClick: (e) => { navigator('/project/ltg/objective/settings'); }, children: "Settings" }) })] }), _jsxs("section", { children: [_jsx("h3", { children: " Tasks " }), data && _jsx("div", { children: data.map((Task) => (_jsxs("div", { children: ["Task: ", Task.taskName, _jsxs("p", { children: [_jsx("button", { onClick: (e) => { manageSelectedStation(e, Task._id); }, children: " Manage " }), _jsx("button", { onClick: () => { dispatch(deleteTask({ id: Task._id, parentId: activeObjective._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, Task._id))) })] }), _jsx("section", { children: _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", placeholder: "Task Name", id: "newTaskName", name: "newTaskName", value: newTaskName, onChange: (e) => { onFormUpdated(e); } }), _jsx("button", { type: 'submit', children: "Add New" })] }) })] }));
}
;
export default Objective;
