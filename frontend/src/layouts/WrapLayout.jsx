import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

function WrapLayout() {
  return (
    <>
      <div>
        <Header />
        <div className="flex lg:space-x-6 max-w-screen-3xl mx-auto px-7 pt-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default WrapLayout;
