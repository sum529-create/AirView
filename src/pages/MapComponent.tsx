import { styled } from "styled-components";
import Header from "../components/Header";
import MapOpenAQ from "../components/MapOpenAQ";
import AirQualityOverview from "../components/AirQualityOverview";
import AirQualityList from "../components/AirQualityList";
import TabAir from "../components/TabAir";
import { useState } from "react";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  overflow: hidden;
  position: relative;
  margin-bottom: 140px;
`;
const Section = styled.div`
  max-width: 716px;
  margin: 0 auto;
  padding: 1.25rem;
`;
const MapWrap = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  height: auto;
  background-color: #eefaf6;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;
const MapArea = styled.div`
  height: 100%;
`;
const NationalMap = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;

function MapCompnent() {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };
  const [selectedSubTab, setSelectedSubTab] = useState<number>(0);
  const handleSubTabSelect = (tab: number) => {
    setSelectedSubTab(tab);
  };
  return (
    <Container>
      <Section>
        <Header />
        <TabAir
          onSelectTab={handleTabSelect}
          onSelectSubTab={handleSubTabSelect}
        />
        <MapWrap>
          <AirQualityList
            selectedTab={selectedTab}
            selectedSubTab={selectedSubTab}
          />
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
      </Section>
    </Container>
  );
}
export default MapCompnent;
