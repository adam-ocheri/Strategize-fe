import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
//import '../../css/main.css';
export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    function toggleDropdown() {
        // setShowDropdown((prevState) => !prevState);
        setShowDropdown(!showDropdown);
    }
    return (_jsxs("nav", { className: 'navbar', children: [_jsx("img", { src: 's-logo.png', alt: 'logo', height: '70px', width: '75px' }), _jsxs("ul", { className: 'item-list flex j-center', children: [_jsx("li", { children: _jsx("a", { className: 'anchor1', children: "Projects" }) }), _jsx("li", { children: _jsx("a", { className: 'anchor1', children: "Workspace" }) }), _jsx("li", { children: _jsx("a", { className: 'anchor1', children: "Settings" }) }), _jsxs("li", { children: [_jsx("a", { className: 'anchor1', onClick: toggleDropdown, children: "Profile" }), _jsx("div", { className: `dropdown ${showDropdown ? 'show' : 'hide'}`, children: user ? (_jsxs("div", { children: [_jsx("p", { children: "Name: John Doe" }), _jsx("p", { children: "Email: john.doe@example.com" }), _jsx("button", { children: "Logout" })] })) : (_jsxs("div", { children: [_jsx("button", { children: "Login" }), _jsx("button", { children: "Signup" })] })) })] })] })] }));
}
