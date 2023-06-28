import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export default function Button_S2({ children, className, onClick, type, disabled, style }) {
    return (_jsx(_Fragment, { children: _jsx("button", { className: `btn-base ${disabled ? 'btn-style-disabled' : 'btn-style-1'} font-9 ${className}`, onClick: onClick, type: type, disabled: disabled, style: style, children: children }) }));
}
