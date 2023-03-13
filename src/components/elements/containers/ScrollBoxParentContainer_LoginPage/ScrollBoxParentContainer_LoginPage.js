import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ScrollBox_LoginPage from '../ScrollBox_LoginPage/ScrollBox_LoginPage';
export default function ScrollBoxParentContainer_LoginPage() {
    const text1 = `With Strategize, individuals and teams can streamline their workflows and achieve more in less time.
  Our powerful organizational tools enable you to plan and prioritize your work, so you can focus on what matters most.`;
    const text2 = `Communication is key to any successful team, and Strategize makes it easy to collaborate and share information. 
  Whether you're working remotely or in the same office, our app keeps everyone on the same page and ensures that nothing falls through the cracks.`;
    const text3 = `Empower yourself and your team with Strategize's comprehensive task management features. Our app enables you to create detailed to-do 
  lists, assign tasks to team members, and track progress towards your goals.`;
    const text4 = `Maximize your productivity and efficiency with Strategize's powerful analytics tools. Our app provides detailed usage data and visualized data charts, 
  allowing you to track your progress over time and optimize your workflow.`;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "parent-scroll-container p3 m3", children: [_jsx("div", { className: "j-center flex p6 m6 jt-center", children: _jsx("h2", { className: "white font-3 s4", children: "Empowering Individuals and Teams" }) }), _jsx(ScrollBox_LoginPage, { title: 'Maximize Your Efficiency: Master Your Workflow', imgDir: 'sb4.jpg', text: text1 }), _jsx(ScrollBox_LoginPage, { title: 'Unlock the Power of Collaboration with Seamless Communication', imgDir: 'sb3.jpg', text: text2 }), _jsx(ScrollBox_LoginPage, { title: 'Achieve Your Goals with Advanced Task Management Tools', imgDir: 'sb2.jpg', text: text3 }), _jsx(ScrollBox_LoginPage, { title: 'Transform Your Productivity: Insights and Analytics for Success', imgDir: 'sb1.jpg', text: text4 })] }) }));
}
