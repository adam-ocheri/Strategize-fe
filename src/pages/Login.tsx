import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { login, reset, User } from "src/app/state_management/user/authSlice";

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
    <div>
        LOGIN:
        <form onSubmit={(e) => onFormSubmitted(e)}>
            <input className="form-input" type="email" placeholder="Email" id="email" 
                name="email" value={email} onChange={(e) => {onFormUpdated(e)}}/>
            <input className="form-input" type="password" placeholder="Password" id="password" 
                name="password" value={password} onChange={(e) => {onFormUpdated(e)}}/>
            <button type='submit'>Login</button>
        </form>  
    </div>
  )
}

export default Login;