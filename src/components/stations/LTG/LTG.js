import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { createObjective, getObjective, deleteObjective, getAllObjectives, } from 'src/app/state_management/objective/objectiveSlice';
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
    //
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
    // useEffect(() => {
    //     if (data.length > 0){
    //         dispatch(getAllSubStations_LTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}))
    //     }
    // }, [data])
    return (_jsxs("div", { className: 'pt5 mt5', children: [_jsxs("h3", { className: 'font-1 white', children: [" ", _jsx(Link, { to: '/project', children: activeProject.projectName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg', children: activeLTG.LTGName })] }), _jsxs("section", { children: [_jsxs("h2", { children: [activeLTG.LTGName, " :", `${activeLTG.stationTypeName ? activeLTG.stationTypeName : activeLTG.stationType ? activeLTG.stationType : 'Long Term Goal'}`] }), _jsx("div", { children: _jsx("button", { onClick: (e) => { navigator('/project/ltg/settings'); }, children: "Settings" }) })] }), _jsxs("section", { children: [_jsx("h3", { children: " Objectives " }), data && _jsx("div", { children: data.map((Objective) => (_jsxs("div", { children: ["Objective: ", Objective.objectiveName, _jsxs("p", { children: [_jsx("button", { onClick: (e) => { manageSelectedStation(e, Objective._id); }, children: " Manage " }), _jsx("button", { onClick: () => { dispatch(deleteObjective({ id: Objective._id, parentId: activeLTG._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, Objective._id))) })] }), _jsx("section", { children: _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", placeholder: "Objective Name", id: "newObjectiveName", name: "newObjectiveName", value: newObjectiveName, onChange: (e) => { onFormUpdated(e); } }), _jsx("button", { type: 'submit', children: "Add New" })] }) }), _jsx("section", {})] }));
}
;
export default LTG;
