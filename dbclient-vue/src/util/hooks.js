// overarching function for fetching data from the api
export const fetchData = async (
  _data,
  _setData,
  _stationId,
  loadMore = false
) => {
  let result;
  const BACKEND_URL_TEMP = "http://localhost:3001";
  console.log("backend url: ", BACKEND_URL_TEMP);
  if (_stationId) {
    result = await fetch(
      `${BACKEND_URL_TEMP}/api/stations/${_stationId}?offset=${_data.length}`
    );
  } else {
    result = await fetch(
      `${BACKEND_URL_TEMP}/api/stations?offset=${_data.length}`
    );
  }
  console.log("offset", _data.length);
  let newData = await result;
  console.log("data due to stationId", newData);
  console.log("data due to stationId body", newData.body);
  newData = await newData.json();
  if (loadMore) {
    _setData([..._data, ...newData]);
  } else {
    _setData(newData);
  }
};
