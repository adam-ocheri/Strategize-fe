export function refreshStation(context, activeStation, allUserTasks, setTaskData) {
    if (allUserTasks.length > 0) {
        let descendants = [];
        for (let task of allUserTasks) {
            if (task.heritage[`${context}`].id === activeStation._id) {
                descendants.push(task);
            }
        }
        console.log('descendants: ', descendants);
        setTaskData(descendants);
    }
}
