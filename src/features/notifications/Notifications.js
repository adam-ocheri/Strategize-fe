import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getAllProjectsAndSubstations, updateTask_ProfileView } from 'src/app/state_management/project/projectSlice';
import { updateTask } from 'src/app/state_management/task/taskSlice';
import ButtonForm from 'src/components/elements/buttons/ButtonForm/ButtonForm';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
//! Notifications Manager ----------------------------------------------------------------------------------------------------------------------------------- 
export default function Notifications() {
    //! Init Data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    //* Metadata
    const dispatch = useAppDispatch();
    const { user, stationContext, isLoading: Loading_User } = useAppSelector((state) => state.auth);
    const { activeProject, allUserTasks, isLoading: Loading_Project } = useAppSelector((state) => state.project);
    const { activeLTG, isLoading: Loading_LTG } = useAppSelector((state) => state.ltg);
    const { activeObjective, isLoading: Loading_Objective } = useAppSelector((state) => state.objective);
    const { activeTask, isLoading: Loading_Task } = useAppSelector((state) => state.task);
    //* Action Tracking data
    const [taskInProgress, setTaskInProgress] = useState(null);
    const [endedTask, setEndedTask] = useState(null);
    const [taskEndResults, setTaskEndResults] = useState({
        goalAchieved: false,
        notes: ""
    });
    const { goalAchieved, notes } = taskEndResults;
    //! Methods - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    //* Check all tasks every minute
    const intervalUpdate = () => {
        const currentTime = new Date();
        console.log("TIME IS: ", currentTime.toString().slice(0, 21));
        console.log(" COME ON!!! ");
        console.log('allUserTasks, ', allUserTasks);
        console.log(allUserTasks);
        const [startingTask] = allUserTasks.filter((task) => task?.date?.toString()?.slice(0, 21) == currentTime.toString().slice(0, 21));
        const [endingTask] = allUserTasks.filter((task) => task?.endTime?.toString()?.slice(0, 21) == currentTime.toString().slice(0, 21));
        console.log("startingTask is:", startingTask);
        console.log("endingTask is:", endingTask);
        if (startingTask) {
            setTaskInProgress(startingTask);
            const notification = new Audio('/notify.wav');
            notification.play();
        }
        else if (endingTask) {
            setTaskInProgress(null);
            setEndedTask(endingTask);
            const notification = new Audio('/notify.wav');
            notification.play();
        }
        else {
            //setEndedTask(null);
        }
    };
    //* User input data gathering post task end
    const updateTaskEndResultData = (e) => {
        e.preventDefault();
        setTaskEndResults((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const postTaskEndResultData = async (e) => {
        e.preventDefault();
        console.log('Posting task results data...');
        console.log(taskEndResults);
        const body = { goalAchieved, notes };
        const updatedTask = await dispatch(updateTask({ body, id: endedTask._id, parentId: endedTask.owningObjective, token: user.token }));
        await dispatch(updateTask_ProfileView({ task: updatedTask }));
        setEndedTask(null);
        setTaskEndResults({ goalAchieved: false, notes: "" });
    };
    //! Side Effects - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    //* Initialize data
    useEffect(() => {
        if (user) {
            const initData = async () => {
                await dispatch(getAllProjectsAndSubstations({ owner: user._id, token: user.token }));
            };
            initData();
        }
    }, [user]);
    useEffect(() => {
        console.log('allUserTasks UPDATED!');
        console.log(allUserTasks);
        const timer = setInterval(intervalUpdate, 10000);
        return () => {
            clearInterval(timer);
        };
    }, [allUserTasks]);
    //! JSX - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    if (endedTask) {
        return (_jsxs("div", { style: { position: 'fixed', zIndex: 50, width: '50vw', height: '50vh', background: 'white', color: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }, children: [_jsx("button", { onClick: (e) => { postTaskEndResultData(e); }, style: { background: 'red', color: 'black', borderRadius: '3px', right: '100%' }, children: "X" }), _jsxs("h3", { children: ["Task Ended - ", endedTask.taskName] }), _jsxs("form", { onSubmit: (e) => { postTaskEndResultData(e); }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx("h4", { children: "Was the task completed as expected?" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'row' }, children: [_jsx(Button_S2, { type: "button", onClick: () => { setTaskEndResults((prev) => ({ ...prev, goalAchieved: true })); }, children: " Yes " }), _jsx(Button_S2, { type: "button", onClick: () => { setTaskEndResults((prev) => ({ ...prev, goalAchieved: false })); }, children: " No " })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx("h4", { children: "Notes:" }), _jsx("input", { type: 'text', name: 'notes', value: notes, placeholder: "Notes", id: "notes", onChange: (e) => { updateTaskEndResultData(e); } })] }), _jsx(ButtonForm, { text: 'CONTINUE' })] })] }));
    }
    return (_jsx("div", {}));
}
