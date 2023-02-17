import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { register, reset, User } from "src/app/state_management/user/authSlice";
import '../css/main.css'
import ScrollFadeGeneric from "src/components/layout/ScrollFadeGeneric";
import ScrollFadeMulti from "src/components/layout/ScrollFadeMulti";
import ChartBar from "src/components/charts/ChartBar";


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
    <main className="p5 m5">
      <section>
        <div className="centered ">
          <h1 className="font-3 s5 p4 m4 PE-top-border-circles">STRATEGIZE</h1>
        </div>
        <article className="p2 m2">
          <div className="flex f-wrap p1 m1 j-center j-even ">
            <a className="p1 m1 f-basis-3 box-sizing-border story-box box-link backdrop-1" href="">
              <h3 className="font-5 s3 under-title">Plan</h3>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio.
              </p>
              <h2 className="font-5 s2 in-title p1 m1 border-r2 centered white">Learn More</h2>
            </a>
            <a className="p1 m1 f-basis-3 box-sizing-border story-box box-link backdrop-1" href="">
              <h3 className="font-5 s3 under-title">Create</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio.
              </p>
              <h2 className="font-5 s2 in-title p1 m1 border-r2 centered white">Learn More</h2>
            </a>
            <a className="p1 m1 f-basis-3 box-sizing-border story-box box-link backdrop-1" href="">
              <h3 className="font-5 s3 under-title">Excel</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                sed totam saepe minima! Architecto, modi aut. Accusamus ullam hic error dolore! Distinctio.
              </p>
              <h2 className="font-5 s2 in-title p1 m1 border-r2 centered white">Learn More</h2>
            </a>
          </div>
        </article>
      </section>
      <section className="PE-top-border-circles p6 m6">
        <div className="flex f-dir-col jt-center j-center">
          <h2 className="font-2 s3">Join Us</h2>
            <form className="p3 m3 jt-center j-center flex f-dir-col" onSubmit={(e) => onFormSubmitted(e)}>
              <label className="p2 m2 PE-input-normal" htmlFor="name" >
                <input className="p1 m1 form-input font-2 " type="text" placeholder="Full Name" id="name" 
                    name="name" value={name} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <label className="p2 m2 PE-input-normal" htmlFor="email" >
                <input className="p1 m1 form-input font-2" type="email" placeholder="Email" id="email" 
                    name="email" value={email} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <label className="p2 m2 PE-input-normal" htmlFor="password">
                <input className="p1 m1 form-input font-2" type="password" placeholder="Password" id="password" 
                    name="password" value={password} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <label className="p2 m2 PE-input-normal" htmlFor="confirmPassword">
                <input className="p1 m1 form-input font-2" type="password" placeholder="Confirm Password" id="confirmPassword" 
                    name="confirmPassword" value={confirmPassword} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <div className="p2 m2">
                <button className="p2 m2 font-5" type='submit'>Signup</button>
              </div>
            </form>  
        </div>
        <div className="parent-scroll-container p3 m3">
          <div className="j-center flex p6 m6 jt-center">
            <h2 className="font-3 s3">Empowering Individuals and Teams</h2>
          </div>
          {/* <img className="scroll-element" src='b2.jpg' alt='logo' height='400px' width='400px'/> */}
          <section >
            <ScrollFadeGeneric >
              <div >
                <img src='b4.jpg' alt='logo' height='200px' width='350px'/>  
                <p >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                </p>
              </div>
            </ScrollFadeGeneric>
          </section>
          <section >
            <ScrollFadeGeneric>
              <div >
                <img src='b4.jpg' alt='logo' height='200px' width='350px'/>  
                <p >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                </p>
              </div>
            </ScrollFadeGeneric>
          </section>
          <section >
            <ScrollFadeGeneric>
              <div >
                <img src='b4.jpg' alt='logo' height='200px' width='350px'/>  
                <p >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Earum ipsa incidunt ratione accusamus eligendi, quidem impedit quis,
                </p>
              </div>
            </ScrollFadeGeneric>
          </section>
        </div>
      </section>
    </main>
  )
}

export default Signup;