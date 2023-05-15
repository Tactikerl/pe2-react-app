import VenueList from "./components/frontpage/VenueList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Venue from "./components/venue/Venue";
import UserRegister from "./components/userregister/UserRegister";
import UserLogin from "./components/userlogin/UserLogin";
import Nav from "./components/header/Nav";
import NewVenue from "./components/newvenue/NewVenue";
import EditVenue from "./components/venueEdit/EditVenue";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/venues/:id" element={<Venue />} />
        <Route path="" element={<VenueList />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/NewVenue" element={<NewVenue />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/venues/:id/edit" element={<EditVenue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
