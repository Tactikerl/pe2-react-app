import { BrowserRouter, Routes, Route } from "react-router-dom";
import VenueList from "./components/frontpage/VenueList";
import Venue from "./components/venue/Venue";
import UserRegister from "./components/userregister/UserRegister";
import UserLogin from "./components/userlogin/UserLogin";
import NewVenue from "./components/newvenue/NewVenue";
import EditVenue from "./components/venueEdit/EditVenue";
import Layout from "./components/common/Layout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/venues/:id" element={<Venue />} />
          <Route path="" element={<VenueList />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          <Route path="/NewVenue" element={<NewVenue />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/venues/:id/edit" element={<EditVenue />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
