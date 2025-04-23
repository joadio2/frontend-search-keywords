import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Loader from "../pages/loader";
export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loader" element={<Loader />} />
    </Routes>
  );
}
