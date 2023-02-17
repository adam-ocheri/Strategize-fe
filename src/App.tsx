import { Route, Routes, BrowserRouter } from "react-router-dom";
import {Helmet} from 'react-helmet'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Project from "./components/stations/project/Project";
import Settings_Project from "./components/stations/project/Settings_Project";
import LTG from "./components/stations/LTG/LTG";
import Settings_LTG from "./components/stations/LTG/Settings_LTG";
import Objective from "./components/stations/objective/Objective";
import Settings_Objective from "./components/stations/objective/Settings_Objective";
import Task from "./components/stations/task/Task";
import Settings_Task from "./components/stations/task/Settings_Task";
import Navbar from "./components/layout/Navbar";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login/>} />
          <Route path="/project" element={<Project/>} />
          <Route path="/project/settings" element={<Settings_Project/>} />
          <Route path="/project/ltg" element={<LTG/>} />
          <Route path="/project/ltg/settings" element={<Settings_LTG/>} />
          <Route path="/project/ltg/objective" element={<Objective/>} />
          <Route path="/project/ltg/objective/settings" element={<Settings_Objective/>} />
          <Route path="/project/ltg/objective/task" element={<Task/>} />
          <Route path="/project/ltg/objective/task/settings" element={<Settings_Task/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

document.body.classList.add('gradient-background');

export default App;
