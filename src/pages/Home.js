import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { logout, reset } from 'src/app/state_management/user/authSlice';
import { createProject, getAllProjects, getProject, updateProject } from 'src/app/state_management/project/projectSlice';
import ChartBar from 'src/components/charts/ChartBar';
import ChartLine from 'src/components/charts/ChartLine';
import ChartPie from 'src/components/charts/ChartPie';
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
    const onLogoutClicked = async () => {
        await dispatch(logout());
        dispatch(reset());
        navigator('/register');
    };
    const onUpdateProjectName = async (e, id) => {
        console.log(id);
        await dispatch(updateProject({ projectName: projectName, id: id, token: user.token }));
    };
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT PROJECT...........");
        console.log(id);
        await dispatch(getProject({ id: id, token: user.token }));
        navigator('/project');
    };
    //! Immigrants Border -----------------------------------------------------------------------------------------------------------------------
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            navigator('/register');
        }
        else {
            dispatch(getAllProjects({ owner: user._id, token: user.token }));
        }
    }, [user, navigator]);
    return (_jsxs("main", { className: 'generic-container-1 p1 m1', children: [user && _jsx("div", { className: 'generic-container-3 font-5', children: _jsxs("div", { className: 'generic-container-3 card-sub-main quad-box-shadow-2', children: ["   ", _jsx("h1", { className: 'font-1 s6', children: "Welcome" }), _jsxs("div", { className: 'generic-container-3 font-5', children: [_jsxs("p", { children: [_jsx("strong", { className: 'font-6', children: "Name : " }), " ", user.name] }), _jsxs("p", { children: [_jsx("strong", { className: 'font-6', children: "Email : " }), " ", user.email] }), _jsx("p", { children: _jsx("button", { onClick: onLogoutClicked, children: "Logout" }) })] }), _jsxs("div", { className: 'flex p2 m2 j-center j-even', children: [_jsxs("div", { className: 'p1 m1', children: [" ", _jsx(ChartPie, {}), " "] }), _jsxs("div", { className: 'p1 m1', children: [" ", _jsx(ChartBar, {}), " "] }), _jsxs("div", { className: 'p1 m1', children: [" ", _jsx(ChartLine, {}), " "] })] })] }) }), _jsx("section", { className: 'card-main quad-box-shadow-4 p1 m1', children: _jsxs("article", { className: 'card-sub-main p4 m5 quad-box-shadow-2', children: [_jsxs("div", { className: 'centered', children: [_jsx("h2", { className: 'font-3', children: "Create New Project" }), _jsxs("form", { className: 'form-generic', onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-generic-input font-2", type: "text", placeholder: "Project Name", id: "projectName", name: "projectName", value: projectName, onChange: (e) => { onFormUpdated(e); } }), _jsx("button", { type: 'submit', children: "Create" })] })] }), _jsx("div", { className: 'p3 m3', children: data && user &&
                                _jsxs("div", { className: 'card-sub p3 m3 quad-box-shadow-1', children: [_jsx("h4", { className: 's3 p2 m2 orange font-5 centered', children: "Existing Projects" }), data.map((project) => (_jsxs("div", { className: 'card-sub-child p3 m3', children: [_jsxs("div", { className: 'flex', children: [_jsx("h2", { className: 'font-1 s1 p1 m1 orange ', children: "Project Name :" }), " ", _jsx("h3", { className: 'font-2 s4 p3 m3 white', children: project.projectName }), _jsx("div", { className: 'flex parent flex-flow-left', children: _jsx("button", { className: 'p3 m3', onClick: (e) => { manageSelectedStation(e, project._id); }, children: " Manage " }) })] }), _jsxs("div", { children: [_jsx("h2", { className: 'font-1 s1 p1 m1 orange', children: "Owner :" }), " ", _jsx("h3", { className: 'font-2 s2 p1 m1 black', children: user.name })] })] }, project._id)))] }) })] }) })] }));
}
export default Home;
