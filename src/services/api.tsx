import axios from 'axios';

const backendUrl: String = "http://localhost:8081"

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.accessToken) {
        return { Authorization: `Bearer ${user.accessToken}` };
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

export const createUserPreference = async (preferences: any) => {
    const getLocalStorageItem = localStorage.getItem('user');
    const localStorageUser = getLocalStorageItem !== null && JSON.parse(getLocalStorageItem);

    if (!localStorageUser || !localStorageUser.accessToken) {
        throw new Error('User not logged in or missing token');
    }

    try {
        const response = await axios.post(`${backendUrl}/user/preferences/create`, {
            id: localStorageUser.id, // Assuming this is userId
            preferred_region: preferences.preferred_region,
            preferred_metrics: preferences.preferred_metrics,
            time_range: preferences.time_range
        }, {
            headers: authHeader() // Send JWT token in the headers
        });

        return response.data;
    } catch (error) {
        // @ts-ignore
        console.error('Failed to create user preference:', error.response || error);
        throw error; // Re-throw the error for handling
    }
};

export const getDataSnapshots = async () => {
    const response = await axios.get(`${backendUrl}/data/snapshots/all`, {headers: authHeader()});
    return response.data;
};

export const getAlerts = async () => {
    const response = await axios.get(`${backendUrl}/alerts/all`, {headers: authHeader()});
    return response.data;
};