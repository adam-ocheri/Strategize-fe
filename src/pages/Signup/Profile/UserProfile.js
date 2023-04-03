import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getLTG } from 'src/app/state_management/LTG/LTGSlice';
import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllProjectsAndSubstations, getProject } from 'src/app/state_management/project/projectSlice';
import { getTask, setActiveTask, updateTask } from 'src/app/state_management/task/taskSlice';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
export default function UserProfile() {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user, stationContext, isLoading: Loading_User } = useAppSelector((state) => state.auth);
    const { activeProject, allUserTasks, isLoading: Loading_Project } = useAppSelector((state) => state.project);
    const { activeLTG, isLoading: Loading_LTG } = useAppSelector((state) => state.ltg);
    const { activeObjective, isLoading: Loading_Objective } = useAppSelector((state) => state.objective);
    const { activeTask, isLoading: Loading_Task } = useAppSelector((state) => state.task);
    useEffect(() => {
        if (!user) {
            navigator('/');
        }
        const initData = async () => {
            await dispatch(setCurrentStationContext({ newContext: 'profile' }));
            await dispatch(getAllProjectsAndSubstations({ owner: user._id, token: user.token }));
        };
        initData();
    }, []);
    useEffect(() => {
        console.log(allUserTasks);
    }, [allUserTasks]);
    useEffect(() => {
        console.log('stationContext Changed:');
        console.log(stationContext);
    }, [stationContext]);
    const manageSelectedTask_Remote = async (e, id, parentObjectiveId, item, { subTask }) => {
        console.log("trying to EDIT Task...........");
        console.log('manageSelectedTask_Remote!!!!!!.....');
        console.log(subTask);
        await dispatch(getObjective({ id: item.heritage.objective.id, parentId: item.heritage.ltg.id, token: user.token }));
        await dispatch(getLTG({ id: item.heritage.ltg.id, parentId: item.heritage.project.id, token: user.token }));
        await dispatch(getProject({ id: item.heritage.project.id, token: user.token }));
        if (subTask !== null) {
            await dispatch(setActiveTask({ item: subTask }));
        }
        else {
            await dispatch(getTask({ id: id, parentId: parentObjectiveId, token: user.token }));
        }
        navigator('/project/ltg/objective/task');
    };
    if (Loading_User || Loading_Project || Loading_LTG || Loading_Objective) {
        return (_jsx("div", { className: 'p7 m7', children: _jsx("p", { className: ' p7 m7', children: "Loading Data..." }) }));
    }
    return (_jsx("div", { children: _jsx(CalendarDND, { data: allUserTasks, getAllSubstations: async () => { await dispatch(getAllProjectsAndSubstations({ owner: user._id, token: user.token })); }, updateSubStation: updateTask, dispatch: dispatch, user: user, manage: manageSelectedTask_Remote, activeTask: activeTask }) }));
}
