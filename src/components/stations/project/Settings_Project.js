import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { updateProject, deleteProject } from 'src/app/state_management/project/projectSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
function Settings_Project() {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeProject.projectName) {
            navigator('/');
        }
    }, [activeProject]);
    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        projectName: '',
        stationTypeName: ''
    });
    const { projectName, stationTypeName } = formData;
    useEffect(() => {
        setSavePrevented(canSaveSettings());
    }, [projectName, stationTypeName]);
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
        await dispatch(updateProject({ body, id: activeProject._id, token: user.token }));
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
    const onDeleteProject = async () => {
        await dispatch(deleteProject({ id: activeProject._id, owner: user._id, token: user.token }));
        navigator('/');
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Project Settings" }), _jsxs("form", { onSubmit: (e) => { onFormSubmitted(e); }, children: [_jsxs("div", { children: ["Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeProject.projectName, id: "projectName", name: "projectName", value: projectName, onChange: (e) => { onFormUpdated(e); } })] }), _jsxs("div", { children: ["Station Type Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: "Project", id: "stationTypeName", name: "stationTypeName", value: stationTypeName, onChange: (e) => { onFormUpdated(e); } })] }), _jsx("button", { type: 'submit', disabled: savePrevented, children: "Save" })] }), _jsx("button", { onClick: () => onDeleteProject(), children: "DELETE" })] }));
}
export default Settings_Project;
