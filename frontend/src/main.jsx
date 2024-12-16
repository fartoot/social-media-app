import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout.jsx";
import WrapLayout from "./layouts/WrapLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectRoute from "./helpers/ProtectRoute.jsx";
import Profile from "./pages/Profile.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* WrapLayout wrapped by ProtectRoute and not as tag to respect the rule : Only Route components can be a child of Routes. */}
          <Route path="/" element={ <ProtectRoute> <WrapLayout /> </ProtectRoute> } >
            <Route path="/" element={<GuestLayout />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/" element={<WrapLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>,
);
