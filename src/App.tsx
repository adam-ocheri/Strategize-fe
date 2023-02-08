import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Project from "./components/stations/project/Project";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/project" element={<Project/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
