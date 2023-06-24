import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Dashboard,
  Location,
  UserLocations,
  UserLocation,
  Newcard,
  Plan,
  MembersArea,
  UserPlan
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <br />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<Location />} />
      <Route path="/dashboard/:id/plan/:planid" element={<Plan />} />
      <Route path="/dashboard/:id/new" element={<Newcard />} />
      <Route path="/location/:id" element={<UserLocation />} />
      <Route path="/location/:id/members" element={<MembersArea />} />
      <Route path="/location" element={<UserLocations />} />
      <Route path="/location/:locid/plan/:id" element={<UserPlan />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

