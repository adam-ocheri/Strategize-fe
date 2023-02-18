import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { register, reset } from "src/app/state_management/user/authSlice";
import '../css/main.css';
import LoginForm from "src/components/elements/forms/LoginForm";
import ScrollBox_LoginPage from "src/components/elements/containers/ScrollBox_LoginPage";
import MultiLinkBox_LoginPage from "src/components/elements/containers/MultiLinkBox_LoginPage";
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
    return (_jsxs("main", { children: [_jsx(MultiLinkBox_LoginPage, {}), _jsxs("section", { className: "PE-top-border-circles p6 m6", children: [_jsxs("div", { className: "flex f-dir-col jt-center j-center", children: [_jsx("h2", { className: "font-2 s3", children: "Join Us" }), _jsx(LoginForm, { formData: formData, onFormUpdated: onFormUpdated, onFormSubmitted: onFormSubmitted })] }), _jsx(ScrollBox_LoginPage, {})] }), _jsxs("section", { className: "stretch-box j-center jt-center f-wrap f-dir-col", children: [_jsx("h2", { className: "jt-center pt7 mt7 font-1 s3", children: "DO stuff !!!" }), _jsxs("div", { className: "flex f-dir-row j-center jt-center f-wrap ", children: [" ", _jsxs("div", { className: "border-bright border-top-w0 border-top-solid m5 p5 f-basis-2 box-sizing-border", children: [_jsx("img", { src: "b3.jpg", alt: "img", height: '300px', width: '300px' }), _jsxs("p", { children: ["This is the slenderest way of looking! ", _jsx("br", {}), " Perception re-evaluated"] })] }), _jsxs("div", { className: "border-bright border-top-w0 border-top-solid m5 p5 f-basis-2 box-sizing-border", children: [_jsx("img", { src: "b3.jpg", alt: "img", height: '300px', width: '300px' }), _jsxs("p", { children: ["Purpose is destruction. ", _jsx("br", {}), " Destruction is purpose"] })] })] })] }), _jsxs("section", { className: "p6 m6 flex j-center jt-center", children: [_jsx("img", { src: "b3.jpg", alt: "img", height: '300px', width: '300px' }), _jsx("p", { children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aspernatur odit ratione veritatis tempore quasi! Fugiat exercitationem animi reiciendis harum iusto saepe, magni voluptas perspiciatis consequuntur necessitatibus maiores quis pariatur." })] })] }));
}
export default Signup;
