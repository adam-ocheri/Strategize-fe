import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
//Child sub-station
import { getAllSubStations_LTG } from 'src/app/state_management/LTG/LTGSlice';
import { createObjective, getObjective, deleteObjective, getAllObjectives, } from 'src/app/state_management/objective/objectiveSlice';
import { updateTask, getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';
function LTG({}) {
    const [formData, setFormData] = useState({
        newObjectiveName: '',
    });
    const { newObjectiveName } = formData;
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!newObjectiveName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(createObjective({ objectiveName: newObjectiveName, parentId: activeLTG._id, owner: user._id, token: user.token }));
        }
    };
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT Objective...........");
        console.log(id);
        await dispatch(getObjective({ id: id, parentId: activeLTG._id, token: user.token }));
        navigator('/project/ltg/objective');
    };
    const manageSelectedTask_Remote = async (e, id, parentObjectiveId, { subTask }) => {
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
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { activeLTG, subData, isLoading } = useAppSelector((state) => state.ltg);
    const { data, activeObjective } = useAppSelector((state) => state.objective);
    const { activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeLTG.LTGName) {
            navigator("/");
        }
        else {
            dispatch(getAllObjectives({ parentId: activeLTG._id, token: user.token }));
        }
    }, []);
    useEffect(() => {
        const getStuff = async () => {
            if (data) {
                await dispatch(getAllSubStations_LTG({ id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token }));
            }
        };
        getStuff();
    }, [data]);
    return (_jsxs("div", { className: 'pt7 mt7 p3 m3 b-color-dark-2 white', children: [_jsxs("h3", { className: 'font-1 white', children: [" ", _jsx(Link, { to: '/project', children: activeProject.projectName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg', children: activeLTG.LTGName })] }), _jsxs("section", { children: [_jsxs("h2", { className: 'font-1 s4', children: [activeLTG.LTGName, " :", _jsxs("span", { className: 'font-5 s2 m3 orange', children: [" ", `${activeLTG.stationTypeName ? activeLTG.stationTypeName : activeLTG.stationType ? activeLTG.stationType : 'Long Term Goal'}`, " "] })] }), _jsx("div", { children: _jsx(Button_S2, { onClick: (e) => { navigator('/project/ltg/settings'); }, children: "Settings" }) })] }), _jsxs("section", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: [_jsx("h3", { className: 's3 font-4', children: " Objectives " }), data && _jsx("div", { className: 'p3 m3 font-5 border-bottom-w0 border-bottom-white border-bottom-solid', children: data.map((Objective) => (_jsxs("div", { className: 'p3 m3 font-5 b-color-dark-1 border-w1 border-r2 border-solid border-color-white', children: ["Objective: ", _jsx("span", { className: 'font-2 s2', children: Objective.objectiveName }), _jsxs("p", { children: [_jsx(Button_S2, { onClick: (e) => { manageSelectedStation(e, Objective._id); }, children: " Manage " }), _jsx(Button_S2, { onClick: () => { dispatch(deleteObjective({ id: Objective._id, parentId: activeLTG._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, Objective._id))) })] }), _jsx("section", { className: 'p3 m3', children: _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", placeholder: "Objective Name", id: "newObjectiveName", name: "newObjectiveName", value: newObjectiveName, onChange: (e) => { onFormUpdated(e); } }), _jsx(Button_S2, { type: 'submit', children: "Add New" })] }) }), _jsx("section", { children: _jsx(CalendarDND, { data: subData, getAllSubstations: () => { dispatch(getAllSubStations_LTG({ id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token })); }, updateSubStation: updateTask, dispatch: dispatch, user: user, manage: manageSelectedTask_Remote, activeTask: activeTask }) })] }));
}
;
export default LTG;
