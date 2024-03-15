import "./styles/global.css";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
      <div>Hi!</div>
    </>
  );
}

export default App;
