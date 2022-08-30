import React, { useState, useEffect } from "react";
// stationId
// date
// element
// dataValue
// mFlag
// qFlag
// sFlag
// obsTime
function Result({ dataItem, setStationId }) {
  return (
    <tr>
      <td>
        <button onClick={() => setStationId(dataItem.stationId)}>
          {dataItem.stationId}
        </button>
      </td>
      <td>{dataItem.date}</td>
      <td>{dataItem.element}</td>
      <td>{dataItem.dataValue}</td>
      <td>{dataItem.mFlag}</td>
      <td>{dataItem.qFlag}</td>
      <td>{dataItem.sFlag}</td>
      <td>{dataItem.obsTime}</td>
    </tr>
  );
}

export default Result;
