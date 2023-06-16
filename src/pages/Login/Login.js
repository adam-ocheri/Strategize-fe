import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { login, reset } from "src/app/state_management/user/authSlice";
import ButtonForm from "src/components/elements/buttons/ButtonForm/ButtonForm";
import { Spinner } from '@chakra-ui/react';
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isError, isSuccess, isLoading, message } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (isError) {
            console.log(message);
            dispatch(reset());
        }
        if (user) {
            navigator('/');
        }
    }, [user, isError, message, dispatch, navigator]);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!password || !email) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(login({ email: email, password: password }));
        }
    };
    return (_jsx("div", { className: "p7 b-img-0", children: _jsx("div", { className: "mt7", children: _jsxs("section", { className: "m7 p5 j-center jt-center", children: [_jsx("h2", { className: "white font-1 s3", children: "LOGIN" }), _jsxs("form", { onSubmit: (e) => onFormSubmitted(e), className: "p5 flex f-dir-col j-center jt-center", children: [_jsx("input", { className: "form-input", type: "email", placeholder: "Email", id: "email", name: "email", value: email, onChange: (e) => { onFormUpdated(e); } }), _jsx("input", { className: "form-input", type: "password", placeholder: "Password", id: "password", name: "password", value: password, onChange: (e) => { onFormUpdated(e); } }), _jsx(ButtonForm, { additionalStyles: 'white s2', type: 'submit', text: 'Login', disabled: isLoading })] }), _jsx(Spinner, { size: "xl", color: "aqua", hidden: !isLoading })] }) }) }));
}
export default Login;
