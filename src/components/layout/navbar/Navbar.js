import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import ButtonBase from '../../elements/buttons/ButtonBase/ButtonBase';
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
    return (_jsxs("nav", { className: 'navbar', children: [_jsx("img", { src: 's-logo.png', alt: 'logo', height: '70px', width: '75px', className: 'logo-img' }), _jsxs("ul", { className: 'item-list flex j-center', children: [_jsx("li", { children: _jsx("a", { className: 'anchor1 font-8', children: "Projects" }) }), _jsx("li", { children: _jsx("a", { className: 'anchor1 font-8', children: "Settings" }) }), _jsx("li", { onClick: () => navigator('/assistant'), children: _jsx("a", { className: 'anchor1 font-8', children: "Assistant" }) }), _jsxs("li", { children: [_jsx("a", { className: 'anchor1 font-8', onClick: toggleDropdown, children: "Profile" }), _jsx("div", { className: `dropdown ${showDropdown ? 'show' : 'hide'}`, children: user ? (_jsxs("div", { className: 'font-8', children: [_jsxs("p", { children: ["Name: ", _jsx("button", { onClick: () => { navigator('/profile'); }, children: user.name })] }), _jsx("p", { children: "Email: john.doe@example.com" }), _jsx(ButtonBase, { children: "Logout" })] })) : (_jsxs("div", { children: [_jsx(ButtonBase, { children: "Login" }), _jsx(ButtonBase, { children: "Signup" })] })) })] })] })] }));
}
