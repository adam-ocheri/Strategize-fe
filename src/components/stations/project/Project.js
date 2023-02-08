import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
function Project({}) {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { activeProject } = useAppSelector((state) => state.project);
    const { user } = useAppSelector((state) => state.auth);
    return (_jsxs("div", { children: [_jsx("section", { children: _jsxs("h2", { children: [" ", activeProject.projectName, " "] }) }), _jsx("section", { children: _jsx("h3", { children: " Long Term Goals " }) }), _jsx("section", { children: _jsxs("p", { children: [_jsx("button", { children: " Add New " }), _jsx("button", { children: " Edit " }), _jsx("button", { children: " Delete " })] }) })] }));
}
;
export default Project;
