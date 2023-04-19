import VenueParams from "./components/VenueParams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FetchedVenue from "./components/FetchedVenue";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/venues/:id" element={<FetchedVenue />} />
        <Route path="" element={<VenueParams />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
