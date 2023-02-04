import axios from "axios";
const API_URL_Create = 'http://localhost:4000/api/user/register/';
const API_URL_Login = 'http://localhost:4000/api/user/login/';
export const registerUser = async (userData) => {
    console.log("servicing");
    console.log(userData);
    const response = await axios.post(API_URL_Create, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};
export const loginUser = async (userData) => {
    console.log("servicing");
    console.log(userData);
    const response = await axios.post(API_URL_Login, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};
export const logoutUser = () => {
    localStorage.removeItem('user');
};
