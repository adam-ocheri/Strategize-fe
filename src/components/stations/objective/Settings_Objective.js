import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getObjective, updateObjective, deleteObjective } from 'src/app/state_management/objective/objectiveSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
function Settings_Objective() {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeObjective.objectiveName) {
            navigator('/project/ltg');
        }
    }, [activeObjective]);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        objectiveName: '',
        stationTypeName: ''
    });
    const { objectiveName, stationTypeName } = formData;
    useEffect(() => {
        setSavePrevented(canSaveSettings());
    }, [objectiveName, stationTypeName]);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = async (e) => {
        e.preventDefault();
        let body = {};
        for (let field in formData) {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0) {
                Object.defineProperty(body, field, { value: val, writable: true, enumerable: true, configurable: true });
            }
        }
        await dispatch(updateObjective({ body, id: activeObjective._id, parentId: activeObjective.owningLTG, token: user.token }));
        await dispatch(getObjective({ id: activeObjective._id, parentId: activeObjective.owningLTG, token: user.token }));
        navigator('/project/ltg/objective');
    };
    const canSaveSettings = () => {
        let numModifiedProperties = 0;
        for (let field in formData) {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0) {
                ++numModifiedProperties;
            }
        }
        return numModifiedProperties === 0;
    };
    const onDeleteObjective = async () => {
        await dispatch(deleteObjective({ id: activeObjective._id, owningLTG: activeObjective.owningLTG, owner: user._id, token: user.token }));
        navigator('/');
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Objective Settings" }), _jsxs("form", { onSubmit: (e) => { onFormSubmitted(e); }, children: [_jsxs("div", { children: ["Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeObjective.objectiveName, id: "objectiveName", name: "objectiveName", value: objectiveName, onChange: (e) => { onFormUpdated(e); } })] }), _jsxs("div", { children: ["Station Type Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeObjective.stationTypeName, id: "stationTypeName", name: "stationTypeName", value: stationTypeName, onChange: (e) => { onFormUpdated(e); } })] }), _jsx("button", { type: 'submit', disabled: savePrevented, children: "Save" })] }), deletePrompt ? _jsxs("div", { children: ["This will delete the Objective and all of it's sub-stations! ", _jsx("br", {}), "Are you sure? ", _jsx("br", {}), _jsx("button", { onClick: () => onDeleteObjective(), children: "Delete" }), _jsx("button", { onClick: () => setDeletePrompt(false), children: "Cancel" })] })
                : _jsx("div", { children: _jsx("button", { onClick: () => setDeletePrompt(true), children: "DELETE" }) })] }));
}
export default Settings_Objective;
