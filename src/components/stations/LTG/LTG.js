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
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import { refreshStation } from 'src/app/System/Main/Heritage/Utils/heritageUtils';
import { ArrowRightIcon } from '@chakra-ui/icons';
import StationAccordion from 'src/components/elements/accordions/main/StationAccordion';
import { determineSubstationTypeNameOrigin } from '../stationGlobals/stationUtils';
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
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject, allUserTasks } = useAppSelector((state) => state.project);
    const { activeLTG, subData, isLoading } = useAppSelector((state) => state.ltg);
    const { data, activeObjective } = useAppSelector((state) => state.objective);
    const { activeTask } = useAppSelector((state) => state.task);
    const { user, stationContext } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeLTG.LTGName) {
            navigator("/");
        }
        else {
            const initData = async () => {
                await dispatch(setCurrentStationContext({ newContext: 'ltg' }));
                await dispatch(getAllObjectives({ parentId: activeLTG._id, token: user.token }));
            };
            initData();
        }
    }, []);
    useEffect(() => {
        const getStuff = async () => {
            if (data) {
                const response = await dispatch(getAllSubStations_LTG({ id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token }));
                setTaskData(response.payload);
            }
        };
        getStuff();
    }, [data]);
    const [taskData, setTaskData] = useState([]);
    useEffect(() => {
        refreshStation('ltg', activeLTG, allUserTasks, setTaskData);
    }, [allUserTasks]);
    return (_jsxs("div", { className: 'pt3 mt3 m3 b-color-dark-2 white border-left-w1 border-left-white border-left-solid border-right-w1 border-right-white border-right-solid border-bottom-w1 border-bottom-white border-bottom-solid', children: [_jsx("h3", { className: 'font-1 white station-nav-link-container b-color-dark-1', children: _jsxs("div", { className: 'p4 m4', children: [_jsx(Link, { to: '/project', className: 'station-nav-link', children: activeProject.projectName }), " ", _jsx(ArrowRightIcon, {}), _jsx(Link, { to: '/project/ltg', className: 'station-nav-link-active', children: activeLTG.LTGName })] }) }), _jsx("div", { className: 'pb1 mb5 border-top-w1 border-top-white border-top-solid' }), _jsxs("section", { className: 'p1 m1', children: [_jsxs("h2", { className: 'font-1 s4', children: [activeLTG.LTGName, " :", _jsxs("span", { className: 'font-5 s2 m3 orange', children: [" ", `${activeLTG.stationTypeName ? activeLTG.stationTypeName : activeLTG.stationType ? activeLTG.stationType : 'Long Term Goal'}`, " "] })] }), _jsx("div", { children: _jsx(Button_S2, { onClick: (e) => { navigator('/project/ltg/settings'); }, children: "Settings" }) })] }), _jsxs("section", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: [_jsxs("h3", { className: 's3 font-4', children: [determineSubstationTypeNameOrigin({ scope: 'Objective', activeProject, activeLTG }), 's'] }), _jsx(StationAccordion, { title: `${activeLTG.LTGName}`, children: data && _jsx("div", { className: 'p3 m3 font-5', children: data.map((Objective) => (_jsxs("div", { className: 'p3 m3 font-5 b-color-dark-1 border-w1 border-r2 border-solid border-color-white', children: [determineSubstationTypeNameOrigin({ scope: 'Objective', activeProject, activeLTG }), _jsx("span", { children: ': ' }), _jsx("span", { className: 'font-2 s2', children: Objective.objectiveName }), _jsxs("p", { children: [_jsx(Button_S2, { onClick: (e) => { manageSelectedStation(e, Objective._id); }, children: " Manage " }), _jsx(Button_S2, { onClick: () => { dispatch(deleteObjective({ id: Objective._id, parentId: activeLTG._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, Objective._id))) }) })] }), _jsx("section", { className: 'p3 m3', children: _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", id: "newObjectiveName", placeholder: `${determineSubstationTypeNameOrigin({ scope: 'Objective', activeProject, activeLTG })} Name`, name: "newObjectiveName", value: newObjectiveName, onChange: (e) => { onFormUpdated(e); } }), _jsx(Button_S2, { type: 'submit', children: "Add New" })] }) }), _jsx("section", { children: _jsx(CalendarDND, { data: taskData, getAllSubstations: () => { dispatch(getAllSubStations_LTG({ id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token })); }, updateSubStation: updateTask, dispatch: dispatch, user: user, manage: manageSelectedTask_Remote, activeTask: activeTask, currentContext: stationContext }) })] }));
}
;
export default LTG;
