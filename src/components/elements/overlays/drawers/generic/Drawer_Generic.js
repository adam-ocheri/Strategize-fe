import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Button, useDisclosure, } from '@chakra-ui/react';
import { useState } from 'react';
export default function Drawer_Generic() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = useState('right');
    return (_jsxs(_Fragment, { children: [_jsx(Button, { colorScheme: 'blue', onClick: onOpen, children: "Open" }), _jsxs(Drawer, { placement: 'bottom', onClose: onClose, isOpen: isOpen, children: [_jsx(DrawerOverlay, {}), _jsxs(DrawerContent, { children: [_jsx(DrawerHeader, { borderBottomWidth: '1px', children: "Basic Drawer" }), _jsxs(DrawerBody, { children: [_jsx("p", { children: "Some contents..." }), _jsx("p", { children: "Some contents..." }), _jsx("p", { children: "Some contents..." })] })] })] })] }));
}
