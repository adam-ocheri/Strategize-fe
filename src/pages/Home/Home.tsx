import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch,useAppSelector } from 'src/app/hooks'
import { logout, User, reset } from 'src/app/state_management/user/authSlice';
import { RootState } from 'src/app/store';
import { createProject, getAllProjects, getProject, updateProject, deleteProject, reset__project } from 'src/app/state_management/project/projectSlice';

import ChartBar from 'src/components/charts/ChartBar/ChartBar';
import ChartLine from 'src/components/charts/ChartLine/ChartLine';
import ChartPie from 'src/components/charts/ChartPie/ChartPie';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';


function Home() {

  //! To be migrated!! ------------------------------------------------------------------------------------------------------------------------
    const [formData, setFormData] = useState({
      projectName: '',
  })
  const {projectName} = formData;
  
  const {data} = useAppSelector((state) => state.project)

  const onFormUpdated = (e : Event | any) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onFormSubmitted = (e: Event | any) => {
    e.preventDefault();
    if(!projectName)
    {
      throw new Error ("Please enter all fields!");
    }
    else{
      console.log("trying to login...");
      console.log(formData);
      dispatch(createProject({projectName: projectName, owner: user._id, token: user.token}))
    }
  }

  const onLogoutClicked = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigator('/register');
  }

  const onUpdateProjectName = async (e : any, id : any) => {
    console.log(id);
    await dispatch(updateProject({projectName: projectName, id: id, token: user.token}));
  }

  const manageSelectedStation = async (e : any, id : any) => {
    console.log("trying to EDIT PROJECT...........")
    console.log(id);
    await dispatch(getProject({id: id, token: user.token}));
    navigator('/project');
  }

  //! Immigrants Border -----------------------------------------------------------------------------------------------------------------------
  
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const {user} : any = useAppSelector((state : RootState) => state.auth);

  useEffect(() => {
    if (!user)
    {
      navigator('/register');
    }
    else {
      dispatch(getAllProjects({owner: user._id, token: user.token}));
    }

  }, [user, navigator])

  return (
    <main className='generic-container-1 p1 m1'>
      {user && <div className='generic-container-3 font-5'>
          <div className='generic-container-3 card-sub-main quad-box-shadow-2'>   {/* generic-container-3 card-sub-main quad-box-shadow-2 */}
            <h1 className='font-1 white s5'>Welcome</h1>
            <div className='generic-container-3 font-5'>
              <p>
                <strong className='font-6'>Name : </strong> {user.name}
              </p>
              <p>
              <strong className='font-6'>Email : </strong> {user.email}
              </p>
              <p>
                <Button_S2 onClick={onLogoutClicked}> Logout </Button_S2>
              </p>
              
            </div>
          </div>
        </div>}
      <section >  {/*className='card-main quad-box-shadow-4 p1 m1'*/}
        <article className='card-sub-main p4 m5 quad-box-shadow-2'>
          <div className='centered'>
            <h2 className='font-3'>Create New Project</h2>
            <form className='form-generic' onSubmit={(e) => onFormSubmitted(e)}>
                <input className="form-generic-input font-2" type="text" placeholder="Project Name" id="projectName" 
                    name="projectName" value={projectName} onChange={(e) => {onFormUpdated(e)}}/>
                <Button_S2 type='submit'>Create</Button_S2>
            </form>  
          </div>
          <div className='p3 m3'>
            {data && user  && 
            <div className='card-sub p3 m3 quad-box-shadow-1'>
              <h4 className='s3 p2 m2 font-3 centered'>Existing Projects</h4>
              {data.map((project : any) => (
              <div key={project._id} className='card-sub-child p3 m3'>
                <div className='flex'>
                  <h2 className='font-1 s1 p1 m1 orange '>Project Name :</h2> <h3 className='font-2 s4 p3 m3 white'>{project.projectName}</h3>
                  <div className='flex parent flex-flow-left'>
                    <Button_S2 className='p3 m3' onClick={(e : any) => {manageSelectedStation(e, project._id)}}> Manage </Button_S2>
                  </div>
                </div>
                <div>
                  <h2 className='font-1 s1 p1 m1 orange'>Owner :</h2> <h3 className='font-2 s2 p1 m1 white'>{user.name}</h3> 
                </div>
              </div>
              ))}
            </div>}
          </div>
        </article>
      </section>
    </main>
  )
}

export default Home