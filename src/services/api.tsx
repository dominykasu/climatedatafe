import axios from 'axios';

const backendUrl: String = "http://localhost:8081"

export const logIn = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${backendUrl}/login`, credentials, {
            withCredentials: true, // Important for sending cookies if using session
        });
        return response.data; // Handle the response as needed
    } catch (error) {
        console.error("Login failed:", error);
        throw error; // Rethrow or handle the error
    }
};
export const getUsers = async () => {
    const response = await axios.get(`${backendUrl}/users/all`);
    return response.data;
};

export const createUser = async (user: any) => {
    await axios.post(`${backendUrl}/users/create`, user);
};

export const getUserPreferences = async () => {
    const response = await axios.get(`${backendUrl}/user/preferences/all`);
    return response.data;
};

export const createUserPreference = async (preference: any) => {
    await axios.post(`${backendUrl}/user/preferences/create`, preference);
};

export const getDataSnapshots = async () => {
    const response = await axios.get(`${backendUrl}/data/snapshots/all`);
    return response.data;
};

export const getAlerts = async () => {
    const response = await axios.get(`${backendUrl}/alerts/all`);
    return response.data;
};