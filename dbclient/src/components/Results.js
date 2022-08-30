import React from "react";
import Result from "./Result";

// wraps the individual rows of the data table
function Results({ data, setStationId }) {
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Station ID</th>
            <th>Date</th>
            <th>Element</th>
            <th>Data Value</th>
            <th>M Flag</th>
            <th>Q Flag</th>
            <th>S Flag</th>
            <th>Obs Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Result key={item.id} dataItem={item} setStationId={setStationId} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
