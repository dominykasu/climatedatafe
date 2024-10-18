// Home.tsx
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {fetchWeatherData, fetchWeatherForAllTowns} from "../../services/api";
import axios from "axios";


const Home: React.FC = () => {
    const [weatherData, setWeatherData] = useState<{ [key: string]: any[] }>({});

    useEffect(() => {
        const fetchData = async () => {
            const allData = await fetchWeatherForAllTowns();
            setWeatherData(allData);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>10-Day Weather Forecast for Lithuania's Largest Towns</h1>
            {Object.keys(weatherData).map((townName) => (
                <div key={townName} style={{ marginBottom: "50px" }}>
                    <h2>{townName}</h2>
                    <ResponsiveContainer width="90%" height={250}>
                        <LineChart
                            data={weatherData[townName]}
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};

export default Home;