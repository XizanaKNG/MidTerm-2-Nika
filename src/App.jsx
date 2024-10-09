import React, { useState, useEffect } from "react";

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ასინქრონული ფუნქცია
    const fetchLaunches = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/launches");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setLaunches(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">SpaceX Launches</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {launches.map((launch) => (
          <div
            key={launch.id}
            className="bg-white shadow-md rounded-lg p-4 w-72 hover:bg-blue-50"
          >
            <h2 className="text-lg font-semibold text-center mb-2">
              Flight Number: {launch.flight_number}
            </h2>
            <p className="text-center text-gray-600 mb-1">
              Mission: {launch.name}
            </p>
            <p className="text-center text-gray-600">
              Launch Year: {new Date(launch.date_utc).getFullYear()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
