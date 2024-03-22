import { Route, Routes } from "react-router";
import App from "./App";
import MapContainer from "./pages/MapComponent";

const Router = () => (
  <Routes>
    <Route path="/*" element={<App />}>
      <Route index element={<MapContainer />} />
    </Route>
  </Routes>
);
export default Router;
