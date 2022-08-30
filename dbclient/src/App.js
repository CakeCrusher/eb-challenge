import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Results from "./components/Results";
import { fetchData } from "./util/hooks";

// app manages the state of the app
function App() {
  const bottomRef = useRef(null);
  const [data, setData] = useState([]);
  const [stationId, setStationId] = useState(null);

  // updates data to suit the stationId state
  useEffect(() => {
    if (stationId !== null) {
      fetchData(data, setData, stationId);
    }
  }, [stationId]);
  // scrolls to the bottom after fetching data
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);

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
          <button onClick={() => fetchData(data, setData, stationId)}>
            Begin fetching
          </button>
        )}
        <Results data={data} setStationId={setStationId} />
        {data.length ? (
          <button onClick={() => fetchData(data, setData, stationId, true)}>
            Load More
          </button>
        ) : null}
        <div ref={bottomRef} />
      </header>
    </div>
  );
}

export default App;
