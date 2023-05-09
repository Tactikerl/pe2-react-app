import VenueParams from "./components/VenueParams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FetchedVenue from "./components/FetchedVenue";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import Nav from "./components/Nav";
import NewVenue from "./components/NewVenue";
import EditVenue from "./components/EditVenue";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/venues/:id" element={<FetchedVenue />} />
        <Route path="" element={<VenueParams />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/NewVenue" element={<NewVenue />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/venues/:id/edit" element={<EditVenue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
