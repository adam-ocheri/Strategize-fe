import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, } from '@chakra-ui/react';
export default function Accordion_Generic({ title, children }) {
    return (_jsx(Accordion, { defaultIndex: [0], allowMultiple: true, children: _jsxs(AccordionItem, { children: [_jsx("h2", { children: _jsxs(AccordionButton, { children: [_jsx(Box, { as: "span", flex: '1', textAlign: 'left', children: title }), _jsx(AccordionIcon, {})] }) }), _jsx(AccordionPanel, { pb: 4, children: children })] }) }));
}
