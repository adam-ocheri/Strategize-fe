import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import '../../css/main.css';
export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    function toggleDropdown() {
        // setShowDropdown((prevState) => !prevState);
        setShowDropdown(!showDropdown);
    }
    return (_jsx("nav", { className: 'navbar', children: _jsxs("ul", { className: 'item-list flex j-center', children: [_jsx("li", { children: _jsx("button", { children: "Projects" }) }), _jsx("li", { children: _jsx("button", { children: "Workspace" }) }), _jsx("li", { className: '', children: _jsx("button", { children: "Settings" }) }), _jsxs("li", { className: '', children: [_jsx("button", { onClick: toggleDropdown, children: "Profile" }), _jsxs("div", { className: `dropdown ${showDropdown ? 'show' : 'hide'}`, children: [_jsx("p", { children: "Name: John Doe" }), _jsx("p", { children: "Email: john.doe@example.com" }), _jsx("button", { children: "Logout" })] })] })] }) }));
}
