import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CommunityDay from "./pages/CommunityDay";
import Team from "./pages/Team";
import Join from "./pages/Join";
import Quests from "./pages/Quests";
import Certificates from "./pages/Certificates";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:slug" element={<EventDetail />} />
        <Route path="community-day" element={<CommunityDay />} />
        <Route path="team" element={<Team />} />
        <Route path="join" element={<Join />} />
        <Route path="quests" element={<Quests />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
