import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Loader from "../pages/loader";
import List from "../pages/list";
import Calendar from "../pages/calendar";
import Completed from "../pages/completed";
import Failed from "../pages/failed";
import Report from "../pages/report";
import RenderReport from "../components/reporte/renderReport";
export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/list" element={<List />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="/report" element={<Report />} />
      <Route path="/reportDetail" element={<RenderReport />} />
    </Routes>
  );
}
