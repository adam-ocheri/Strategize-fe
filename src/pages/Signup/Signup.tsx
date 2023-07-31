import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { register, reset, User } from "src/app/state_management/user/authSlice";
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
  })

  const {name, email, password, confirmPassword} = formData;

  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const {user, isError, isSuccess, isLoading, message} : User = useAppSelector((state : RootState) => state.auth);

  useEffect(() => {
    if (isError)
    {
      console.log(message);
      dispatch(reset());
    }
    if (user)
    {
      navigator('/');
    }
  },[user, isError, message, dispatch, navigator])

  const onFormUpdated = (e : Event | any) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onFormSubmitted = (e: Event | any) => {
    e.preventDefault();
    if(password !== confirmPassword)
    {
      throw new Error ("Passwords don't match!");
    }
    else{
      console.log("trying to register...");
      console.log(formData);
      dispatch(register({name: name, email: email, password: password}))
    }
  }
 
  return (
    <main>
      <div className="landing-box b-img-0 white p7">
        <MultiLinkBox_LoginPage/>
        <section className="PE-top-border-circles p6 m6">
          <div className="flex f-dir-col jt-center j-center">
            <h2 className="font-2 s3">Join Us</h2>
            <LoginForm formData={formData} onFormUpdated={onFormUpdated} onFormSubmitted={onFormSubmitted} isLoading={isLoading}/>
          </div>
          
        </section>
      </div>
      <ScrollBoxParentContainer_LoginPage/>
      {/* <StretchBoxParentContainer_LoginPage/> */}

      <StretchBoxParentContainer title={'Unleashing Your Potential'} className='b-color-white'>  
        <StretchBox >
          {/* <img src="b2.jpg" alt="img" height={'400px'} width={'400px'}/> */}
          <div >
            <ChartLine style={{minHeight: '22vh'}} title={'Track Your Progress'}/>
          </div>
            <p className="font-3">
              Stay on top of your goals with real-time progress tracking <br/>
              Monitor your progress and take action to stay on track
            </p>
            <Button_S1 > Learn More </Button_S1>
        </StretchBox>
        <StretchBox >
          {/* <img src="b2.jpg" alt="img" height={'400px'} width={'400px'}/> */}
          <div >
            <ChartBar style={{minHeight: '22vh'}} title={'Identify Patterns'}/>
          </div>
            <p className="font-3">
              Discover trends and optimize your workflow with pattern recognition <br/>
              Unlock hidden insights with powerful pattern identification tools
            </p>
            <Button_S1 > Learn More </Button_S1>
        </StretchBox>
        <StretchBox>
          {/* <img src="b3.jpg" alt="img" height={'400px'} width={'400px'}/> */}
            <div >
              <ChartPie style={{minHeight: '24vh'}} title={'Gain Valuable Insights'} />
            </div>
            
            <p className="font-3">
              Get actionable insights to boost your productivity and performance <br/>
              Empower your decision-making with data-driven insights and analytics
            </p>
            <Button_S1 > Learn More </Button_S1>
        </StretchBox>
      </StretchBoxParentContainer>
      <StretchBoxParentContainer title={'Maximize Your Efficiency'} className='b-color-dark-1 white'>
        <StretchBox>
          <div style={{display:'flex', justifyContent:'center', margin: '4%'}}>
            <img src="sb5.jpg" alt="img" className="spread-images"/>
          </div>
            <p className="font-3">
              <strong>Stay Organized:</strong> Our tools help you stay organized and focused, so you can get more done in less time
            </p>
            <Button_S1 className='b-color-dark-2'> Learn More </Button_S1>
        </StretchBox>
        <StretchBox>
          <div style={{display:'flex', justifyContent:'center', margin: '4%'}}>
            <img src="sb6.jpg" alt="img" className="spread-images"/>
          </div>
            <p className="font-3">
              <strong>Optimize Performance:</strong> With performance tracking and analytics, you can identify ways to improve your workflow and maximize your productivity.
            </p>
            <Button_S1 className='b-color-dark-2'> Learn More </Button_S1>
        </StretchBox>
      </StretchBoxParentContainer>  
      {/*MIGRATE 2----------------------------------------------------------------------------------------------------*/}
      <StretchBoxParentContainer className='white b-img-2'>
        <h2 className="white s4 font-3"> Focus On The Important Things </h2>
        <StretchBox>
          <p className="font-3 s2">
            Strategize is designed to help you prioritize and focus on the most important tasks and goals, so you can achieve your objectives efficiently 
            and effectively, removing any "noise" and distractions. <br/>
            With a range of features that enable detailed planning, tracking progress, and gaining valuable insights, Strategize 
            empowers you to streamline your workflow and stay on track towards success.
          </p>
        </StretchBox>
      </StretchBoxParentContainer>
      
      <div style={{background: 'black'}}>
        <MultiLinkBox_LoginPage className='p5 m5'/>
      </div>

      {/* <StretchBox className='white b-img-2'>
      </StretchBox> */}
      <Footer_Homepage className='stretch-box-generic-1 footer-homepage'/>
    </main>
  )
}

export default Signup;