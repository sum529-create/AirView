import React, { useState } from "react";
import { useQuery } from "react-query";
import { getNearbyMsrstnList } from "../services/api";
import LocationComponent from "./LocationComponent";

const MyLocationAirway = () => {
  const [tmX, setTmX] = useState("");
  const [tmY, setTmY] = useState("");
  const handleTmXvalue = (tmX: string) => {
    setTmX(tmX);
  };
  const handleTmYvalue = (tmY: string) => {
    setTmY(tmY);
  };
  const { isLoading, data: measureStation } = useQuery(
    ["measureStation", tmX, tmY],
    () => getNearbyMsrstnList(tmX, tmY)
  );
  console.log(measureStation);

  return (
    <>
      <LocationComponent getTmX={handleTmXvalue} getTmY={handleTmYvalue} />
      <p className="sub-title">대기정보</p>
    </>
  );
};

export default MyLocationAirway;
