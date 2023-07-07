import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getProject, updateProject, deleteProject } from 'src/app/state_management/project/projectSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
import { Button, Card, Heading, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { canSaveSettings, formUpdate, formatFormSubmission } from '../stationGlobals/stationUtils';
function Settings_Project() {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { activeProject } = useAppSelector((state) => state.project);
    const { data } = useAppSelector((state) => state.ltg);
    useEffect(() => {
        if (!activeProject.projectName) {
            navigator('/');
        }
    }, [activeProject]);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [currentTabView, setCurrentTabView] = useState('Settings');
    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        projectName: '',
        stationTypeName: '',
        defaults: {
            ltgStation_TypeName: '',
            objStation_TypeName: '',
            taskStation_TypeName: ''
        }
    });
    const { projectName, stationTypeName, defaults } = formData;
    const { ltgStation_TypeName, objStation_TypeName, taskStation_TypeName } = defaults;
    useEffect(() => {
        setSavePrevented(canSaveSettings(formData));
    }, [formData, defaults]);
    const onFormSubmitted = async (e) => {
        e.preventDefault();
        if (savePrevented)
            return;
        const placeholders = {
            ltgStation_TypeName: activeProject.defaults.ltgStation_TypeName,
            objStation_TypeName: activeProject.defaults.objStation_TypeName,
            taskStation_TypeName: activeProject.defaults.taskStation_TypeName
        };
        let body = formatFormSubmission({ ...formData }, placeholders);
        await dispatch(updateProject({ body, id: activeProject._id, token: user.token }));
        await dispatch(getProject({ id: activeProject._id, token: user.token }));
        navigator('/project');
    };
    const onDeleteProject = async () => {
        await dispatch(deleteProject({ id: activeProject._id, owner: user._id, token: user.token }));
        navigator('/');
    };
    //'whiteAlpha.50'
    return (_jsx("div", { style: { marginTop: '65px' }, children: _jsxs(Tabs, { colorScheme: 'yellow', textColor: '#23ffff', background: '#010111', display: 'flex', flexDirection: 'column', children: [_jsxs(TabList, { background: '#12012f', children: [_jsx(Tab, { _hover: { color: '#ffcf22' }, onClick: () => setCurrentTabView('Settings'), children: "Settings" }), _jsx(Tab, { _hover: { color: '#ffcf22' }, onClick: () => setCurrentTabView('Statistics'), children: "Statistics" }), _jsx(Tab, { _hover: { color: '#ffcf22' }, onClick: () => setCurrentTabView('X-Station'), children: "Station X" })] }), _jsx("div", { className: 'b-color-dark-2', style: { minWidth: '50%', alignSelf: 'center' }, children: _jsxs(Card, { padding: '8', margin: '6', background: '#1a0638', children: [_jsxs("h2", { className: 'font-1 s4 white', children: [activeProject.projectName, " :", _jsxs("span", { className: 'font-5 s2 m3 orange', children: [activeProject.stationTypeName, ` ${currentTabView}`] })] }), _jsxs(Button_S2, { className: 's1 m4', onClick: (e) => { navigator('/project'); }, children: ['<- ', "Back To ", `${activeProject.stationTypeName ? activeProject.stationTypeName : activeProject.stationType ? activeProject.stationType : 'Project'}`] })] }) }), _jsxs(TabPanels, { maxWidth: '50%', alignSelf: 'center', children: [_jsxs(TabPanel, { role: 'group', className: 'b-color-dark-2 p5 flex f-dir-col', style: { height: '100%', width: '100%', marginTop: '0px' }, children: [_jsxs(Card, { padding: '8', margin: '2', background: '#1a0638', children: [_jsxs("form", { onSubmit: (e) => { onFormSubmitted(e); }, children: [_jsxs(Heading, { as: 'h3', children: [activeProject.stationTypeName, " Global Settings"] }), _jsxs(Card, { margin: '10', padding: '2', background: '#110628', children: [_jsx("div", { className: 'flex f-dir-row j-between', children: _jsx("h3", { className: 'm1 s2 font-3 white', children: "Project Name" }) }), _jsx(Input, { className: "font-3", type: "text", placeholder: activeProject.projectName, id: "projectName", background: 'AppWorkspace', color: 'black', name: "projectName", value: projectName, onChange: (e) => { formUpdate(e, setFormData); } })] }), _jsxs(Card, { margin: '10', padding: '2', background: '#110628', children: [_jsx("h3", { className: 'm1 s2 font-3 white', children: "Station Type Name" }), _jsx(Input, { className: "font-3", type: "text", placeholder: "Project", id: "stationTypeName", background: 'AppWorkspace', color: 'black', name: "stationTypeName", value: stationTypeName, onChange: (e) => { formUpdate(e, setFormData); } })] }), _jsx(Heading, { as: 'h3', children: "Defaults" }), _jsxs(Card, { margin: '10', padding: '2', background: '#110628', children: [_jsx("div", { className: 'flex f-dir-row j-between', children: _jsx("h3", { className: 'm1 s2 font-3 white', children: "Long Term Goal" }) }), _jsx(Input, { className: "font-3", type: "text", placeholder: activeProject.defaults.ltgStation_TypeName, id: "ltgStation_TypeName", background: 'AppWorkspace', color: 'black', name: "ltgStation_TypeName", value: ltgStation_TypeName, onChange: (e) => { formUpdate(e, setFormData); } })] }), _jsxs(Card, { margin: '10', padding: '2', background: '#110628', children: [_jsx("h3", { className: 'm1 s2 font-3 white', children: "Objective" }), _jsx(Input, { className: "font-3", type: "text", placeholder: activeProject.defaults.objStation_TypeName, id: "objStation_TypeName", background: 'AppWorkspace', color: 'black', name: "objStation_TypeName", value: objStation_TypeName, onChange: (e) => { formUpdate(e, setFormData); } })] }), _jsxs(Card, { margin: '10', padding: '2', background: '#110628', children: [_jsx("h3", { className: 'm1 s2 font-3 white', children: "Task" }), _jsx(Input, { className: "font-3", type: "text", placeholder: activeProject.defaults.taskStation_TypeName, id: "objStation_TypeName", background: 'AppWorkspace', color: 'black', name: "taskStation_TypeName", value: taskStation_TypeName, onChange: (e) => { formUpdate(e, setFormData); } })] }), _jsx(Button, { type: 'submit', _hover: !savePrevented ? { background: '#acffff' } : { background: '#004444', cursor: 'auto' }, disabled: savePrevented, minWidth: '110px', margin: '10', bgColor: !savePrevented ? '#21ffff' : '#004444', children: "Save" })] }), _jsx("div", { className: 'p3 m3 border-top-w0 border-top-white border-top-solid' })] }), deletePrompt ?
                                    _jsxs("div", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid b-color-dark-0 white border-bottom-r2', children: ["This will delete the project and all of it's sub-stations! ", _jsx("br", {}), "Are you sure? ", _jsx("br", {}), _jsx(Button, { colorScheme: 'red', onClick: () => onDeleteProject(), minWidth: '110px', margin: '3', children: "Delete" }), _jsx(Button, { onClick: () => setDeletePrompt(false), minWidth: '110px', margin: '3', children: "Cancel" })] })
                                    : _jsx("div", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: _jsx(Button, { colorScheme: 'red', onClick: () => setDeletePrompt(true), minWidth: '110px', margin: '3', children: "DELETE" }) })] }), _jsx(TabPanel, { className: 'b-color-dark-2 p5 flex f-dir-col', style: { height: '100%', width: '100%' }, children: _jsx(Card, { padding: '8', background: '#1a0638' }) }), _jsx(TabPanel, { className: 'b-color-dark-2 p5 flex f-dir-col', style: { height: '100%', width: '100%' }, children: _jsx(Card, { padding: '8', background: '#1a0638' }) })] })] }) }));
}
export default Settings_Project;
