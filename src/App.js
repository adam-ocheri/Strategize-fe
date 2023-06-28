import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Project from "./components/stations/project/Project";
import Settings_Project from "./components/stations/project/Settings_Project";
import LTG from "./components/stations/LTG/LTG";
import Settings_LTG from "./components/stations/LTG/Settings_LTG";
import Objective from "./components/stations/objective/Objective";
import Settings_Objective from "./components/stations/objective/Settings_Objective";
import Task from "./components/stations/task/Task";
import Settings_Task from "./components/stations/task/Settings_Task";
import Navbar from "./components/layout/navbar/Navbar";
import AI_Assistant from "./components/AI/AI_Assist/AI_Assistant";
import UserProfile from "./pages/Signup/Profile/UserProfile";
import Notifications from "./features/notifications/Notifications";
import { ChakraProvider } from '@chakra-ui/react';
import HomeUI from "./pages/home-styled/HomeUI";
import DocGen from "./components/documentation/generic/DocGen";
import Strategizer from "./pages/Strategizer/Strategizer";
function App() {
    return (_jsx("div", { children: _jsx(BrowserRouter, { children: _jsxs(ChakraProvider, { children: [_jsx(Notifications, {}), _jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(HomeUI, {}) }), _jsx(Route, { path: '/profile', element: _jsx(UserProfile, {}) }), _jsx(Route, { path: '/assistant', element: _jsx(AI_Assistant, {}) }), _jsx(Route, { path: '/documentation', element: _jsx(DocGen, {}) }), _jsx(Route, { path: '/Strategizer', element: _jsx(Strategizer, {}) }), _jsx(Route, { path: '/register', element: _jsx(Signup, {}) }), _jsx(Route, { path: '/login', element: _jsx(Login, {}) }), _jsx(Route, { path: "/project", element: _jsx(Project, {}) }), _jsx(Route, { path: "/project/settings", element: _jsx(Settings_Project, {}) }), _jsx(Route, { path: "/project/ltg", element: _jsx(LTG, {}) }), _jsx(Route, { path: "/project/ltg/settings", element: _jsx(Settings_LTG, {}) }), _jsx(Route, { path: "/project/ltg/objective", element: _jsx(Objective, {}) }), _jsx(Route, { path: "/project/ltg/objective/settings", element: _jsx(Settings_Objective, {}) }), _jsx(Route, { path: "/project/ltg/objective/task", element: _jsx(Task, {}) }), _jsx(Route, { path: "/project/ltg/objective/task/settings", element: _jsx(Settings_Task, {}) })] })] }) }) }));
}
document.body.classList.add('gradient-background');
export default App;
