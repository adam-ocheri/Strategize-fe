import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Project from "./components/stations/project/Project";
import Settings_Project from "./components/stations/project/Settings_Project";
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/register', element: _jsx(Signup, {}) }), _jsx(Route, { path: '/login', element: _jsx(Login, {}) }), _jsx(Route, { path: "/project", element: _jsx(Project, {}) }), _jsx(Route, { path: "/project/settings", element: _jsx(Settings_Project, {}) })] }) }));
}
export default App;
