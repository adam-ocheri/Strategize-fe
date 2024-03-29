import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { login, reset, User } from "src/app/state_management/user/authSlice";
import ButtonForm from "src/components/elements/buttons/ButtonForm/ButtonForm";
import { Spinner } from '@chakra-ui/react'

function Login() {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  })

  const {email, password } = formData;

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
    if(!password || !email)
    {
      throw new Error ("Please enter all fields!");
    }
    else{
      console.log("trying to login...");
      console.log(formData);
      dispatch(login({email: email, password: password}))
    }
  }

  return (
    <section className="p7 b-img-0" style={{height: '87vh'}}>
      
        <div className="mt7 flex j-center">
          <section className="m7 p5 jt-center" style={{width: '33%'}}>
            <h2 className="white font-1 s3">LOGIN</h2>
            <form onSubmit={(e) => onFormSubmitted(e)} className="p5 flex f-dir-col j-center jt-center" >
              <div className="flex f-dir-col j-center" >
                <input className="form-input" type="email" placeholder="Email" id="email" 
                    name="email" value={email} onChange={(e) => {onFormUpdated(e)}}/>
                <input className="form-input" type="password" placeholder="Password" id="password" 
                    name="password" value={password} onChange={(e) => {onFormUpdated(e)}}/>
                <ButtonForm additionalStyles='white s2' type='submit' text='Login' disabled={isLoading}/>
              </div>  
            </form>
            <Spinner size={"xl"} color="aqua" hidden={!isLoading}/>
          </section>
          
              
        </div>
      
      
    </section>
    
  )
}

export default Login;