import axios from "axios";

//const API_URL = 'https://strategize-be.vercel.app/api/Objectives/';
const API_URL = 'http://localhost:4000/api/project/ltgs/objectives/';

//! ROUTE: api/project/ltgs/objectives -----------------------------------------------------------------------------------------------------------------------

export const create = async ({objectiveName, parentId, owner, token} : any) => {
    (console.log('trying to create Objective...'));
    console.log(objectiveName);
    console.log(owner);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.post(API_URL + `?owner=${owner}&owningLTG=${parentId}`, {objectiveName: objectiveName}, authConfig);
    console.log(response.data);

    return response.data;
}

export const getAll = async ({parentId, token} : any) => {
    (console.log('trying to get all Objectives...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL + `?owningLTG=${parentId}`, authConfig);
    console.log(response.data);

    return response.data;
}

//! ROUTE: api/project/ltgs/objectives/objective -----------------------------------------------------------------------------------------------------------------

export const update = async ({body, id, parentId, token} : any) => {
    (console.log('trying to update Objective...'));
    console.log(body);
    console.log(id);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.put(API_URL + 'objective' + `?id=${id}&owningLTG=${parentId}`, body, authConfig);
    console.log(response.data);

    return response.data;
}

export const getOne = async ({id, parentId, token} : any) => {
    (console.log('trying to get one Objective...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL + 'objective' + `?id=${id}&owningLTG=${parentId}`, authConfig);
    console.log(response.data);
    
    return response.data;
}

export const deleteById = async ({id, parentId, owner, token} : any) => {
    (console.log('trying to delete all Objectives...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.delete(API_URL + 'objective'+ `?id=${id}&owningLTG=${parentId}&owner=${owner}`, authConfig);
    console.log(response.data);

    return response.data;
}