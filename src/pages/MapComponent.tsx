import { styled } from "styled-components";
import Header from "../components/Header";
import MapOpenAQ from "../components/MapOpenAQ";
import AirQualityOverview from "../components/AirQualityOverview";
import AirQualityList from "../components/AirQualityList";
import TabAir from "../components/TabAir";
import { useState } from "react";

const Container = styled.div`
  max-width: 676px;
`;
const MapWrap = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  height: 754px;
  background-color: #eefaf6;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;
const MapArea = styled.div`
  height: 100%;
`;
const NationalMap = styled.div`
  width: 100%;
  height: 100vh;
`;

function MapCompnent() {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };
  return (
    <>
      <Container>
        <Header />
        <TabAir onSelectTab={handleTabSelect} />
        <MapWrap>
          <AirQualityList selectedTab={selectedTab} />
          <MapArea>
            <NationalMap>
              <img
                src={process.env.PUBLIC_URL + "/bg_map_air.jpeg"}
                alt="Background Map"
              />
            </NationalMap>
            {/* <MapOpenAQ /> real map */}
          </MapArea>
        </MapWrap>
        <AirQualityOverview />
      </Container>
    </>
  );
}
export default MapCompnent;
