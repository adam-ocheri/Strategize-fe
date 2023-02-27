import { jsx as _jsx } from "react/jsx-runtime";
export default function ButtonForm({ text, disabled, additionalStyles }) {
    return (_jsx("button", { className: `btn-base ${disabled ? 'btn-form-disabled' : 'btn-form'} ${additionalStyles} `, disabled: disabled, type: 'submit', children: text }));
}
