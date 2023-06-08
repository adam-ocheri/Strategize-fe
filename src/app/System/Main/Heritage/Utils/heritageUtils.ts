export function refreshStation(context : string, activeStation : any, allUserTasks : any, setTaskData : any){
    if (allUserTasks.length > 0){
        let descendants: any = [];

        for (let task of allUserTasks){
        if (task.heritage[`${context}`].id === activeStation._id){
                descendants.push(task);
            }
        }
        
        console.log('descendants: ', descendants);
        setTaskData(descendants);
    }
}