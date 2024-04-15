export const formateDate = (date: Date, index: number) => {
  const myDate = new Date(date);

  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0");
  const day = String(myDate.getDate()).padStart(2, "0");
  if (index === 0) return `${year}-${month}-${day}`;
  else return `${month}.${day}`;
};
export const getAirQualityClassName = (
  value: number,
  selectedTab: string
): string => {
  if (selectedTab === "PM10") {
    return value < 31
      ? "air_good"
      : value < 81
      ? "air_normal"
      : value < 151
      ? "air_bad"
      : "air_veryBad";
  } else if (selectedTab === "PM25") {
    return value < 16
      ? "air_good"
      : value < 36
      ? "air_normal"
      : value < 76
      ? "air_bad"
      : "air_veryBad";
  } else if (selectedTab === "SO2") {
    return value < 0.021
      ? "air_good"
      : value < 0.051
      ? "air_normal"
      : value < 0.151
      ? "air_bad"
      : "air_veryBad";
  } else if (selectedTab === "CO") {
    return value < 3
      ? "air_good"
      : value < 10
      ? "air_normal"
      : value < 16
      ? "air_bad"
      : "air_veryBad";
  } else if (selectedTab === "O3" || selectedTab === "NO2") {
    return value < 0.031
      ? "air_good"
      : value < 0.091
      ? "air_normal"
      : value < 0.151
      ? "air_bad"
      : "air_veryBad";
  } else {
    return "";
  }
};
