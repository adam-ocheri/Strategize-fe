import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getAllProjectsAndSubstations } from 'src/app/state_management/project/projectSlice';
//! Notifications Manager ----------------------------------------------------------------------------------------------------------------------------------- 
export default function Notifications() {
    //! Init Data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const dispatch = useAppDispatch();
    const { user, stationContext, isLoading: Loading_User } = useAppSelector((state) => state.auth);
    const { activeProject, allUserTasks, isLoading: Loading_Project } = useAppSelector((state) => state.project);
    const { activeLTG, isLoading: Loading_LTG } = useAppSelector((state) => state.ltg);
    const { activeObjective, isLoading: Loading_Objective } = useAppSelector((state) => state.objective);
    const { activeTask, isLoading: Loading_Task } = useAppSelector((state) => state.task);
    //! Methods - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    //* Check all tasks every minute
    const intervalUpdate = () => {
        const currentTime = new Date();
        console.log("TIME IS: ", currentTime.toString().slice(0, 21));
        console.log(" COME ON!!! ");
        console.log('allUserTasks, ', allUserTasks);
        console.log(allUserTasks);
        const [nr] = allUserTasks.filter((task) => task.date.toString().slice(0, 21) == currentTime.toString().slice(0, 21));
        console.log("NR is:", nr);
        if (nr) {
            const notification = new Audio('/notify.wav');
            notification.play();
        }
    };
    //! Side Effects - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    //* Initialize data
    useEffect(() => {
        const initData = async () => {
            await dispatch(getAllProjectsAndSubstations({ owner: user._id, token: user.token }));
        };
        initData();
    }, []);
    useEffect(() => {
        console.log('allUserTasks UPDATED!');
        console.log(allUserTasks);
        const timer = setInterval(intervalUpdate, 10000);
        return () => {
            clearInterval(timer);
        };
    }, [allUserTasks]);
    //! JSX - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    return (_jsx("div", {}));
}
