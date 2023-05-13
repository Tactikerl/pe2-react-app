import VenueParams from "./components/common/VenueParams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FetchedVenue from "./components/venue/FetchedVenue";
import UserRegister from "./components/common/UserRegister";
import UserLogin from "./components/common/UserLogin";
import Nav from "./components/common/Nav";
import NewVenue from "./components/common/NewVenue";
import EditVenue from "./components/venueEdit/EditVenue";

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
