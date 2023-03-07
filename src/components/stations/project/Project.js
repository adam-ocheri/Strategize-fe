import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { createLTG, getLTG, getAllLTGs, deleteLTG } from 'src/app/state_management/LTG/LTGSlice';
import { getAllSubstations_Project } from 'src/app/state_management/project/projectSlice';
import { updateTask, getTask } from 'src/app/state_management/task/taskSlice';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
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
    const manageSelectedTask_Remote = async (e, id, parentObjectiveId) => {
        console.log("trying to EDIT Objective...........");
        console.log(id);
        await dispatch(getTask({ id: id, parentId: parentObjectiveId, token: user.token }));
        navigator('/project/ltg/objective/task');
    };
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject, subData } = useAppSelector((state) => state.project);
    const { user } = useAppSelector((state) => state.auth);
    const { data, activeLTG } = useAppSelector((state) => state.ltg);
    const { activeTask, isLoading } = useAppSelector((state) => state.task);
    useEffect(() => {
        if (!activeProject.projectName) {
            navigator("/");
        }
        else {
            const getData = async () => {
                await dispatch(getAllLTGs({ parentId: activeProject._id, token: user.token }));
            };
            getData();
        }
    }, []);
    useEffect(() => {
        if (activeProject._id) {
            const getSubData = async () => {
                console.log('TRYING TO SEE USER ID.....');
                console.log(user._id);
                await dispatch(getAllSubstations_Project({ id: activeProject._id, owner: user._id, token: user.token }));
            };
            getSubData();
        }
    }, [activeProject]);
    return (_jsxs("div", { className: 'pt5 mt5', children: [_jsxs("section", { children: [_jsxs("h2", { children: [activeProject.projectName, " :", `${activeProject.stationTypeName ? activeProject.stationTypeName : activeProject.stationType ? activeProject.stationType : 'Project'}`] }), _jsx("div", { children: _jsx("button", { onClick: (e) => { navigator('/project/settings'); }, children: "Settings" }) })] }), _jsxs("section", { children: [_jsx("h3", { children: " Long Term Goals " }), data && _jsx("div", { children: data.map((LTG) => (_jsxs("div", { children: ["Long Term Goal: ", LTG.LTGName, _jsxs("p", { children: [_jsx("button", { onClick: (e) => { manageSelectedStation(e, LTG._id); }, children: " Manage " }), _jsx("button", { onClick: () => { dispatch(deleteLTG({ id: LTG._id, parentId: activeProject._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, LTG._id))) })] }), _jsx("section", { children: _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", placeholder: "LTG Name", id: "newLTGName", name: "newLTGName", value: newLTGName, onChange: (e) => { onFormUpdated(e); } }), _jsx("button", { type: 'submit', children: "Add New" })] }) }), _jsx("section", { children: _jsx(CalendarDND, { data: subData, getAllSubstations: () => { dispatch(getAllSubstations_Project({ id: activeProject._id, owner: user._id, token: user.token })); }, updateSubStation: updateTask, dispatch: dispatch, user: user, manage: manageSelectedTask_Remote }) })] }));
}
;
export default Project;
