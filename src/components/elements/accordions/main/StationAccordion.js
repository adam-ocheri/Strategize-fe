import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
export default function StationAccordion({ title, children }) {
    return (_jsx(Accordion, { allowMultiple: true, defaultIndex: [0], margin: '8px', backgroundColor: '#211f32', borderBottomRadius: '15px', children: _jsxs(AccordionItem, { style: { borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', borderBottomColor: '#f7aa02' }, children: [_jsx("h2", { children: _jsxs(AccordionButton, { className: 'card-sub-child orange', border: '2px solid #fab50066', _hover: { border: '2px solid #fab500' }, children: [_jsx(Box, { as: "span", flex: '1', textAlign: 'left', className: 'card-sub-child-2 s2', borderRadius: '6px', padding: '4px', color: '#f7aa02', children: title }), _jsx(AccordionIcon, { margin: '4px' })] }) }), _jsx(AccordionPanel, { children: children })] }) }));
}
