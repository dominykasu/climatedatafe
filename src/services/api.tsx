import axios from 'axios';

const backendUrl: String = "http://localhost:8081"

const authHeader = () => {

    const getLocalStorageItem = localStorage.getItem('user');
    const user = getLocalStorageItem !== null && JSON.parse(getLocalStorageItem);

    if (user && user.accessToken) {
        // Assuming the token is a JWT token and should have a "Bearer" type
        return {Authorization: `Bearer ${user.accessToken}`};
    } else {
        return {};
    }
}
export const logIn = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${backendUrl}/api/auth/signin`, credentials, );

        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data; // Handle the response as needed
    } catch (error) {
        console.error("Login failed:", error);
        throw error; // Rethrow or handle the error
    }
};
export const getUsers = async () => {
    try {
        const response = await axios.get(`${backendUrl}/users/all`, {
            headers: authHeader(),
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const createUser = async (user: any) => {
    await axios.post(`${backendUrl}/api/auth/signup`, user);
};

export const getUserPreferences = async () => {
    const response = await axios.get(`${backendUrl}/user/preferences/all`, {headers: authHeader()});
    return response.data;
};

export const createUserPreference = async (preference: any) => {
    await axios.post(`${backendUrl}/user/preferences/create`, preference);
};

export const getDataSnapshots = async () => {
    const response = await axios.get(`${backendUrl}/data/snapshots/all`, {headers: authHeader()});
    return response.data;
};

export const getAlerts = async () => {
    const response = await axios.get(`${backendUrl}/alerts/all`, {headers: authHeader()});
    return response.data;
};