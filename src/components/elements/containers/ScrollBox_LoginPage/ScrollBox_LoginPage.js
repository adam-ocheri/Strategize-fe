import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import ScrollFadeGeneric from 'src/components/elements/containers_generic/ScrollFade/ScrollFadeGeneric';
export default function ScrollBox_LoginPage() {
    const [isVisible, setIsVisible] = useState(false);
    // const elementRef = useRef(children);
    const onChange = (isVisible) => {
        setIsVisible(isVisible);
        console.log('Checking visibility:');
        console.log(isVisible);
    };
    return (_jsx(VisibilitySensor, { onChange: onChange, partialVisibility: true, children: _jsxs("section", { className: `  ${isVisible ? 'visible' : 'hidden'}`, children: [" ", _jsx(ScrollFadeGeneric, { children: _jsxs("div", { children: [_jsx("img", { src: 'b4.jpg', alt: 'logo', height: '200px', width: '350px' }), _jsx("p", { className: "font-3", children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis," })] }) })] }) }));
}
