import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./components/utils/UserContext";
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
  const [user, setUser] = useState({
    accessToken: sessionStorage.getItem("accessToken"),
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    isManager: sessionStorage.getItem("isManager"),
  });

  function updateUser(newUser) {
    sessionStorage.setItem("username", newUser.username);
    sessionStorage.setItem("email", newUser.email);
    sessionStorage.setItem("accessToken", newUser.accessToken);
    sessionStorage.setItem("isManager", newUser.venueManager);
    setUser(newUser);
  }
  function clearUser() {
    sessionStorage.clear();
    setUser({});
  }
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, updateUser, clearUser }}>
        <Layout>
          <Routes>
            <Route path="/venues/:id" element={<Venue title="Venue" />} />
            <Route
              path=""
              element={<VenueList title="Welcome to Holidaze!" />}
            />
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
