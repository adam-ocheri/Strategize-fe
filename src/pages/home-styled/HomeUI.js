import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { logout, reset } from 'src/app/state_management/user/authSlice';
import { createProject, getAllProjects, getProject, updateProject } from 'src/app/state_management/project/projectSlice';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { Card, CardHeader, CardBody, Center, Divider, Menu, MenuButton, MenuList, MenuItem, Button, MenuGroup } from '@chakra-ui/react';
function HomeUI() {
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
    return (_jsx("main", { className: 'p1 m1', children: _jsxs(Card, { children: ["  ", _jsxs(CardBody, { className: 'b-color-dark-1 p4 m5 quad-box-shadow-1', children: [_jsxs(CardHeader, { className: 'b-color-dark-2 border-r2 p5', children: [_jsxs("h1", { className: ' m3 font-3 white s3', children: ["Welcome back, ", _jsx("span", { className: 'orange font-5', children: "strategizer" })] }), _jsxs("section", { className: 'flex f-dir-row j-between p5', children: [_jsxs("div", { className: ' font-5 white', children: [_jsxs("p", { className: 'p2 m2', children: [_jsx("strong", { className: 'font-6 white p2 m2', children: "Name : " }), " ", _jsx("span", { className: 'p2 m2', children: user.name })] }), _jsxs("p", { className: 'p2 m2', children: [_jsx("strong", { className: 'font-6 white p2 m2', children: "Email : " }), " ", _jsx("span", { className: 'p2 m2', children: user.email })] }), _jsx("p", {})] }), _jsx("div", { children: _jsx(Center, { height: '130px', children: _jsx(Divider, { orientation: 'vertical' }) }) }), _jsxs("div", { className: 'centered ', children: [_jsx("h2", { className: 'font-3 s2 orange', children: "Create New Project" }), _jsxs("form", { className: 'form-generic flex f-dir-col', onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-generic-input font-2", type: "text", placeholder: "Project Name", id: "projectName", name: "projectName", value: projectName, onChange: (e) => { onFormUpdated(e); } }), _jsx(Button_S2, { type: 'submit', children: "Create" })] })] })] })] }), _jsxs(Menu, { children: [_jsx(MenuButton, { as: Button, colorScheme: 'pink', children: "Projects" }), data && user &&
                                    _jsxs(MenuList, { className: 'card-sub p3 m3 quad-box-shadow-1', children: [_jsx("h4", { className: 's3 p2 m2 font-3 centered', children: "Existing Projects" }), data.map((project) => (_jsx(MenuGroup, { className: 'card-sub-child m3', title: project._id, children: _jsxs(MenuItem, { className: 'card-sub-child', children: [_jsxs("div", { className: 'flex', children: [_jsx("h2", { className: 'font-1 s1 p1 m1 orange ', children: "Project Name :" }), " ", _jsx("h3", { className: 'font-6 s2 p3 m3 white', children: project.projectName }), _jsx("div", { className: 'flex parent flex-flow-left', children: _jsx(Button_S2, { className: 'p3 m3', onClick: (e) => { manageSelectedStation(e, project._id); }, children: " Manage " }) })] }), _jsxs("div", { children: [_jsx("h2", { className: 'font-1 s1 p1 m1 orange', children: "Owner :" }), " ", _jsx("h3", { className: 'font-2 s2 p1 m1 white', children: user.name })] })] }) }, project._id)))] })] })] })] }) }));
}
export default HomeUI;
