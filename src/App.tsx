import "./styles/global.css";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
