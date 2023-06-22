import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { getTask, updateTask, deleteTask, setActiveTask, getAllTasks } from 'src/app/state_management/task/taskSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
import { Button, Card, Input } from '@chakra-ui/react';
function Settings_Task({ originTask, currentTaskIteration }) {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!activeTask.taskName) {
            navigator('/project/ltg/objective');
        }
    }, [activeTask]);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        taskName: '',
        stationTypeName: '',
        description: ''
    });
    const { taskName, stationTypeName, description } = formData;
    useEffect(() => {
        setSavePrevented(canSaveSettings());
        setDeletePrompt(false);
    }, [taskName, stationTypeName, description]);
    useEffect(() => {
        setDeletePrompt(false);
    }, [activeTask]);
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
        if (activeTask.isSubtask) {
            let sIndex = 0;
            let newArray = [...originTask.HISTORY_TaskIterations];
            newArray.filter((item, index) => {
                if (activeTask._id === item._id) {
                    sIndex = index;
                }
                return activeTask._id === item._id;
            });
            newArray.splice(sIndex, 1);
            let newSubtask = { ...activeTask };
            for (let field in body) {
                console.log('Checking which fields modified for SubTask...');
                console.log(field);
                newSubtask[field] = body[field];
                console.log(newSubtask[field]);
                console.log(activeTask[field]);
            }
            console.log('newSubtask is:');
            console.log(newSubtask);
            newArray.splice(sIndex, 0, newSubtask);
            const newSubtaskBody = { HISTORY_TaskIterations: newArray };
            body = newSubtaskBody;
            await dispatch(updateTask({ body, id: activeTask.origin, parentId: activeTask.owningObjective, token: user.token }));
            await dispatch(setActiveTask({ item: newSubtask }));
            navigator('/project/ltg/objective/task');
        }
        else {
            await dispatch(updateTask({ body, id: activeTask._id, parentId: activeTask.owningObjective, token: user.token }));
            await dispatch(getTask({ id: activeTask._id, parentId: activeTask.owningObjective, token: user.token }));
            navigator('/project/ltg/objective/task');
        }
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
    const onDeleteTask = async () => {
        if (activeTask.isSubtask) {
            let newArray = [...originTask.HISTORY_TaskIterations.filter((item) => {
                    return item._id !== activeTask._id;
                })];
            let newSubtasksArray = [];
            for (let subtask of newArray) {
                let newSubtask = { ...subtask };
                newSubtasksArray.push(newSubtask);
            }
            for (let index = 0; index < newSubtasksArray.length; ++index) {
                newSubtasksArray[index].iteration = index + 1;
            }
            console.log('logging new HISTORY_TaskIterations post Subtask DELETE...');
            console.log(newSubtasksArray);
            await dispatch(updateTask({
                body: { HISTORY_TaskIterations: newSubtasksArray },
                id: activeTask.origin,
                parentId: activeTask.owningObjective,
                token: user.token
            }));
            // const nextTaskToView = (
            //     newSubtasksArray.length > 0 ? 
            //     (newSubtasksArray.length - 1 !== activeTask.iteration ? 
            //         activeTask.iteration : activeTask.iteration - 1 
            //     ) 
            //     : -1
            // );
            let nextTaskToView = 0;
            if (newSubtasksArray.length > 0) {
                if (activeTask.iteration > newSubtasksArray.length || newSubtasksArray.length === 1) {
                    nextTaskToView = newSubtasksArray.length;
                }
                else {
                    nextTaskToView = activeTask.iteration;
                }
            }
            else {
                nextTaskToView = -1;
            }
            console.log('next iteration is...');
            console.log(nextTaskToView);
            await dispatch(getTask({ id: originTask._id, parentId: originTask.owningObjective, token: user.token }))
                .then(async (response) => {
                await dispatch(getAllTasks({ parentId: originTask.owningObjective, token: user.token }));
                const next = nextTaskToView - 1;
                const nextItem = nextTaskToView < 0 ? response.payload : response.payload.HISTORY_TaskIterations[next];
                await dispatch(setActiveTask({ item: nextItem }));
            });
            // await dispatch(setActiveTask(nextTaskToView < 0 ? {item:originTask} :{item: newSubtasksArray[nextTaskToView-1]}))
            navigator('/project/ltg/objective/task');
        }
        else {
            await dispatch(deleteTask({ id: activeTask._id, parentId: activeTask.owningObjective, owner: user._id, token: user.token }));
            navigator('/project/ltg/objective');
        }
        setDeletePrompt(false);
    };
    return (_jsxs("div", { children: [_jsxs("form", { onSubmit: (e) => { onFormSubmitted(e); }, className: 'b-color-dark-3 p5', children: [_jsxs("h2", { className: 'orange font-3 s3', children: [`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType}`, " Settings"] }), !activeTask.isSubtask && _jsxs(Card, { marginTop: '2', marginBottom: '2', marginLeft: '6', padding: '2', background: '#110628', children: [_jsx("div", { className: 'flex f-dir-row j-between p1', children: _jsx("h3", { className: 'mt1 mb1 font-3 white', children: "Name" }) }), _jsx(Input, { className: "sform-input font-3", type: "text", placeholder: activeTask.taskName, id: "taskName", background: 'AppWorkspace', color: 'black', name: "taskName", value: taskName, onChange: (e) => { onFormUpdated(e); } })] }), !activeTask.isSubtask && _jsxs(Card, { marginTop: '2', marginBottom: '2', marginLeft: '6', padding: '2', background: '#110628', children: [_jsx("div", { className: 'flex f-dir-row j-between p1', children: _jsx("h3", { className: 'mt1 mb1 font-3 white', children: "Station Type Name" }) }), _jsx(Input, { className: "sform-input font-3", type: "text", placeholder: activeTask.stationTypeName, id: "stationTypeName", background: 'AppWorkspace', color: 'black', name: "stationTypeName", value: stationTypeName, onChange: (e) => { onFormUpdated(e); } })] }), _jsxs(Card, { marginTop: '2', marginBottom: '2', marginLeft: '6', padding: '2', background: '#110628', children: [_jsx("div", { className: 'flex f-dir-row j-between p1', children: _jsx("h3", { className: 'mt1 mb1 font-3 white', children: "Description" }) }), _jsx(Input, { className: "sform-input font-3", type: "text", placeholder: activeTask.description, id: "Description", background: 'AppWorkspace', color: 'black', name: "description", value: description, onChange: (e) => { onFormUpdated(e); } })] }), _jsx(Button, { type: 'submit', _hover: !savePrevented ? { background: '#acffff' } : { background: '#004444', cursor: 'auto' }, disabled: savePrevented, minWidth: '110px', margin: '10', bgColor: !savePrevented ? '#21ffff' : '#004444', children: "Save" })] }), deletePrompt ?
                _jsxs("div", { className: 'pb3 mb3 border-top-w0 border-top-white border-top-solid b-color-dark-0 white border-bottom-r2', children: ["This will delete the project and all of it's sub-stations! ", _jsx("br", {}), "Are you sure? ", _jsx("br", {}), _jsx(Button, { colorScheme: 'red', onClick: () => onDeleteTask(), minWidth: '110px', margin: '3', children: "Delete" }), _jsx(Button, { onClick: () => setDeletePrompt(false), minWidth: '110px', margin: '3', children: "Cancel" })] })
                : _jsx("div", { className: 'pb3 mb3 border-top-w0 border-top-white border-top-solid', children: _jsx(Button, { colorScheme: 'red', onClick: () => setDeletePrompt(true), minWidth: '110px', margin: '12', children: "DELETE" }) })] }));
}
export default Settings_Task;
