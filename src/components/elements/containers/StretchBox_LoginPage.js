import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StretchBox_LoginPage({ imgSrc, text, children }) {
    return (_jsx("div", { className: "border-bright border-top-w0 border-top-solid m5 p5 box-sizing-border", children: _jsxs("div", { className: 'p7', children: [_jsx("img", { src: imgSrc, alt: "img", height: '400px', width: '400px' }), _jsx("p", { className: 'font-3', children: text }), children && children] }) }));
}
