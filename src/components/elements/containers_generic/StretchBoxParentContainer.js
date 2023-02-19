import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StretchBoxParentContainer({ title, children, className }) {
    return (_jsxs("section", { className: `stretch-box-generic-1 j-center jt-center f-wrap f-dir-col ${className}`, children: [_jsx("h2", { className: "jt-center pt7 mt7 pb7 mb7 font-1 s3", children: title }), _jsxs("div", { className: "flex f-dir-row j-even jt-center f-wrap", children: [" ", children && children] })] }));
}
