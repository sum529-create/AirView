import React, { useState, useRef, useMemo } from "react";
import { MapContainer, LayersControl, TileLayer } from "react-leaflet";
import "proj4";
import "proj4leaflet";
import L, { CRS, bounds } from "leaflet";
import "leaflet/dist/leaflet.css";

const MapOpenAQ: React.FC = () => {
  // 좌표계 정의
  const EPSG5181 = useMemo(() => {
    return new L.Proj.CRS(
      "EPSG:5181",
      "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
      {
        resolutions: [
          2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25,
        ],
        origin: [-30000, -60000],
        bounds: L.bounds(
          [-30000 - Math.pow(2, 19) * 4, -60000],
          [-30000 + Math.pow(2, 19) * 5, -60000 + Math.pow(2, 19) * 5]
        ),
      }
    );
  }, []);

  const mapRef = useRef<any>(null);

  const [mapStat] = useState({
    center: { lat: 37.142803, lng: 128.18161 },
    zoom: 1,
    crs: EPSG5181,
    minZoom: 0,
    maxZoom: 13,
  });

  return (
    <div className="map-container">
      <MapContainer
        id="map"
        style={{ height: "100%" }}
        center={mapStat.center}
        zoom={mapStat.zoom}
        crs={mapStat.crs}
        zoomControl={false}
        ref={mapRef}
        preferCanvas={true}
        worldCopyJump={false}
      >
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked={true} name={"지도"}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://map{s}.daumcdn.net/map_2d/1807hsm/L{z}/{y}/{x}.png"
              minZoom={0}
              maxZoom={13}
              zoomReverse={true}
              zoomOffset={1}
              subdomains="0123"
              tms={true}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapOpenAQ;
