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
    // if (isLoading){
    //   return <div>
    //     LOADING........
    //   </div>
    // }
    return (_jsxs("main", { children: [_jsxs("div", { className: "landing-box b-img-0 white p7", children: [_jsx(MultiLinkBox_LoginPage, {}), _jsx("section", { className: "PE-top-border-circles p6 m6", children: _jsxs("div", { className: "flex f-dir-col jt-center j-center", children: [_jsx("h2", { className: "font-2 s3", children: "Join Us" }), _jsx(LoginForm, { formData: formData, onFormUpdated: onFormUpdated, onFormSubmitted: onFormSubmitted, isLoading: isLoading })] }) })] }), _jsx(ScrollBoxParentContainer_LoginPage, {}), _jsxs(StretchBoxParentContainer, { title: 'Unleashing Your Potential', className: 'b-color-white', children: [_jsxs(StretchBox, { children: [_jsx("div", { children: _jsx(ChartLine, { style: { minHeight: '22vh' }, title: 'Track Your Progress' }) }), _jsxs("p", { className: "font-3", children: ["Stay on top of your goals with real-time progress tracking ", _jsx("br", {}), "Monitor your progress and take action to stay on track"] }), _jsx(Button_S1, { children: " Learn More " })] }), _jsxs(StretchBox, { children: [_jsx("div", { children: _jsx(ChartBar, { style: { minHeight: '22vh' }, title: 'Identify Patterns' }) }), _jsxs("p", { className: "font-3", children: ["Discover trends and optimize your workflow with pattern recognition ", _jsx("br", {}), "Unlock hidden insights with powerful pattern identification tools"] }), _jsx(Button_S1, { children: " Learn More " })] }), _jsxs(StretchBox, { children: [_jsx("div", { children: _jsx(ChartPie, { style: { minHeight: '24vh' }, title: 'Gain Valuable Insights' }) }), _jsxs("p", { className: "font-3", children: ["Get actionable insights to boost your productivity and performance ", _jsx("br", {}), "Empower your decision-making with data-driven insights and analytics"] }), _jsx(Button_S1, { children: " Learn More " })] })] }), _jsxs(StretchBoxParentContainer, { title: 'Maximize Your Efficiency', className: 'b-color-dark-1 white', children: [_jsxs(StretchBox, { children: [_jsx("img", { src: "sb5.jpg", alt: "img", className: "spread-images" }), _jsx("p", { className: "font-3", children: "Stay Organized: Our tools help you stay organized and focused, so you can get more done in less time" }), _jsx(Button_S1, { className: 'b-color-dark-2', children: " Learn More " })] }), _jsxs(StretchBox, { children: [_jsx("img", { src: "sb6.jpg", alt: "img", className: "spread-images" }), _jsx("p", { className: "font-3", children: "Optimize Performance: With performance tracking and analytics, you can identify ways to improve your workflow and maximize your productivity." }), _jsx(Button_S1, { className: 'b-color-dark-2', children: " Learn More " })] })] }), _jsx("div", {}), _jsxs(StretchBoxParentContainer, { className: 'white b-img-2', children: [_jsx("h2", { className: "white s4 font-3", children: " Focus On The Important Things " }), _jsx(StretchBox, { children: _jsxs("p", { className: "font-3 s2", children: ["Strategize is designed to help you prioritize and focus on the most important tasks and goals, so you can achieve your objectives efficiently and effectively, removing any \"noise\" and distractions. ", _jsx("br", {}), "With a range of features that enable detailed planning, tracking progress, and gaining valuable insights, Strategize empowers you to streamline your workflow and stay on track towards success."] }) })] }), _jsx(MultiLinkBox_LoginPage, { className: 'p5 m5' }), _jsx(Footer_Homepage, { className: 'stretch-box-generic-1 footer-homepage' })] }));
}
export default Signup;
