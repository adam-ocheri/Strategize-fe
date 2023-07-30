import { Route, Routes, BrowserRouter } from "react-router-dom";
import {Helmet} from 'react-helmet'
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Project from "./components/stations/project/Project";
import Settings_Project from "./components/stations/project/Settings_Project";
import LTG from "./components/stations/LTG/LTG";
import Settings_LTG from "./components/stations/LTG/Settings_LTG";
import Objective from "./components/stations/objective/Objective";
import Settings_Objective from "./components/stations/objective/Settings_Objective";
import Task from "./components/stations/task/Task";
import Settings_Task from "./components/stations/task/Settings_Task";
import Navbar from "./components/layout/navbar/Navbar";
//import DND_Container from "./components/drag_n_drop/test2/DND_Container";
import DND from "./components/drag_n_drop/test_3.0/dnd";
import AI_Assistant from "./components/AI/AI_Assist/AI_Assistant";
import UserProfile from "./pages/Signup/Profile/UserProfile";
import Notifications from "./features/notifications/Notifications";
import { ChakraProvider } from '@chakra-ui/react'
import HomeUI from "./pages/home-styled/HomeUI";
import DocGen from "./components/documentation/generic/DocGen";
import Strategizer from "./pages/Strategizer/Strategizer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { updateUserStatistics } from "./app/state_management/user/authSlice";


function App() {
  const dispatch = useAppDispatch();
  const {user} : any = useAppSelector(state => state.auth)

  function updateClickStat() {
    if (user) {
      dispatch(updateUserStatistics({stat: {}, id: user._id, token: user.token}));
    }
  }
  return (
    <div onClick={() => {updateClickStat()}}>
      <BrowserRouter>
        <ChakraProvider>
          <Notifications/>
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomeUI/>} />
            <Route path='/profile' element={<UserProfile/>} />
            <Route path='/assistant' element={<AI_Assistant/>} />
            <Route path='/documentation' element={<DocGen/>} />
            <Route path='/Strategizer' element={<Strategizer/>} />
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
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

document.body.classList.add('gradient-background');

export default App;
