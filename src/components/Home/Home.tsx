import React, {useEffect, useState} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    fetchWeatherForAllTowns,
    saveWeatherData,
    createUserPreference,
    getUserPreferences,
    fetchWeatherData,
} from "../../services/api";
import "./Home.css"

const Home: React.FC = () => {
    const [weatherData, setWeatherData] = useState<{ [key: string]: any[] }>({});
    const [selectedTowns, setSelectedTowns] = useState<string[]>([]);
    const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
    const towns = [
        "Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys",
        "Alytus", "Marijampolė", "Mažeikiai", "Jonava", "Utena"
    ];

    const user = JSON.parse(localStorage.getItem("user") || '{}');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const preferences = await getUserPreferences(user.id);
                const userPreferredRegions = preferences.map((pref: any) => pref.preferredRegion);

                if (userPreferredRegions.length > 0) {
                    setSelectedTowns(userPreferredRegions);
                    const allData = {};
                    for (const town of userPreferredRegions) {
                        // @ts-ignore
                        allData[town] = await fetchWeatherData(town);
                    }
                    setWeatherData(allData);
                } else {
                    setSelectedTowns(towns);
                    const allData = await fetchWeatherForAllTowns();
                    setWeatherData(allData);
                }
            } catch (error) {
                console.error('Error fetching preferences:', error);
                setSelectedTowns(towns);
                const allData = await fetchWeatherForAllTowns();
                setWeatherData(allData);
            }
        };

        fetchData();
    }, []);

    const handleTownClick = async (town: string) => {
        setSelectedTowns((prevSelectedTowns) => {
            const isSelected = prevSelectedTowns.includes(town);
            const updatedSelectedTowns = isSelected
                ? prevSelectedTowns.filter((selectedTown) => selectedTown !== town)
                : [...prevSelectedTowns, town];

            if (!isSelected) {
                fetchWeatherData(town).then((data) => {
                    setWeatherData((prevData) => ({
                        ...prevData,
                        [town]: data,
                    }));
                });
            }

            return updatedSelectedTowns;
        });
    };

    const handleSavePreferences = async () => {
        const validSelectedTowns = selectedTowns.filter((town) => town !== null && towns.includes(town));

        try {
            await createUserPreference(validSelectedTowns);
            setSaveSuccess(true);
        } catch (error) {
            setSaveSuccess(false);
        }
    };

    const handleSaveWeatherData = (townName: string, data: any) => {
        saveWeatherData(townName, data, user.username);
    };

    return (
        <div className='logInMainContainer'>
            <h1>10-Day Weather Forecast for Lithuania's Largest Towns</h1>

            <div className='townButtonContainer'>
                {towns.map((town) => (
                    <button
                        key={town}
                        onClick={() => handleTownClick(town)}
                        style={{
                            backgroundColor: selectedTowns.includes(town) ? "lightgreen" : "lightgray",
                        }}
                        className='townButtons'
                    >
                        {town}
                    </button>
                ))}
            </div>

            <div>
                <button onClick={handleSavePreferences}
                        className='saveButton'>
                    Save Preferences
                </button>
                {saveSuccess === true && <p className='saveSuccessMessage'>Preferences saved successfully!</p>}
                {saveSuccess === false && <p className='saveErrorMessage'>Failed to save preferences. Please try again.</p>}
            </div>

            {selectedTowns.map((townName) => (
                <div key={townName} className="townGraphContainer">
                    <h2>{townName}</h2>
                    <ResponsiveContainer width="90%" height={250}>
                        <LineChart
                            data={weatherData[townName]}
                            margin={{top: 10, right: 30, left: 0, bottom: 0}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                    </ResponsiveContainer>
                    <button onClick={() => handleSaveWeatherData(townName, weatherData[townName])}>
                        Save Data
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Home;
