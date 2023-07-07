import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshStation } from 'src/app/System/Main/Heritage/Utils/heritageUtils';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { createLTG, getLTG, getAllLTGs, deleteLTG } from 'src/app/state_management/LTG/LTGSlice';
import { getAllSubstations_Project } from 'src/app/state_management/project/projectSlice';
import { updateTask, getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import StationAccordion from 'src/components/elements/accordions/main/StationAccordion';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
function Project({}) {
    const [formData, setFormData] = useState({
        newLTGName: '',
    });
    const { newLTGName } = formData;
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!newLTGName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(createLTG({ LTGName: newLTGName, parentId: activeProject._id, owner: user._id, token: user.token }));
        }
    };
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT LTG...........");
        console.log(id);
        await dispatch(getLTG({ id: id, parentId: activeProject._id, token: user.token }));
        navigator('/project/ltg');
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
    // Data
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject, subData, allUserTasks } = useAppSelector((state) => state.project);
    const { user, stationContext } = useAppSelector((state) => state.auth);
    const { data, activeLTG } = useAppSelector((state) => state.ltg);
    const { activeTask, isLoading } = useAppSelector((state) => state.task);
    // Init
    useEffect(() => {
        if (!activeProject.projectName) {
            navigator("/");
        }
        else {
            const initData = async () => {
                await dispatch(setCurrentStationContext({ newContext: 'project' }));
                await dispatch(getAllLTGs({ parentId: activeProject._id, token: user.token }));
            };
            initData();
        }
    }, []);
    // Post Init
    useEffect(() => {
        if (activeProject._id) {
            const getSubData = async () => {
                console.log('TRYING TO SEE USER ID.....');
                console.log(user._id);
                const response = await dispatch(getAllSubstations_Project({ id: activeProject._id, owner: user._id, token: user.token }));
                setTaskData(response.payload);
            };
            getSubData();
        }
    }, [activeProject]);
    const [taskData, setTaskData] = useState([]);
    useEffect(() => {
        refreshStation('project', activeProject, allUserTasks, setTaskData);
    }, [allUserTasks]);
    return (_jsxs("div", { className: 'pt7 mt7 p3 m3 b-color-dark-2 white', style: { borderLeft: '2px solid white', borderRight: '2px solid white', borderBottom: '2px solid white' }, children: [_jsxs("section", { children: [_jsxs("h2", { className: 'font-1 s4', children: [activeProject.projectName, " :", _jsxs("span", { className: 'font-5 s2 m3 orange', children: [activeProject.stationTypeName, " "] })] }), _jsx("div", { children: _jsx(Button_S2, { onClick: (e) => { navigator('/project/settings'); }, children: " Settings " }) })] }), _jsxs("section", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: [_jsxs("h3", { className: 's3 font-4', children: [" ", activeProject.defaults.ltgStation_TypeName, 's', " "] }), _jsx(StationAccordion, { title: `${activeProject.projectName}`, children: data && _jsx("div", { className: 'p3 m3 font-5', children: data.map((LTG) => (_jsxs("div", { className: 'p3 m3 font-5 b-color-dark-1 border-w1 border-r2 border-solid border-color-white', children: [activeProject.defaults.ltgStation_TypeName, _jsxs("span", { className: 'font-2 s2', children: [': ', " ", LTG.LTGName] }), _jsxs("p", { children: [_jsx(Button_S2, { onClick: (e) => { manageSelectedStation(e, LTG._id); }, children: " Manage " }), _jsx(Button_S2, { onClick: () => { dispatch(deleteLTG({ id: LTG._id, parentId: activeProject._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, LTG._id))) }) })] }), _jsx("section", { className: 'p3 m3', children: _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", placeholder: `${activeProject.defaults.ltgStation_TypeName} Name`, id: "newLTGName", name: "newLTGName", value: newLTGName, onChange: (e) => { onFormUpdated(e); } }), _jsx(Button_S2, { type: 'submit', children: "Add New" })] }) }), _jsx("section", { children: _jsx(CalendarDND, { data: taskData, getAllSubstations: () => { dispatch(getAllSubstations_Project({ id: activeProject._id, owner: user._id, token: user.token })); }, updateSubStation: updateTask, dispatch: dispatch, user: user, manage: manageSelectedTask_Remote, activeTask: activeTask, currentContext: 'project' }) })] }));
}
;
export default Project;
