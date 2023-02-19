import { jsx as _jsx } from "react/jsx-runtime";
export default function StretchBox({ className, children }) {
    return (_jsx("div", { className: `border-bright border-top-w0 border-top-solid m5 p5 box-sizing-border ${className}`, children: _jsx("div", { className: 'p7', children: children && children }) }));
}
