import VenueParams from "./components/VenueParams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FetchedVenue from "./components/FetchedVenue";
import UserRegister from "./components/UserRegister";
import Nav from "./components/Nav";
import NewVenue from "./components/NewVenue";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/venues/:id" element={<FetchedVenue />} />
        <Route path="" element={<VenueParams />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/NewVenue" element={<NewVenue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
