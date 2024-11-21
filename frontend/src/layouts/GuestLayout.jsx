import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

function GuestLayout() {
  return (
    <>
      <div>
        <Header />
        <div className="max-w-3xl mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default GuestLayout;
