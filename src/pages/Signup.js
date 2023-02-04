import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { register, reset } from "src/app/state_management/user/authSlice";
function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { name, email, password, confirmPassword } = formData;
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isError, isSuccess, isLoading, message } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (isError) {
            console.log(message);
            dispatch(reset());
        }
        if (user) {
            navigator('/');
        }
    }, [user, isError, message, dispatch, navigator]);
    const onFormUpdated = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onFormSubmitted = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            throw new Error("Passwords don't match!");
        }
        else {
            console.log("trying to register...");
            console.log(formData);
            dispatch(register({ name: name, email: email, password: password }));
        }
    };
    if (isLoading) {
        return <div>
        LOADING........
      </div>;
    }
    return (<div>
        SIGNUP:
        <form onSubmit={(e) => onFormSubmitted(e)}>
            <input className="form-input" type="text" placeholder="Full Name" id="name" name="name" value={name} onChange={(e) => { onFormUpdated(e); }}/>
            <input className="form-input" type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => { onFormUpdated(e); }}/>
            <input className="form-input" type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => { onFormUpdated(e); }}/>
            <input className="form-input" type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => { onFormUpdated(e); }}/>
            <button type='submit'>Signup</button>
        </form>  
    </div>);
}
export default Signup;
