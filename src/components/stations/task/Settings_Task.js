import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { getTask, updateTask, deleteTask } from 'src/app/state_management/task/taskSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
function Settings_Task() {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeTask.taskName) {
            navigator('/project/ltg/objective');
        }
    }, [activeTask]);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        taskName: '',
        stationTypeName: '',
        description: ''
    });
    const { taskName, stationTypeName, description } = formData;
    useEffect(() => {
        setSavePrevented(canSaveSettings());
    }, [taskName, stationTypeName, description]);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = async (e) => {
        e.preventDefault();
        let body = {};
        for (let field in formData) {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0) {
                Object.defineProperty(body, field, { value: val, writable: true, enumerable: true, configurable: true });
            }
        }
        await dispatch(updateTask({ body, id: activeTask._id, parentId: activeTask.owningObjective, token: user.token }));
        await dispatch(getTask({ id: activeTask._id, parentId: activeTask.owningObjective, token: user.token }));
        navigator('/project/ltg/objective/task');
    };
    const canSaveSettings = () => {
        let numModifiedProperties = 0;
        for (let field in formData) {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0) {
                ++numModifiedProperties;
            }
        }
        return numModifiedProperties === 0;
    };
    const onDeleteTask = async () => {
        await dispatch(deleteTask({ id: activeTask._id, owningLTG: activeTask.owningLTG, owner: user._id, token: user.token }));
        navigator('/');
    };
    return (_jsxs("div", { children: [_jsxs("h2", { children: [`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType}`, " Settings"] }), _jsxs("form", { onSubmit: (e) => { onFormSubmitted(e); }, children: [_jsxs("div", { children: ["Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeTask.taskName, id: "taskName", name: "taskName", value: taskName, onChange: (e) => { onFormUpdated(e); } })] }), _jsxs("div", { children: ["Station Type Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeTask.stationTypeName, id: "stationTypeName", name: "stationTypeName", value: stationTypeName, onChange: (e) => { onFormUpdated(e); } })] }), _jsxs("div", { children: ["Description: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeTask.description, id: "Description", name: "description", value: description, onChange: (e) => { onFormUpdated(e); } })] }), _jsx("button", { type: 'submit', disabled: savePrevented, children: "Save" })] }), deletePrompt ? _jsxs("div", { children: ["This will delete the Task and all of it's data! ", _jsx("br", {}), "Are you sure? ", _jsx("br", {}), _jsx("button", { onClick: () => onDeleteTask(), children: "Delete" }), _jsx("button", { onClick: () => setDeletePrompt(false), children: "Cancel" })] })
                : _jsx("div", { children: _jsx("button", { onClick: () => setDeletePrompt(true), children: "DELETE" }) })] }));
}
export default Settings_Task;
