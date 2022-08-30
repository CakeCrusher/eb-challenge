import React, { useState, useEffect } from "react";
import "./App.css";
import Results from "./components/Results";

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  const [data, setData] = useState([]);
  const [stationId, setStationId] = useState("");
  const fetchData = async (_data, _setData, _stationId, loadMore = false) => {
    let result;

    if (_stationId) {
      result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/stations/${_stationId}?offset=${_data.length}`
      );
    } else {
      result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/stations?offset=${_data.length}`
      );
    }
    console.log("offset", _data.length);
    const newData = await result.json();
    console.log("data due to stationId", newData);
    if (loadMore) {
      _setData([..._data, ...newData]);
    } else {
      _setData(newData);
    }
  };

  useEffect(() => {
    fetchData(data, setData, stationId);
  }, [stationId]);
  console.log("stationId", stationId);
  const fetchAll = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/stations`
    );
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://www.energybot.com/shop/img/nav-bar-logo.e55bc3dc.svg"
          className="App-logo"
          alt="logo"
        />
        <h2>Sebastian Sosa - Energy Bot challenge</h2>
        <p>
          Currently searching:{" "}
          {stationId ? (
            <>
              {`station ${stationId}`}{" "}
              <button onClick={() => setStationId("")}>X</button>
            </>
          ) : (
            "all stations"
          )}
        </p>
        {}
        {data.length ? null : (
          <button onClick={fetchAll}>Begin fetching</button>
        )}
        <Results data={data} setStationId={setStationId} />
        {data.length ? (
          <button onClick={() => fetchData(data, setData, stationId, true)}>
            Load More
          </button>
        ) : null}
      </header>
    </div>
  );
}

export default App;
