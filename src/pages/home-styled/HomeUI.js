import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { logout, reset } from 'src/app/state_management/user/authSlice';
import { createProject, getAllProjects, getProject, updateProject } from 'src/app/state_management/project/projectSlice';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';
import { Card, CardHeader, CardBody, Center, Divider, Input } from '@chakra-ui/react';
function HomeUI() {
    //! To be migrated!! ------------------------------------------------------------------------------------------------------------------------
    const [formData, setFormData] = useState({
        projectName: '',
    });
    const { projectName } = formData;
    const { data, allUserTasks } = useAppSelector((state) => state.project);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (!projectName) {
            throw new Error("Please enter all fields!");
        }
        else {
            console.log("trying to login...");
            console.log(formData);
            dispatch(createProject({ projectName: projectName, owner: user._id, token: user.token }));
        }
    };
    const onLogoutClicked = async () => {
        await dispatch(logout());
        dispatch(reset());
        navigator('/register');
    };
    const onUpdateProjectName = async (e, id) => {
        console.log(id);
        await dispatch(updateProject({ projectName: projectName, id: id, token: user.token }));
    };
    const manageSelectedStation = async (e, id) => {
        console.log("trying to EDIT PROJECT...........");
        console.log(id);
        await dispatch(getProject({ id: id, token: user.token }));
        navigator('/project');
    };
    //! Immigrants Border -----------------------------------------------------------------------------------------------------------------------
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            navigator('/register');
        }
        else {
            dispatch(getAllProjects({ owner: user._id, token: user.token }));
        }
    }, [user, navigator]);
    return (_jsxs("main", { className: 'p7', style: { minHeight: '100vh', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#010111', width: '100%' }, children: [_jsxs(Card, { className: 'card-main quad-box-shadow-4 jt-center', background: 'blackAlpha.400', style: { width: '100%', borderLeft: '2px dashed aqua', borderRight: '2px dashed aqua', borderBottom: '2px dashed aqua' }, children: ["  ", _jsx(CardBody, { className: 'b-color-dark-1 p4 quad-box-shadow-1', children: _jsx(CardHeader, { className: 'b-color-dark-2 border-r2 p5', children: _jsxs("h1", { className: ' m3 font-3 white s3', children: ["Welcome back, ", _jsx("span", { className: 'orange font-5', children: "strategizer" })] }) }) })] }), _jsxs(Card, { className: 'card-main quad-box-shadow-4', background: 'blackAlpha.400', style: { borderLeft: '2px dashed aqua', borderRight: '2px dashed aqua', borderBottom: '2px dashed aqua' }, children: ["  ", _jsxs(CardBody, { className: 'b-color-dark-1 p4 quad-box-shadow-1', children: [_jsx(CardHeader, { className: 'b-color-dark-2 border-r2 p5', children: _jsxs("section", { className: 'flex f-dir-row j-between p5', children: [_jsxs("div", { className: ' font-5 white m2', children: [_jsxs("p", { className: 'p1 m1', children: [_jsx("strong", { className: 'font-6 white p2 m2', children: "Name : " }), " ", _jsx("span", { className: 'p2 m2', children: user?.name })] }), _jsxs("p", { className: 'p1 m1', children: [_jsx("strong", { className: 'font-6 white p2 m2', children: "Email : " }), " ", _jsx("span", { className: 'p2 m2', children: user?.email })] }), _jsx("p", {})] }), _jsx("div", { className: 'm2', children: _jsx(Center, { height: '130px', children: _jsx(Divider, { orientation: 'vertical' }) }) }), _jsxs("div", { className: 'centered flex f-dir-col m2', children: [_jsx("h2", { className: 'font-3 s2 orange', children: "Create New Project" }), _jsxs("form", { className: 'form-generic flex f-dir-row f-wrap j-center', onSubmit: (e) => onFormSubmitted(e), children: [_jsx(Input, { className: "form-generic-input font-1", type: "text", placeholder: "Project Name", id: "projectName", name: "projectName", value: projectName, onChange: (e) => { onFormUpdated(e); } }), _jsx(Button_S2, { type: 'submit', children: "Create" })] })] })] }) }), _jsx("div", { className: 'centered m4', children: _jsx("div", { children: data && user &&
                                        _jsxs(Card, { className: ' p5 m3 quad-box-shadow-1', backgroundColor: '#13122f', style: { borderLeft: '2px solid aqua', borderRight: '2px solid aqua', borderBottom: '2px solid aqua', borderTop: '22px solid aqua' }, children: [_jsx("h4", { className: 's3 p2 m2 font-6 centered', style: { color: '#ffefef' }, children: "Existing Projects" }), data.map((project) => (_jsx(Card, { _hover: { background: '#ffc8a3' }, margin: '0.5', borderTopRadius: '20px', children: _jsxs("article", { style: { width: '50vw' }, className: 'card-sub-child-3', children: [_jsxs("section", { className: 'flex f-dir-col j-even', children: [_jsx("h2", { className: 'font-1 s1 p1 m1 orange ', children: "Project Name :" }), " ", _jsx("h3", { className: 'font-6 s3 p3 m3 white', children: project.projectName })] }), _jsxs("section", { className: 'flex f-dir-col j-even', children: [_jsxs("div", { children: [_jsx("h2", { className: 'font-1 s1 p1 m1 orange', children: "Owner :" }), " ", _jsx("h3", { className: 'font-2 s2 p1 m1 white', children: user.name })] }), _jsx("div", { className: 'flex parent flex-flow-left', children: _jsx(Button_S2, { className: 'p2 m3', onClick: (e) => { manageSelectedStation(e, project._id); }, children: " Manage " }) })] })] }) }, project._id)))] }) }) })] })] })] }));
}
export default HomeUI;
{ /* {
      type UserStatistics {
          usageTracking : {
              current : {
                  todayTotalMinutes : int,
                  todayTotalClicks : int,
                  todayTotalRequests : int,
              }
              history : {
                  totalMinutes : std::vector<std::map<date, int>>,
                  totalClicks : std::vector<std::map<date, int>>,
                  totalRequests : std::vector<std::map<date, int>>,
                  totalDaysSinceRegistered : number,
                  totalDaysWithoutActivitySinceRegistered : number,
                  TotalActivityRatio : () => {return (totalDaysSinceRegistered / totalDaysWithoutActivitySinceRegistered) * 100}
              },

              avgDailyMinutes : number,
              avgDailyInteraction : number,
              avgDailyActivity : number,

              avgWeeklyMinutes : number,
              avgWeeklyInteraction : number,
              avgWeeklyActivity : number
          }

          overdueTracking : {
              current : {
                  weeklyTotalMinutes : std::vector<std::map<date, int>>,,
              }
              history : {
                  totalMinutes : std::vector<std::map<date, int>>,
              },

              avgWeeklyMinutes : number,
              currentWeekOverdueRatio : float () => { return`${( totalMinutes / weeklyTotalMinutes )}`;},
          }

          total[stationType] : number,
          totalCompletedAndArchived[stationType] : number,
          current[stationType]CompletionRatio : float () => { return`${(total[stationType] / totalCompleted[stationType]) * 100.0f} %`;},

          featuresPreferencesTracking : {
              totalNumRequests_FeatureX : number,
              totalNumRequests_FeatureY : number,
              totalNumRequests_FeatureZ : number,
              ...,
              sortedPreferredFeatures : number () => {return [...totalNumRequests_..., ...].sort()}
          }
          
      }

    }
*/
}
