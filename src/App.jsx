import { BrowserRouter, Routes, Route } from "react-router-dom";
import VenueList from "./components/frontpage/VenueList";
import Venue from "./components/venue/Venue";
import UserRegister from "./components/userregister/UserRegister";
import UserLogin from "./components/userlogin/UserLogin";
import NewVenue from "./components/manageVenues/NewVenue";
import EditVenue from "./components/manageVenues/EditVenue";
import Layout from "./components/common/Layout";
import "../src/custom.scss";

import "./App.css";
import UserParams from "./components/common/UserParams";

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
          <Route path="/profiles/:name" element={<UserParams />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
