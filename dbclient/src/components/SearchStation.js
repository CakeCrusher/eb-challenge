import React, { useEffect, useRef } from "react";

// individual rows of the data table
function SearchStation({ stationId, setStationId }) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (stationId !== inputRef.current.value) {
      inputRef.current.value = stationId;
    }
  }, [stationId]);
  const onSubmit = (e) => {
    e.preventDefault();
    setStationId(inputRef.current.value);
  };
  const onAll = (e) => {
    e.preventDefault();
    setStationId("");
  };
  return (
    <form>
      <label htmlFor="station">Currently searching station: </label>
      <input placeholder="All stations" id="station" ref={inputRef} />
      <button type="submit" onClick={onSubmit}>
        Set station
      </button>
      {stationId ? <button onClick={onAll}>All</button> : null}
    </form>
  );
}

export default SearchStation;
