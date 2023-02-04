import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { logout, reset } from 'src/app/state_management/user/authSlice';
import { createProject, getAllProjects, updateProject, deleteProject } from 'src/app/state_management/project/projectSlice';
function Home() {
    //! To be migrated!! ------------------------------------------------------------------------------------------------------------------------
    const [formData, setFormData] = useState({
        projectName: '',
    });
    const { projectName } = formData;
    const { data } = useAppSelector((state) => state.project);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!projectName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(createProject({ projectName: projectName, owner: user._id, token: user.token }));
        }
    };
    const onLogoutClicked = () => {
        dispatch(logout());
        dispatch(reset());
        navigator('/');
    };
    const onUpdateProjectName = (e, id) => {
        console.log(id);
        dispatch(updateProject({ projectName: projectName, id: id, token: user.token }));
    };
    //! Immigrants Border -----------------------------------------------------------------------------------------------------------------------
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            navigator('/login');
        }
        else {
            dispatch(getAllProjects({ owner: user._id, token: user.token }));
        }
    }, [user, navigator]);
    return (<section>
      {user && <div>
        <h1>Welcome</h1>
        <p>
          Name: {user.name}
        </p>
        <p>
          Email : {user.email}
        </p>
        <p>
          <button onClick={onLogoutClicked}>Logout</button>
        </p>
      </div>}
      <div>
        <h2>Create New Project</h2>
        <form onSubmit={(e) => onFormSubmitted(e)}>
            <input className="form-input" type="text" placeholder="Project Name" id="projectName" name="projectName" value={projectName} onChange={(e) => { onFormUpdated(e); }}/>
            <button type='submit'>Create</button>
        </form>  
      </div>
      <div>
        <h4>Existing Projects</h4>
        {data &&
            <div>
          {data.map((project) => (<div key={project._id} style={{ border: '5px solid black', margin: '5px' }}>
            <p>
              Project Name: {project.projectName} 
              <button onClick={(e) => { onUpdateProjectName(e, project._id); }}>Update</button> 
              <button onClick={() => { dispatch(deleteProject({ projectId: project._id, token: user.token })); }}>Delete</button>
            </p>
            <p>
              Owner: {project.owner} 
            </p>
          </div>))}
        </div>}
      </div>
    </section>);
}
export default Home;
