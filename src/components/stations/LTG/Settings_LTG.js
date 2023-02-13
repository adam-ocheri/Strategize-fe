import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getLTG, updateLTG, deleteLTG } from 'src/app/state_management/LTG/LTGSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
function Settings_LTG() {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeLTG } = useAppSelector((state) => state.ltg);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeLTG.LTGName) {
            navigator('/project');
        }
    }, [activeLTG]);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        LTGName: '',
        stationTypeName: ''
    });
    const { LTGName, stationTypeName } = formData;
    useEffect(() => {
        setSavePrevented(canSaveSettings());
    }, [LTGName, stationTypeName]);
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
        await dispatch(updateLTG({ body, id: activeLTG._id, parentId: activeLTG.owningProject, token: user.token }));
        await dispatch(getLTG({ id: activeLTG._id, parentId: activeLTG.owningProject, token: user.token }));
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
    const onDeleteLTG = async () => {
        await dispatch(deleteLTG({ id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token }));
        navigator('/');
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "LTG Settings" }), _jsxs("form", { onSubmit: (e) => { onFormSubmitted(e); }, children: [_jsxs("div", { children: ["Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeLTG.LTGName, id: "LTGName", name: "LTGName", value: LTGName, onChange: (e) => { onFormUpdated(e); } })] }), _jsxs("div", { children: ["Station Type Name: ", _jsx("br", {}), _jsx("input", { className: "form-input", type: "text", placeholder: activeLTG.stationTypeName, id: "stationTypeName", name: "stationTypeName", value: stationTypeName, onChange: (e) => { onFormUpdated(e); } })] }), _jsx("button", { type: 'submit', disabled: savePrevented, children: "Save" })] }), deletePrompt ? _jsxs("div", { children: ["This will delete the LTG and all of it's sub-stations! ", _jsx("br", {}), "Are you sure? ", _jsx("br", {}), _jsx("button", { onClick: () => onDeleteLTG(), children: "Delete" }), _jsx("button", { onClick: () => setDeletePrompt(false), children: "Cancel" })] })
                : _jsx("div", { children: _jsx("button", { onClick: () => setDeletePrompt(true), children: "DELETE" }) })] }));
}
export default Settings_LTG;
