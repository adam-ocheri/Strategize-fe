import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import ScrollFadeGeneric from 'src/components/elements/containers_generic/ScrollFade/ScrollFadeGeneric';
export default function ScrollBox_LoginPage({ title, imgDir, text }) {
    const [isVisible, setIsVisible] = useState(false);
    // const elementRef = useRef(children);
    const onChange = (isVisible) => {
        setIsVisible(isVisible);
        console.log('Checking visibility:');
        console.log(isVisible);
    };
    return (_jsx(VisibilitySensor, { onChange: onChange, partialVisibility: true, children: _jsxs("section", { className: `p7 m7 flex ${isVisible ? 'visible' : 'hidden'}`, children: [" ", _jsxs(ScrollFadeGeneric, { children: [_jsx("h2", { className: 'mb7 white font-1 s2', children: title }), _jsxs("div", { className: '', children: [_jsx("img", { src: imgDir, alt: 'logo', className: 'side-images' }), _jsx("p", { className: "font-3 s1", children: text })] })] })] }) }));
}
