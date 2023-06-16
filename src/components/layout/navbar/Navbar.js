import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import Drawer_Main from 'src/components/elements/overlays/drawers/main/Drawer_Main';
//import '../../css/main.css';
export default function Navbar() {
    const navigator = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    function toggleDropdown() {
        // setShowDropdown((prevState) => !prevState);
        setShowDropdown(!showDropdown);
    }
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: 'navbar', children: [_jsx("img", { src: 's-logo.png', alt: 'logo', height: '70px', width: '75px', className: 'logo-img' }), _jsxs("ul", { className: 'item-list flex j-center', children: [_jsx("li", { onClick: () => navigator('/'), children: _jsx("a", { className: 'anchor1 font-8', children: "Projects" }) }), _jsx("li", { onClick: () => navigator('/profile'), children: _jsx("a", { className: 'anchor1 font-8', children: "Workspace" }) }), " ", _jsx("li", { onClick: () => navigator('/assistant'), children: _jsx("a", { className: 'anchor1 font-8', children: "Assistant" }) }), _jsxs("li", { children: [_jsx("a", { className: 'anchor1 font-8', onClick: toggleDropdown, children: "Profile" }), _jsx("div", { className: `dropdown ${showDropdown ? 'show' : 'hide'}` })] })] })] }), _jsx(Drawer_Main, { visible: showDropdown, changeVisibility: () => { setShowDropdown(!showDropdown); }, user: user })] }));
}
