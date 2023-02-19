import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { register, reset, User } from "src/app/state_management/user/authSlice";
import LoginForm from "src/components/elements/forms/LoginForm";
import ScrollBoxParentContainer_LoginPage from "src/components/elements/containers/ScrollBoxParentContainer_LoginPage";
import MultiLinkBox_LoginPage from "src/components/elements/containers/MultiLinkBox_LoginPage";
import StretchBoxParentContainer_LoginPage from "src/components/elements/containers/StretchBoxParentContainer_LoginPage";
import StretchBoxParentContainer from "src/components/elements/containers_generic/StretchBoxParentContainer";
import StretchBox from "src/components/elements/containers_generic/StretchBox";
import Button_S1 from "src/components/elements/buttons/Button_S1";
import Footer_Homepage from "src/components/layout/Footer_Homepage";
import ChartPie from "src/components/charts/ChartPie";
import ChartBar from "src/components/charts/ChartBar";
import ChartLine from "src/components/charts/ChartLine";


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

  if (isLoading){
    return <div>
      LOADING........
    </div>
  }
    
  return (
    <main>
      <div className="landing-box b-img-0 white p7">
        <MultiLinkBox_LoginPage/>
        <section className="PE-top-border-circles p6 m6">
          <div className="flex f-dir-col jt-center j-center">
            <h2 className="font-2 s3">Join Us</h2>
            <LoginForm formData={formData} onFormUpdated={onFormUpdated} onFormSubmitted={onFormSubmitted} />
          </div>
          
        </section>
      </div>
      <ScrollBoxParentContainer_LoginPage/>
      {/* <StretchBoxParentContainer_LoginPage/> */}
      <StretchBoxParentContainer title={'Unleashing Your Potential'} className='b-color-white'>
        
        <StretchBox >
          {/* <img src="b2.jpg" alt="img" height={'400px'} width={'400px'}/> */}
          <div style={{minHeight: '19vh'}}>
            <ChartLine />
          </div>
            <p className="font-3">
              Purpose Is Destruction. <br/>
              Destruction is purpose.
            </p>
            <Button_S1 > Learn More </Button_S1>
        </StretchBox>
        <StretchBox >
          {/* <img src="b2.jpg" alt="img" height={'400px'} width={'400px'}/> */}
          <div style={{minHeight: '19vh'}}>
            <ChartBar />
          </div>
            <p className="font-3">
              Purpose Is Destruction. <br/>
              Destruction is purpose.
            </p>
            <Button_S1 > Learn More </Button_S1>
        </StretchBox>
        <StretchBox>
          {/* <img src="b3.jpg" alt="img" height={'400px'} width={'400px'}/> */}
            <div style={{minHeight: '34vh'}}>
            <ChartPie />
            </div>
            
            <p className="font-3">
              Triumph in Power
            </p>
            <Button_S1 > Learn More </Button_S1>
        </StretchBox>
      </StretchBoxParentContainer>
      <StretchBoxParentContainer title={'And Some Other Stuff'} className='b-color-dark-1 white'>
        <StretchBox>
          <img src="b3.jpg" alt="img" height={'400px'} width={'400px'}/>
            <p className="font-3">
              Triumph in Power
            </p>
            <Button_S1 className='b-color-dark-2'> Learn More </Button_S1>
        </StretchBox>
        <StretchBox>
          <img src="b2.jpg" alt="img" height={'400px'} width={'400px'}/>
            <p className="font-3">
              Purpose Is Destruction. <br/>
              Destruction is purpose.
            </p>
            <Button_S1 className='b-color-dark-2'> Learn More </Button_S1>
        </StretchBox>
      </StretchBoxParentContainer>
      {/*MIGRATE----------------------------------------------------------------------------------------------------*/}
      <section className="p7 m7 flex j-flex-start j-center jt-left">
        <img src="b8.jpg" alt="img" height={'300px'} width={'300px'}/>
        <div className="p3 m3 ">
          <h2 className="white s4 font-3"> Be Part Of An Active Community </h2>
          <p className="font-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aspernatur odit ratione veritatis tempore quasi! 
            Fugiat exercitationem animi reiciendis harum iusto saepe, magni voluptas perspiciatis consequuntur necessitatibus 
            maiores quis pariatur.
          </p>
        </div>
        
      </section>
      {/*MIGRATE 2----------------------------------------------------------------------------------------------------*/}
      <StretchBoxParentContainer className='white b-img-1'>
        <h2 className="white s4 font-3"> Smelly Stuff Goes </h2>
        <StretchBox>
          <p className="font-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aspernatur odit ratione veritatis tempore quasi! 
            Fugiat exercitationem animi reiciendis harum iusto saepe, magni voluptas perspiciatis consequuntur necessitatibus 
            maiores quis pariatur.
          </p>
        </StretchBox>
        <Button_S1> Learn More </Button_S1>
      </StretchBoxParentContainer>
      <MultiLinkBox_LoginPage className='p5 m5'/>
      <Footer_Homepage className='stretch-box-generic-1 footer-homepage'/>
    </main>
  )
}

export default Signup;