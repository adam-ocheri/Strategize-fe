import axios from "axios";

const API_URL_Create = 'https://strategize-be.vercel.app/api/user/register/';
const API_URL_Login = 'https://strategize-be.vercel.app/api/user/login/';
const API_URL_Stat = 'https://localhost:4000/api/user/stats';

export const registerUser = async (userData: any) => {
    console.log("servicing");
    console.log(userData);
    const response = await axios.post(API_URL_Create, userData);

    if (response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

export const loginUser = async (userData: any) => {
    console.log("servicing");
    console.log(userData);
    const response = await axios.post(API_URL_Login, userData);

    if (response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

export const logoutUser = () => {
    localStorage.removeItem('user')
}

export const updateStat = async ({userStatistics, id, token} : any) => {
    
    const authConfig = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };
    
    const response = await axios.post(API_URL_Stat + `?id=${id}`, userStatistics, authConfig);

    return response.data;
}