import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonForm from '../../buttons/ButtonForm/ButtonForm';
import { Spinner } from '@chakra-ui/react';
export default function LoginForm({ formData, onFormUpdated, onFormSubmitted, isLoading }) {
    const [formValid, setFormValid] = useState(false);
    const { name, email, password, confirmPassword } = formData;
    const [validFields, setValidFields] = useState({
        condition1: false,
        condition2: false,
        condition3: false,
        condition4: false
    });
    const { condition1, condition2, condition3, condition4 } = validFields;
    useEffect(() => {
        // if(
        //     name.length > 3 &&
        //     email.includes('@') && email.includes(`.`) && email.length > 4 &&
        //     password === confirmPassword && password.length >= 6
        // )
        setValidFields({
            condition1: name.length > 3,
            condition2: email.includes('@') && email.includes(`.`) && email.length > 4,
            condition3: password.length >= 6,
            condition4: password === confirmPassword && password.length >= 6
        });
    }, [name, email, password, confirmPassword, formData, onFormSubmitted]);
    useEffect(() => {
        if (condition1 && condition2 && condition3 && condition4) {
            setFormValid(true);
        }
        else {
            setFormValid(false);
        }
    }, [condition1, condition2, condition3, condition4]);
    return (_jsxs("form", { className: "p3 m3 jt-center j-center flex f-dir-col", onSubmit: (e) => onFormSubmitted(e), children: [_jsx("label", { className: `p2 m2 PE-input-${condition1 ? 'valid' : 'normal'}`, htmlFor: "name", children: _jsx("input", { className: "p1 m1 form-input font-2 ", type: "text", placeholder: "Full Name", id: "name", name: "name", value: name, onChange: (e) => { onFormUpdated(e); } }) }), _jsx("label", { className: `p2 m2 PE-input-${condition2 ? 'valid' : 'normal'}`, htmlFor: "email", children: _jsx("input", { className: "p1 m1 form-input font-2", type: "email", placeholder: "Email", id: "email", name: "email", value: email, onChange: (e) => { onFormUpdated(e); } }) }), _jsx("label", { className: `p2 m2 PE-input-${condition3 ? 'valid' : 'normal'}`, htmlFor: "password", children: _jsx("input", { className: "p1 m1 form-input font-2", type: "password", placeholder: "Password", id: "password", name: "password", value: password, onChange: (e) => { onFormUpdated(e); } }) }), _jsx("label", { className: `p2 m2 PE-input-${condition4 ? 'valid' : 'normal'}`, htmlFor: "confirmPassword", children: _jsx("input", { className: "p1 m1 form-input font-2", type: "password", placeholder: "Confirm Password", id: "confirmPassword", name: "confirmPassword", value: confirmPassword, onChange: (e) => { onFormUpdated(e); } }) }), _jsxs("div", { className: "p2 m2", children: [_jsx(ButtonForm, { additionalStyles: 'font-1 s2', text: 'Signup', disabled: !formValid || isLoading }), _jsxs("h4", { className: 's0 white font-1', children: ["Already a user? ", _jsx(Link, { to: '/login', style: { color: '#22aaff' }, children: "Sign In" })] })] }), _jsx("div", { className: "p2 m2", children: _jsx(Spinner, { size: "xl", color: "aqua", hidden: !isLoading }) })] }));
}
