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
import UserParams from "./components/profile/UserParams";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/venues/:id" element={<Venue title="Venue" />} />
          <Route path="" element={<VenueList title="Welcome to Holidaze!" />} />
          <Route
            path="/UserRegister"
            element={<UserRegister title="Register a new user!" />}
          />
          <Route
            path="/NewVenue"
            element={<NewVenue title="Create a new venue!" />}
          />
          <Route
            path="/UserLogin"
            element={<UserLogin title="Log in to Holidaze!" />}
          />
          <Route
            path="/venues/:id/edit"
            element={<EditVenue title="Edit your Holidaze venue!" />}
          />
          <Route
            path="/profiles/:name"
            element={<UserParams title="Your profile overview." />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
