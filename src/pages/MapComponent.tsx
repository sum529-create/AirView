import { styled } from "styled-components";
import Header from "../components/Header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Container = styled.div`
  margin: 0 auto;
  width: 576px;
  overflow: hidden;
  position: relative;
  height: 768px;
  background-color: #f1f2f6;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;
const MapArea = styled.div`
  height: 100%;
`;

function MapCompnent() {
  return (
    <>
      <Header />
      <Container>
        <MapArea>
          <MapContainer
            center={[36.5, 127.5]}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[37.5665, 126.978]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </MapArea>
      </Container>
    </>
  );
}
export default MapCompnent;
