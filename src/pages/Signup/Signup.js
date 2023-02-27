import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { register, reset } from "src/app/state_management/user/authSlice";
import LoginForm from "src/components/elements/forms/LoginForm/LoginForm";
import ScrollBoxParentContainer_LoginPage from "src/components/elements/containers/ScrollBoxParentContainer_LoginPage/ScrollBoxParentContainer_LoginPage";
import MultiLinkBox_LoginPage from "src/components/elements/containers/MultiLinkBox_LoginPage/MultiLinkBox_LoginPage";
import StretchBoxParentContainer from "src/components/elements/containers_generic/StretchBoxParentContainer/StretchBoxParentContainer";
import StretchBox from "src/components/elements/containers_generic/StretchBox/StretchBox";
import Button_S1 from "src/components/elements/buttons/Button_S1/Button_S1";
import Footer_Homepage from "src/components/layout/footer_homepage/Footer_Homepage";
import ChartPie from "src/components/charts/ChartPie/ChartPie";
import ChartBar from "src/components/charts/ChartBar/ChartBar";
import ChartLine from "src/components/charts/ChartLine/ChartLine";
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
    return (_jsxs("main", { children: [_jsxs("div", { className: "landing-box b-img-0 white p7", children: [_jsx(MultiLinkBox_LoginPage, {}), _jsx("section", { className: "PE-top-border-circles p6 m6", children: _jsxs("div", { className: "flex f-dir-col jt-center j-center", children: [_jsx("h2", { className: "font-2 s3", children: "Join Us" }), _jsx(LoginForm, { formData: formData, onFormUpdated: onFormUpdated, onFormSubmitted: onFormSubmitted })] }) })] }), _jsx(ScrollBoxParentContainer_LoginPage, {}), _jsxs(StretchBoxParentContainer, { title: 'Unleashing Your Potential', className: 'b-color-white', children: [_jsxs(StretchBox, { children: [_jsx("div", { style: { minHeight: '19vh' }, children: _jsx(ChartLine, {}) }), _jsxs("p", { className: "font-3", children: ["Purpose Is Destruction. ", _jsx("br", {}), "Destruction is purpose."] }), _jsx(Button_S1, { children: " Learn More " })] }), _jsxs(StretchBox, { children: [_jsx("div", { style: { minHeight: '19vh' }, children: _jsx(ChartBar, {}) }), _jsxs("p", { className: "font-3", children: ["Purpose Is Destruction. ", _jsx("br", {}), "Destruction is purpose."] }), _jsx(Button_S1, { children: " Learn More " })] }), _jsxs(StretchBox, { children: [_jsx("div", { style: { minHeight: '34vh' }, children: _jsx(ChartPie, {}) }), _jsx("p", { className: "font-3", children: "Triumph in Power" }), _jsx(Button_S1, { children: " Learn More " })] })] }), _jsxs(StretchBoxParentContainer, { title: 'And Some Other Stuff', className: 'b-color-dark-1 white', children: [_jsxs(StretchBox, { children: [_jsx("img", { src: "b3.jpg", alt: "img", height: '400px', width: '400px' }), _jsx("p", { className: "font-3", children: "Triumph in Power" }), _jsx(Button_S1, { className: 'b-color-dark-2', children: " Learn More " })] }), _jsxs(StretchBox, { children: [_jsx("img", { src: "b2.jpg", alt: "img", height: '400px', width: '400px' }), _jsxs("p", { className: "font-3", children: ["Purpose Is Destruction. ", _jsx("br", {}), "Destruction is purpose."] }), _jsx(Button_S1, { className: 'b-color-dark-2', children: " Learn More " })] })] }), _jsx("div", {}), _jsxs(StretchBoxParentContainer, { className: 'white b-img-1', children: [_jsx("h2", { className: "white s4 font-3", children: " Smelly Stuff Goes " }), _jsx(StretchBox, { children: _jsx("p", { className: "font-3", children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aspernatur odit ratione veritatis tempore quasi! Fugiat exercitationem animi reiciendis harum iusto saepe, magni voluptas perspiciatis consequuntur necessitatibus maiores quis pariatur." }) }), _jsx(Button_S1, { children: " Learn More " })] }), _jsx(MultiLinkBox_LoginPage, { className: 'p5 m5' }), _jsx(Footer_Homepage, { className: 'stretch-box-generic-1 footer-homepage' })] }));
}
export default Signup;
