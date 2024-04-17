import React, { useState, useEffect } from "react";

interface LocationStateInfo {
  getTmX: (tmX: string) => void;
  getTmY: (tmY: string) => void;
}

interface LocationState {
  loaded: boolean;
  coordinates: {
    lat: string;
    lng: string;
  };
}

const LocationComponent: React.FC<LocationStateInfo> = ({ getTmX, getTmY }) => {
  const [location, setLocation] = useState<LocationState>({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });
  const [error, setError] = useState<string | null>(null);

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude.toString(),
        lng: location.coords.longitude.toString(),
      },
    });
    getTmX(location.coords.latitude.toString());
    getTmY(location.coords.longitude.toString());
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <div>
      <h2>Geolocation</h2>
      {error ? (
        <div>Error fetching location: {error}</div>
      ) : !location.loaded ? (
        <div>Loading...</div>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Latitude:</td>
              <td>{location.coordinates.lat}</td>
            </tr>
            <tr>
              <td>Longitude:</td>
              <td>{location.coordinates.lng}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LocationComponent;
