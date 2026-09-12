import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BriefingPage } from "./pages/BriefingPage";
import { HomePage } from "./pages/HomePage";
import { ReportPage } from "./pages/ReportPage";
import { SortPage } from "./pages/SortPage";
import { StreetsPage } from "./pages/StreetsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="streets" element={<StreetsPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="sort" element={<SortPage />} />
        <Route path="briefing" element={<BriefingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
