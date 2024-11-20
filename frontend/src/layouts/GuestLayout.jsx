import { Outlet } from "react-router-dom";
import Nav from '../components/Nav.jsx'

function GuestLayout() {
  return (
    <>
      <h1>Guest Layout</h1>
      <Nav />
      <Outlet />
    </>

  );
}

export default GuestLayout;