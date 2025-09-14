import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FacultyLog from "./Admin/FacultyLog";
import ListJob from "./Admin/ListJob";
import ListResource from "./Admin/ListResource";
import Resources from "./Students/Resources";
import JobList from "./Students/JobList";
import Home from "./Constants/Home";
import GetExperiences from "./Students/GetExperience";
import SubmitExperience from "./Students/SubmitExperience";
import GetStats from "./Students/GetStats";
import SubmitStats from "./Admin/SubmitStats";
import Log from "./Admin/Log";
import Reg from "./Admin/Reg";
import Dashboard from "./Admin/Dashboard";
 import Slog from "./Students/Slog";
import StudHome from "./Students/StudHome";
import HomeExp from "./Constants/HomeExp";
import HomeAddExp from "./Constants/HomeAddExp";
import HomeRes from "./Constants/HomeRes";
import JobListAd from "./Admin/JobListAd";
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route exact path="/getJob" element={<JobListAd />} />
        <Route exact path="/addJob" element={<ListJob />} />
        <Route exact path="/getExperience" element={<GetExperiences />} />
        <Route exact path="/addExperiences" element={<SubmitExperience />} />

        <Route exact path="/getStats" element={<GetStats />} />
        <Route exact path="/addStats" element={<SubmitStats />} />

        <Route exact path="/log" element={<Log />} />
        <Route exact path="/reg" element={<Reg />} />
        <Route exact path="/studLog" element={<Slog />} />

        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/student/home" element={<StudHome />} />
        <Route exact path="/" element={<Home />} />


        <Route exact path="/getResources" element={<Resources />} />
        <Route exact path="/addResources" element={<ListResource />} />


        <Route exact path="/getExp" element={<HomeExp />} />
        <Route exact path="/postExp" element={<HomeAddExp />} />
        <Route exact path="/getres" element={<HomeRes />} />

      </Routes>
    </BrowserRouter>
  );
}