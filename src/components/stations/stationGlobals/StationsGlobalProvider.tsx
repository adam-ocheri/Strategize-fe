import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks'
import { getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';

const StationsContext = React.createContext({} as any);

function StationsGlobalProvider({children} : any) {

    const dispatch = useAppDispatch();
    const {user} = useSelector((state : any) => {return state.auth})
    const navigator = useNavigate();

    const manageSelectedTask_Remote = async (e : any, id : any, parentObjectiveId : any, _item : any, {subTask} : any) => {
        console.log("trying to EDIT Task...........")
        console.log('manageSelectedTask_Remote!!!!!!.....')
        console.log(subTask);
        if (subTask !== null){
            console.log('SUBTASK is OK! :)');
            await dispatch(setActiveTask({item: subTask}));
        }
        else{
            console.log('SUBTASK is SHIT!!!!!!! :(');
            await dispatch(getTask({id: id, parentId: parentObjectiveId, token: user.token}));
        }
        
        navigator('/project/ltg/objective/task');
    }

    const testThisLogicWorks = () => {
        console.log('This LOGIC indeed WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    
  return (
    <StationsContext.Provider value={{manageSelectedTask_Remote, testThisLogicWorks}}>
        {children}
    </StationsContext.Provider>
  )
}

export {StationsContext, StationsGlobalProvider}
