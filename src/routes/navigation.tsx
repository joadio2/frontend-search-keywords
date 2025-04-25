import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Loader from "../pages/loader";
import List from "../pages/list";
import Calendar from "../pages/calendar";
import Completed from "../pages/completed";
import Failed from "../pages/failed";
export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/list" element={<List />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/failed" element={<Failed />} />
    </Routes>
  );
}
