import axios from 'axios';

const backendUrl: String = "http://localhost:8081"

const API_KEY = process.env.REACT_APP_OPENWEATHERMAPP_API_KEY;

// const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const towns = [
    { name: "Vilnius", code: "vilnius" },
    { name: "Kaunas", code: "kaunas" },
    { name: "Klaipėda", code: "klaipeda" },
    { name: "Šiauliai", code: "siauliai" },
    { name: "Panevėžys", code: "panevezys" },
    { name: "Alytus", code: "alytus" },
    { name: "Marijampolė", code: "marijampole" },
    { name: "Mažeikiai", code: "mazeikiai" },
    { name: "Jonava", code: "jonava" },
    { name: "Utena", code: "utena" },
];
export const fetchWeatherData = async (townName: string) => {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: {
                q: townName,
                appid: API_KEY,
                units: "metric"
            }
        });

        const forecastData = response.data.list.map((forecast: any) => ({
            date: forecast.dt_txt.split(" ")[0],
            temperature: forecast.main.temp,
        }));

        return forecastData.slice(0, 10);
    } catch (error) {
        console.error(`Error fetching data for ${townName}:`, error);
        return [];
    }
};
export const fetchWeatherForAllTowns = async () => {
    const allData: { [key: string]: any[] } = {};
    for (const town of towns) {
        const data = await fetchWeatherData(town.name);
        allData[town.name] = data;
    }
    return allData;
};
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

export const deleteUser = async (id: number) => {
    await axios.delete(`${backendUrl}/users/${id}`, { headers: authHeader() });
};

export const updateUser = async (id: number, userData: any) => {
    await axios.put(`${backendUrl}/users/${id}`, userData, { headers: authHeader() });
};