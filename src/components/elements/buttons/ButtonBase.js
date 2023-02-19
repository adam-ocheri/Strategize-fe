import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export default function ButtonBase({ children, className, onClick }) {
    return (_jsx(_Fragment, { children: _jsx("button", { className: `btn-base ${className}`, onClick: onClick, children: children }) }));
}
