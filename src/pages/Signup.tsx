import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { register, reset, User } from "src/app/state_management/user/authSlice";
import '../css/main.css'
import ScrollFadeGeneric from "src/components/layout/ScrollFadeGeneric";
import ScrollFadeMulti from "src/components/layout/ScrollFadeMulti";
import ChartBar from "src/components/charts/ChartBar";
import ButtonForm from "src/components/elements/buttons/ButtonForm";
import LoginForm from "src/components/elements/forms/LoginForm";
import ScrollBox_LoginPage from "src/components/elements/containers/ScrollBox_LoginPage";
import MultiLinkBox_LoginPage from "src/components/elements/containers/MultiLinkBox_LoginPage";


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
      <MultiLinkBox_LoginPage/>
      <section className="PE-top-border-circles p6 m6">
        <div className="flex f-dir-col jt-center j-center">
          <h2 className="font-2 s3">Join Us</h2>
          <LoginForm formData={formData} onFormUpdated={onFormUpdated} onFormSubmitted={onFormSubmitted} />
        </div>
        <ScrollBox_LoginPage/>
      </section>
      {/* MIGRATE ----------------------------------------------------------------------------------------------*/}
      <section className="stretch-box j-center jt-center f-wrap f-dir-col">
        <h2 className="jt-center pt7 mt7 font-1 s3">DO stuff !!!</h2>
        <div className="flex f-dir-row j-center jt-center f-wrap "> {/*--------- mt7 pt7 mb7 pb7*/}
          <div className="border-bright border-top-w0 border-top-solid m5 p5 f-basis-2 box-sizing-border">
            <img src="b3.jpg" alt="img" height={'300px'} width={'300px'}/>
            <p>
              This is the slenderest way of looking! <br/> Perception re-evaluated
            </p>
          </div>
          <div className="border-bright border-top-w0 border-top-solid m5 p5 f-basis-2 box-sizing-border">
            <img src="b3.jpg" alt="img" height={'300px'} width={'300px'}/>
            <p>
              Purpose is destruction. <br/> Destruction is purpose
            </p>
          </div>
        </div>
      </section>
      <section className="p6 m6 flex j-center jt-center">
        <img src="b3.jpg" alt="img" height={'300px'} width={'300px'}/>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aspernatur odit ratione veritatis tempore quasi! 
          Fugiat exercitationem animi reiciendis harum iusto saepe, magni voluptas perspiciatis consequuntur necessitatibus 
          maiores quis pariatur.
        </p>
      </section>
    </main>
  )
}

export default Signup;