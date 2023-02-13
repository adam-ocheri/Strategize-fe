import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
//Child sub-station
import { createObjective, getObjective, deleteObjective, getAllObjectives } from 'src/app/state_management/objective/objectiveSlice';
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
    const { activeLTG } = useAppSelector((state) => state.ltg);
    const { data, activeObjective } = useAppSelector((state) => state.objective);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeLTG.LTGName) {
            navigator("/");
        }
        else {
            dispatch(getAllObjectives({ parentId: activeLTG._id, token: user.token }));
        }
    }, []);
    return (_jsxs("div", { children: [_jsxs("section", { children: [_jsxs("h2", { children: [" ", activeLTG.LTGName, " "] }), _jsx("div", { children: _jsx("button", { onClick: (e) => { navigator('/project/ltg/settings'); }, children: "Settings" }) })] }), _jsxs("section", { children: [_jsx("h3", { children: " Objectives " }), data && _jsx("div", { children: data.map((Objective) => (_jsxs("div", { children: ["Objective: ", Objective.objectiveName, _jsxs("p", { children: [_jsx("button", { onClick: (e) => { manageSelectedStation(e, Objective._id); }, children: " Manage " }), _jsx("button", { onClick: () => { dispatch(deleteObjective({ id: Objective._id, parentId: activeLTG._id, owner: user._id, token: user.token })); }, children: "Delete" })] })] }, Objective._id))) })] }), _jsx("section", { children: _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), children: [_jsx("input", { className: "form-input", type: "text", placeholder: "Objective Name", id: "newObjectiveName", name: "newObjectiveName", value: newObjectiveName, onChange: (e) => { onFormUpdated(e); } }), _jsx("button", { type: 'submit', children: "Add New" })] }) })] }));
}
;
export default LTG;
