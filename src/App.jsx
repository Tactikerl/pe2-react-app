import VenueParams from "./components/VenueParams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FetchedVenue from "./components/FetchedVenue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/venues/:id" element={<FetchedVenue />} />
        <Route path="" element={<VenueParams />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
