import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getObjective, updateObjective, deleteObjective } from 'src/app/state_management/objective/objectiveSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
import { Button, Card, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
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
    const [currentTabView, setCurrentTabView] = useState('Settings');
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
        // <- HERE -> will need to update ALL tasks of this objective
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
    return (_jsx("div", { style: { marginTop: '65px' }, children: _jsxs(Tabs, { colorScheme: 'yellow', textColor: '#23ffff', background: '#010111', display: 'flex', flexDirection: 'column', children: [_jsxs(TabList, { background: '#12012f', children: [_jsx(Tab, { _hover: { color: '#ffcf22' }, onClick: () => setCurrentTabView('Settings'), children: "Settings" }), _jsx(Tab, { _hover: { color: '#ffcf22' }, onClick: () => setCurrentTabView('Statistics'), children: "Statistics" }), _jsx(Tab, { _hover: { color: '#ffcf22' }, onClick: () => setCurrentTabView('X-Station'), children: "Station X" })] }), _jsx("div", { className: 'b-color-dark-2', style: { minWidth: '50%', alignSelf: 'center' }, children: _jsxs(Card, { padding: '8', margin: '6', background: '#1a0638', children: [_jsxs("h2", { className: 'font-1 s4 white', children: [activeObjective.objectiveName, " :", _jsx("span", { className: 'font-5 s2 m3 orange', children: `Objective ${currentTabView}` })] }), _jsxs(Button_S2, { className: 's1 m4', onClick: (e) => { navigator('/project/ltg/objective'); }, children: ['<- ', "Back To Objective"] })] }) }), _jsxs(TabPanels, { maxWidth: '50%', alignSelf: 'center', children: [_jsx(TabPanel, { role: 'group', className: 'b-color-dark-2 p5 flex f-dir-col', style: { height: '100%', width: '100%' }, children: _jsxs(Card, { padding: '8', margin: '2', background: '#1a0638', children: [_jsxs("form", { onSubmit: (e) => { onFormSubmitted(e); }, children: [_jsxs(Card, { margin: '10', padding: '2', background: '#110628', children: [_jsx("div", { className: 'flex f-dir-row j-between', children: _jsx("h3", { className: 'm1 s2 font-3 white', children: "Objective Name" }) }), _jsx(Input, { className: "font-3", type: "text", placeholder: activeObjective.objectiveName, id: "objectiveName", background: 'AppWorkspace', color: 'black', name: "objectiveName", value: objectiveName, onChange: (e) => { onFormUpdated(e); } })] }), _jsxs(Card, { margin: '10', padding: '2', background: '#110628', children: [_jsx("div", { className: 'flex f-dir-row j-between', children: _jsx("h3", { className: 'm1 s2 font-3 white', children: "Station Type Name" }) }), _jsx(Input, { className: "font-3", type: "text", placeholder: activeObjective.stationTypeName, id: "stationTypeName", background: 'AppWorkspace', color: 'black', name: "stationTypeName", value: stationTypeName, onChange: (e) => { onFormUpdated(e); } })] }), _jsx(Button, { type: 'submit', _hover: !savePrevented ? { background: '#acffff' } : { background: '#004444', cursor: 'auto' }, disabled: savePrevented, minWidth: '110px', margin: '10', bgColor: !savePrevented ? '#21ffff' : '#004444', children: "Save" })] }), deletePrompt ? _jsxs("div", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid b-color-dark-0 white border-bottom-r2', children: ["This will delete the Objective and all of it's sub-stations! ", _jsx("br", {}), "Are you sure? ", _jsx("br", {}), _jsx(Button, { colorScheme: 'red', onClick: () => onDeleteObjective(), minWidth: '110px', margin: '3', children: "Delete" }), _jsx(Button, { onClick: () => setDeletePrompt(false), minWidth: '110px', margin: '3', children: "Cancel" })] })
                                        : _jsx("div", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: _jsx(Button, { colorScheme: 'red', onClick: () => setDeletePrompt(true), minWidth: '110px', margin: '3', children: "DELETE" }) })] }) }), _jsx(TabPanel, { className: 'b-color-dark-2 p5 flex f-dir-col', style: { height: '100%', width: '100%' }, children: _jsx(Card, { padding: '8', background: '#1a0638' }) }), _jsx(TabPanel, { className: 'b-color-dark-2 p5 flex f-dir-col', style: { height: '100%', width: '100%' }, children: _jsx(Card, { padding: '8', background: '#1a0638' }) })] })] }) }));
}
export default Settings_Objective;
