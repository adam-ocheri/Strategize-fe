import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useDisclosure, } from '@chakra-ui/react';
import { useRef } from 'react';
import Accordion_Generic from 'src/components/elements/accordions/generic/Accordion_Generic';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { logout, reset } from 'src/app/state_management/user/authSlice';
export default function Drawer_Main({ visible, changeVisibility, user }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const onLogoutClicked = async () => {
        await dispatch(logout());
        dispatch(reset());
        navigator('/register');
    };
    const closeDrawer = () => {
        changeVisibility();
        onClose();
    };
    if (!user?.name) {
        return (_jsx("div", {}));
    }
    return (_jsx(_Fragment, { children: _jsxs(Drawer, { isOpen: visible, placement: 'right', onClose: closeDrawer, finalFocusRef: btnRef, children: [_jsx(DrawerOverlay, {}), _jsxs(DrawerContent, { children: [_jsx(DrawerCloseButton, { color: 'white' }), _jsx(DrawerHeader, { className: 'border-bottom-bright b-color-dark-1', borderBottomWidth: '2px', children: _jsx("span", { className: 'flex f-dir-row j-center white', children: "STRATEGIZE" }) }), _jsx(DrawerHeader, { fontSize: '12pt', borderBottomWidth: '1px', children: _jsxs(Accordion_Generic, { title: 'User Profile', children: [_jsxs("span", { className: 'flex f-dir-row j-between', children: [_jsx("span", { children: `${user.name}` }), " | ", _jsx("span", { children: `${user.email}` })] }), _jsx(Button, { variant: 'outline', mr: 3, onClick: onClose, style: { width: '91%', margin: '2%' }, children: "Preferences" }), _jsx(Button, { variant: 'outline', mr: 3, onClick: onClose, style: { width: '91%', margin: '2%' }, children: "Account Settings" }), _jsx(Button, { colorScheme: 'blue', onClick: onLogoutClicked, children: "Log Out" })] }) }), _jsxs(DrawerBody, { children: [_jsx(Button, { variant: 'outline', mr: 3, onClick: closeDrawer, style: { width: '91%', margin: '2%' }, children: "Projects" }), _jsx(Button, { variant: 'outline', mr: 3, onClick: closeDrawer, style: { width: '91%', margin: '2%' }, children: "Calendar" }), _jsx(Button, { variant: 'outline', mr: 3, onClick: closeDrawer, style: { width: '91%', margin: '2%' }, children: "Planner" }), _jsx(Button, { variant: 'outline', mr: 3, onClick: closeDrawer, style: { width: '91%', margin: '2%' }, children: "Notebook" }), _jsx(Button, { variant: 'outline', mr: 3, onClick: closeDrawer, style: { width: '91%', margin: '2%' }, children: "Workspace" }), _jsx(Button, { variant: 'outline', mr: 3, onClick: closeDrawer, style: { width: '91%', margin: '2%' }, children: "Tools" }), _jsx(Button, { variant: 'outline', mr: 3, onClick: closeDrawer, style: { width: '91%', margin: '2%' }, children: "Statistics" })] }), _jsx(DrawerHeader, { className: 'border-top-bright b-color-dark-1', borderTopWidth: '2px', children: _jsx("span", { className: 'flex f-dir-row j-center white', children: "STRATEGIZE" }) }), _jsxs(DrawerFooter, { className: 'b-color-dark-1', children: [_jsx(Button, { colorScheme: 'purple', mr: 3, onClick: () => navigator('/documentation'), children: "Docs" }), _jsx(Button, { colorScheme: 'purple', mr: 3, children: "Stuff" }), _jsx(Button, { colorScheme: 'purple', mr: 3, children: "More" })] })] })] }) }));
}
