import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { register, reset } from "src/app/state_management/user/authSlice";
import '../css/main.css';
function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { name, email, password, confirmPassword } = formData;
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
        if (password !== confirmPassword) {
            throw new Error("Passwords don't match!");
        }
        else {
            console.log("trying to register...");
            console.log(formData);
            dispatch(register({ name: name, email: email, password: password }));
        }
    };
    if (isLoading) {
        return _jsx("div", { children: "LOADING........" });
    }
    return (_jsxs(_Fragment, { children: [_jsxs("section", { children: [_jsx("div", { className: "centered ", children: _jsx("h1", { className: "font-3 s5 p4 m4 PE-top-border-circles", children: "Strategize" }) }), _jsx("article", { className: "p2 m2", children: _jsxs("div", { className: "flex f-wrap p1 m1 j-center j-even", children: [_jsxs("article", { className: "p1 m1 f-basis-3 box-sizing-border story-box", children: [_jsx("h3", { className: "font-5 s2 under-title", children: "Plan" }), _jsx("p", { children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis, sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis, sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio." })] }), _jsxs("article", { className: "p1 m1 f-basis-3 box-sizing-border story-box", children: [_jsx("h3", { className: "font-5 s2 under-title", children: "Create" }), _jsx("p", { children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis, sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis, sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio." })] }), _jsxs("article", { className: "p1 m1 f-basis-3 box-sizing-border story-box ", children: [_jsx("h3", { className: "font-5 s2 under-title", children: "Excel" }), _jsx("p", { children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis, sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis, sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio." })] })] }) })] }), _jsx("section", { className: "PE-top-border-circles p6 m6", children: _jsxs("div", { className: "flex f-dir-col jt-center j-center", children: [_jsx("h2", { className: "font-2 s3", children: "Join Us" }), _jsxs("form", { className: "p3 m3 jt-center j-center flex f-dir-col", onSubmit: (e) => onFormSubmitted(e), children: [_jsx("label", { className: "p2 m2 PE-input-normal", htmlFor: "name", children: _jsx("input", { className: "form-input font-2 ", type: "text", placeholder: "Full Name", id: "name", name: "name", value: name, onChange: (e) => { onFormUpdated(e); } }) }), _jsx("label", { className: "p2 m2 PE-input-normal", htmlFor: "email", children: _jsx("input", { className: "form-input font-2", type: "email", placeholder: "Email", id: "email", name: "email", value: email, onChange: (e) => { onFormUpdated(e); } }) }), _jsx("label", { className: "p2 m2 PE-input-normal", htmlFor: "password", children: _jsx("input", { className: "form-input font-2", type: "password", placeholder: "Password", id: "password", name: "password", value: password, onChange: (e) => { onFormUpdated(e); } }) }), _jsx("label", { className: "p2 m2 PE-input-normal", htmlFor: "confirmPassword", children: _jsx("input", { className: "form-input font-2", type: "password", placeholder: "Confirm Password", id: "confirmPassword", name: "confirmPassword", value: confirmPassword, onChange: (e) => { onFormUpdated(e); } }) }), _jsx("div", { className: "p2 m2", children: _jsx("button", { className: "p2 m2 font-5", type: 'submit', children: "Signup" }) })] })] }) })] }));
}
export default Signup;
