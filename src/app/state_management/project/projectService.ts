import axios from "axios";

//const API_URL = 'https://strategize-be.vercel.app/api/projects/';
const API_URL = 'http://localhost:4000/api/projects/';

//! ROUTE: api/projects -----------------------------------------------------------------------------------------------------------------------

export const create = async ({projectName, owner, token} : any) => {
    (console.log('trying to create project...'));
    console.log(projectName);
    console.log(owner);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.post(API_URL, {projectName: projectName, owner: owner}, authConfig);
    console.log(response.data);

    return response.data;
}

export const getAll = async ({token} : any) => {
    (console.log('trying to get all projects...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL, authConfig);
    console.log(response.data);

    return response.data;
}

//! ROUTE: api/projects/project -----------------------------------------------------------------------------------------------------------------

export const update = async ({body, id, token} : any) => {
    console.log('trying to update project settings...');
    console.log(body);
    console.log(id);
    console.log(token);

    const authConfig = {
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    };
   
    const response = await axios.put(API_URL + 'project' + `?id=${id}`, body/*{projectName: body.projectName}*/, authConfig); //! WTF?!
    console.log('Response is:')
    console.log(response.data);

    return response.data;
}

export const getOne = async ({id, token} : any) => {
    (console.log('trying to get all projects...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL + 'project' + `?id=${id}`, authConfig);
    console.log(response.data);
    
    return response.data;
}

export const deleteProjectById = async ({id, owner ,token} : any) => {
    (console.log('trying to get all projects...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.delete(API_URL + 'project'+ `?id=${id}&owner=${owner}`, authConfig);
    console.log(response.data);

    return response.data;
}