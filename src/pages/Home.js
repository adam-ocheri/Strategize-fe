import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { logout, reset } from 'src/app/state_management/user/authSlice';
import { createProject, getAllProjects, getProject, updateProject, deleteProject } from 'src/app/state_management/project/projectSlice';
function Home() {
    //! To be migrated!! ------------------------------------------------------------------------------------------------------------------------
    const [formData, setFormData] = useState({
        projectName: '',
    });
    const { projectName } = formData;
    const { data } = useAppSelector((state) => state.project);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!projectName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(createProject({ projectName: projectName, owner: user._id, token: user.token }));
        }
    };
    const onLogoutClicked = () => {
        dispatch(logout());
        dispatch(reset());
        navigator('/');
    };
    const onUpdateProjectName = (e, id) => {
        console.log(id);
        dispatch(updateProject({ projectName: projectName, id: id, token: user.token }));
    };
    const onEditProject = (e, id) => {
        console.log("trying to EDIT PROJECT...........");
        console.log(id);
        dispatch(getProject({ id: id, token: user.token }));
        navigator('/project');
    };
    //! Immigrants Border -----------------------------------------------------------------------------------------------------------------------
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            navigator('/login');
        }
        else {
            dispatch(getAllProjects({ owner: user._id, token: user.token }));
        }
    }, [user, navigator]);
    return (_jsxs("section", { children: [user && _jsxs("div", { children: [_jsx("h1", { children: "Welcome" }), _jsxs("p", { children: ["Name: ", user.name] }), _jsxs("p", { children: ["Email : ", user.email] }), _jsxs("p", { children: ["ID : ", user._id] }), _jsx("p", { children: _jsx("button", { onClick: onLogoutClicked, children: "Logout" }) })] }), _jsxs("div", { children: [_jsx("h2", { children: "Create New Project" }), _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", placeholder: "Project Name", id: "projectName", name: "projectName", value: projectName, onChange: (e) => { onFormUpdated(e); } }), _jsx("button", { type: 'submit', children: "Create" })] })] }), _jsxs("div", { children: [_jsx("h4", { children: "Existing Projects" }), data &&
                        _jsx("div", { children: data.map((project) => (_jsxs("div", { style: { border: '5px solid black', margin: '5px' }, children: [_jsxs("p", { children: ["Project Name: ", project.projectName, _jsx("button", { onClick: (e) => { onUpdateProjectName(e, project._id); }, children: "Update" }), _jsx("button", { onClick: () => { dispatch(deleteProject({ id: project._id, token: user.token })); }, children: "Delete" }), _jsx("button", { onClick: (e) => { onEditProject(e, project._id); }, children: " Edit Project " })] }), _jsxs("p", { children: ["Owner: ", project.owner] })] }, project._id))) })] })] }));
}
export default Home;
