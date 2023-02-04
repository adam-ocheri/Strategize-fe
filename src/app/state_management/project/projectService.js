import axios from "axios";
const API_URL = 'http://localhost:4000/api/projects/';
export const create = async ({ projectName, owner, token }) => {
    (console.log('trying to create project...'));
    console.log(projectName);
    console.log(owner);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL, { projectName: projectName, owner: owner }, authConfig);
    console.log(response.data);
    return response.data;
};
export const update = async ({ projectName, id, token }) => {
    (console.log('trying to create project...'));
    console.log(projectName);
    console.log(id);
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_URL + id, { projectName: projectName, _id: id }, authConfig);
    console.log(response.data);
    return response.data;
};
export const get = async ({ token }) => {
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
};
export const deleteProjectById = async ({ projectId, token }) => {
    (console.log('trying to get all projects...'));
    console.log(token);
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(API_URL + projectId, authConfig);
    console.log(response.data);
    return response.data;
};
