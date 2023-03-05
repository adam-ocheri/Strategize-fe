import axios from "axios";

//const API_URL = 'https://strategize-be.vercel.app/api/tasks/';
const API_URL = 'http://localhost:4000/api/project/ltgs/objectives/tasks/';

//! ROUTE: api/project/ltgs/objectives/tasks -----------------------------------------------------------------------------------------------------------------------

export const create = async ({taskName, parentId, owner, token} : any) => {
    (console.log('trying to create task...'));
    console.log(taskName);
    console.log(owner);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.post(API_URL + `?owner=${owner}&owningObjective=${parentId}`, {taskName: taskName, date: ''}, authConfig);
    console.log(response.data);

    return response.data;
}

export const getAll = async ({parentId, token} : any) => {
    (console.log('trying to get all tasks...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL + `?owningObjective=${parentId}`, authConfig);
    console.log(response.data);

    return response.data;
}

//! ROUTE: api/project/ltgs/objectives/tasks/task -----------------------------------------------------------------------------------------------------------------

export const update = async ({body, id, parentId, token} : any) => {
    (console.log('trying to update task...'));
    console.log(body);
    console.log(id);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.put(API_URL + 'task' + `?id=${id}&owningObjective=${parentId}`, body, authConfig);
    console.log(response.data);

    return response.data;
}

export const getOne = async ({id, parentId, token} : any) => {
    (console.log('trying to get one task...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL + 'task' + `?id=${id}&owningObjective=${parentId}`, authConfig);
    console.log(response.data);
    
    return response.data;
}

export const deleteById = async ({id, parentId, owner, token} : any) => {
    (console.log('trying to delete all tasks...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.delete(API_URL + 'task'+ `?id=${id}&owningObjective=${parentId}&owner=${owner}`, authConfig);
    console.log(response.data);

    return response.data;
}