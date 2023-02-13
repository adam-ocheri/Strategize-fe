import axios from "axios";

//const API_URL = 'https://strategize-be.vercel.app/api/LTGs/';
const API_URL = 'http://localhost:4000/api/project/ltgs/';

//! ROUTE: api/LTGs -----------------------------------------------------------------------------------------------------------------------

export const create = async ({LTGName, parentId, owner, token} : any) => {
    (console.log('trying to create LTG...'));
    console.log(LTGName);
    console.log(owner);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.post(API_URL + `?owner=${owner}&owningProject=${parentId}`, {LTGName: LTGName}, authConfig);
    console.log(response.data);

    return response.data;
}

export const getAll = async ({parentId, token} : any) => {
    (console.log('trying to get all LTGs...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL + `?owningProject=${parentId}`, authConfig);
    console.log(response.data);

    return response.data;
}

//! ROUTE: api/LTGs/LTG -----------------------------------------------------------------------------------------------------------------

export const update = async ({body, id, parentId, token} : any) => {
    (console.log('trying to create LTG...'));
    console.log(body);
    console.log(id);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.put(API_URL + 'ltg' + `?id=${id}&owningProject=${parentId}`, body, authConfig);
    console.log(response.data);

    return response.data;
}

export const getOne = async ({id, parentId, token} : any) => {
    (console.log('trying to get all LTGs...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.get(API_URL + 'ltg' + `?id=${id}&owningProject=${parentId}`, authConfig);
    console.log(response.data);
    
    return response.data;
}

export const deleteById = async ({id, parentId, owner, token} : any) => {
    (console.log('trying to get all LTGs...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const response = await axios.delete(API_URL + 'ltg'+ `?id=${id}&owningProject=${parentId}&owner=${owner}`, authConfig);
    console.log(response.data);

    return response.data;
}