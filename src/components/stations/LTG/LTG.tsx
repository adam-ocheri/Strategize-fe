import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store';
import CalendarDND from 'src/components/calendars/CalendarDND/CalendarDND';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';

//Child sub-station
import { getAllSubStations_LTG } from 'src/app/state_management/LTG/LTGSlice';
import { createObjective, getObjective, deleteObjective, getAllObjectives, } from 'src/app/state_management/objective/objectiveSlice';
import { updateTask, getTask, setActiveTask } from 'src/app/state_management/task/taskSlice';
import { setCurrentStationContext } from 'src/app/state_management/user/authSlice';
import { refreshStation } from 'src/app/System/Main/Heritage/Utils/heritageUtils';
import { ArrowRightIcon } from '@chakra-ui/icons';
import StationAccordion from 'src/components/elements/accordions/main/StationAccordion';
import { determineSubstationTypeNameOrigin } from '../stationGlobals/stationUtils';

function LTG({}) {
    const [formData, setFormData] = useState({
        newObjectiveName: '',
    })
    const {newObjectiveName} = formData;

    const onFormUpdated = (e : Event | any) => {
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
    }
    
    const onFormSubmitted = (e: Event | any) => {
        e.preventDefault();
        if(!newObjectiveName)
        {
          throw new Error ("Please enter all fields!");
        }
        else{
          console.log("trying to login...");
          console.log(formData);
          dispatch(createObjective({objectiveName: newObjectiveName, parentId: activeLTG._id, owner: user._id, token: user.token}))
        }
    };

    const manageSelectedStation = async (e : any, id : any) => {
        console.log("trying to EDIT Objective...........")
        console.log(id);
        await dispatch(getObjective({id: id, parentId: activeLTG._id, token: user.token}));
        navigator('/project/ltg/objective');
    }

    const manageSelectedTask_Remote = async (e : any, id : any, parentObjectiveId : any, _item: any, {subTask} : any) => {
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

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeProject, allUserTasks} : any = useAppSelector((state) => state.project)
    const {activeLTG, subData, isLoading} : any = useAppSelector((state : RootState) => state.ltg);
    const {data, activeObjective} : any = useAppSelector((state : RootState) => state.objective);
    const {activeTask} : any = useAppSelector((state : RootState) => state.task);
    const {user, stationContext} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if (!activeLTG.LTGName)
        {
            navigator("/");
        }
        else {
            const initData = async()=> {
                await dispatch(setCurrentStationContext({newContext: 'ltg'}));
                await dispatch(getAllObjectives({parentId: activeLTG._id, token: user.token}));
            }
            initData();
        }
    }, [])

    useEffect(() => {
        const getStuff = async() => {
            if (data){
                const response = await dispatch(getAllSubStations_LTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}));
                setTaskData(response.payload);
            }
        }
        getStuff();
    }, [data])

    const [taskData, setTaskData] = useState([]);

    useEffect(()=> {

        refreshStation('ltg', activeLTG, allUserTasks, setTaskData);

    }, [allUserTasks])
    
    return (
    <div className='pt3 mt3 m3 b-color-dark-2 white border-left-w1 border-left-white border-left-solid border-right-w1 border-right-white border-right-solid border-bottom-w1 border-bottom-white border-bottom-solid'>
        <h3 className='font-1 white station-nav-link-container b-color-dark-1'>
            <div className='p4 m4'>
                <Link to='/project' className='station-nav-link'>{activeProject.projectName}</Link> <ArrowRightIcon/>
                <Link to='/project/ltg' className='station-nav-link-active'>{activeLTG.LTGName}</Link>
                {/* <Link to='/project/ltg/objective' className='station-nav-link-active'>{activeObjective.objectiveName}</Link> <ArrowRightIcon/> */}
                {/* <Link to='/project/ltg/objective/task' className='station-nav-link-active'>{activeTask.taskName}</Link> */}
            </div>
        </h3>
        <div className='pb1 mb5 border-top-w1 border-top-white border-top-solid'></div>
        {/* <h3 className='font-1 white'> <Link to='/project'>{activeProject.projectName}</Link> {'>'} <Link to='/project/ltg'>{activeLTG.LTGName}</Link></h3> */}
        <section className='p1 m1'>
            <h2 className='font-1 s4'> 
                {activeLTG.LTGName} : 
                <span className='font-5 s2 m3 orange'> {`${activeLTG.stationTypeName ? activeLTG.stationTypeName : activeLTG.stationType ? activeLTG.stationType : 'Long Term Goal'}`} </span>
            </h2>
            <div>
                <Button_S2 onClick={(e : any) => {navigator('/project/ltg/settings')}}>Settings</Button_S2>
            </div>
        </section>
        <section className='p3 m3 border-top-w1 border-top-white border-top-solid'>
            <h3 className='s3 font-4'> 
                {
                    determineSubstationTypeNameOrigin({scope: 'Objective', activeProject, activeLTG})
                }{'s'} 
            </h3>
            <StationAccordion title={`${activeLTG.LTGName}`}>
                {data && <div className='p3 m3 font-5' >
                    {data.map((Objective : any) => (<div key={Objective._id} className='p3 m3 font-5 b-color-dark-1 border-w1 border-r2 border-solid border-color-white'>
                    {
                        determineSubstationTypeNameOrigin({scope: 'Objective', activeProject, activeLTG})
                    }
                    <span>{': '}</span> 
                    <span className='font-2 s2'>{Objective.objectiveName}</span>
                        <p>
                            <Button_S2 onClick={(e : any) => {manageSelectedStation(e, Objective._id)}}> Manage </Button_S2>
                            <Button_S2 onClick={() => {dispatch(deleteObjective({id: Objective._id, parentId: activeLTG._id, owner: user._id, token: user.token}))}}>Delete</Button_S2>
                        </p>
                    </div>))}
                </div>}
            </StationAccordion>     
        </section>
        <section className='p3 m3'>
            <form onSubmit={(e) => onFormSubmitted(e)}>
                <input className="form-input" type="text" id="newObjectiveName" 
                    placeholder={`${determineSubstationTypeNameOrigin({scope: 'Objective', activeProject, activeLTG})} Name`}
                    name="newObjectiveName" value={newObjectiveName} onChange={(e) => {onFormUpdated(e)}}/>
                <Button_S2 type='submit'>Add New</Button_S2>
            </form> 
        </section>
        <section>
            <CalendarDND 
                data={taskData} 
                getAllSubstations={() => {dispatch(getAllSubStations_LTG({id: activeLTG._id, owningProject: activeLTG.owningProject, owner: user._id, token: user.token}))}} 
                updateSubStation={updateTask} 
                dispatch={dispatch} 
                user={user} 
                manage={manageSelectedTask_Remote}
                activeTask={activeTask}
                currentContext={stationContext}
            />
        </section>
    </div>
    )
};

export default LTG;
