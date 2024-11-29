import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout.jsx";
import WrapLayout from "./layouts/WrapLayout.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WrapLayout />}>
            <Route path="/" element={<GuestLayout />}>
              <Route index element={<Home />} />
              <Route path="post" element={<Post />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
);
