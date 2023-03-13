import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getObjective } from 'src/app/state_management/objective/objectiveSlice';
import { getAllLTGs, getLTG } from 'src/app/state_management/LTG/LTGSlice';
//Child sub-station
import { createTask, getTask } from 'src/app/state_management/task/taskSlice';
import Settings_Task from './Settings_Task';
function Task({}) {
    const [formData, setFormData] = useState({
        newTaskName: '',
    });
    const { newTaskName } = formData;
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!newTaskName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(createTask({ taskName: newTaskName, parentId: activeTask._id, owner: user._id, token: user.token }));
        }
    };
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT Task...........");
        console.log(id);
        await dispatch(getTask({ id: id, parentId: activeTask._id, token: user.token }));
        navigator('/project/ltg/objective/task');
    };
    //
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { activeLTG, data } = useAppSelector((state) => state.ltg);
    const { activeObjective } = useAppSelector((state) => state.objective);
    const { activeTask } = useAppSelector((state) => state.task);
    const { user } = useAppSelector((state) => state.auth);
    //INIT component & data
    useEffect(() => {
        if (!activeTask.taskName) {
            navigator("/project/ltg/objective");
        }
        else {
            if (!activeObjective.objectiveName) {
                const getSuperStations = async () => {
                    await dispatch(getAllLTGs({ parentId: activeProject._id, token: user.token }));
                    let stationsFound = false;
                    for (let LTG of data) {
                        if (!stationsFound) {
                            await dispatch(getObjective({ id: activeTask.owningObjective, parentId: LTG._id, token: user.token }))
                                .then(async (response) => {
                                if (response.payload) {
                                    console.log(' getting ALL LTGs for Task Tree...');
                                    console.log(response);
                                    await dispatch(getLTG({ id: response.payload.owningLTG, parentId: activeProject._id, token: user.token }));
                                    stationsFound = true;
                                }
                            });
                        }
                    }
                };
                getSuperStations();
            }
        }
    }, []);
    return (_jsxs("div", { className: 'pt7 mt7 p3 m3 b-color-dark-2 white', children: [activeLTG && activeObjective && _jsxs("h3", { className: 'font-1 white', children: [" ", _jsx(Link, { to: '/project', children: activeProject.projectName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg', children: activeLTG.LTGName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg/objective', children: activeObjective.objectiveName }), " ", '>', " ", _jsx(Link, { to: '/project/ltg/objective/task', children: activeTask.taskName })] }), _jsxs("section", { className: 'font-3', children: [_jsxs("h2", { className: 'font-1 s4', children: [activeTask.taskName, " :", _jsx("span", { className: 'font-5 s2 m3 orange', children: `${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType ? activeTask.stationType : 'Task'}` })] }), "Date: ", `${activeTask.date !== '' ? activeTask.date.slice(0, 15) : 'No date is set yet'}`, " ", _jsx("br", {}), "Time: ", `${activeTask.date !== '' ? activeTask.date.slice(15, 21) : 'No Time is set yet'}`, _jsx("div", { className: 'p3 m3 border-top-w1 border-top-white border-top-solid', children: _jsx(Settings_Task, {}) })] })] }));
}
;
export default Task;
