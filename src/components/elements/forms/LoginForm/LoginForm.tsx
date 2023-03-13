import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonForm from '../../buttons/ButtonForm/ButtonForm';


export default function LoginForm({formData, onFormUpdated, onFormSubmitted} : any) {

    const [formValid, setFormValid] = useState(false);

    const {name, email, password, confirmPassword} : any = formData;

    const [validFields, setValidFields] = useState({
        condition1: false,
        condition2: false,
        condition3: false,
        condition4: false
    })

    const {condition1, condition2, condition3, condition4} = validFields;

    useEffect(() => {
        // if(
        //     name.length > 3 &&
        //     email.includes('@') && email.includes(`.`) && email.length > 4 &&
        //     password === confirmPassword && password.length >= 6
        // )
        setValidFields({
            condition1: name.length > 3,
            condition2: email.includes('@') && email.includes(`.`) && email.length > 4,
            condition3: password.length >= 6, 
            condition4: password === confirmPassword && password.length >= 6
        })
        
    }, [name, email, password, confirmPassword, formData, onFormSubmitted])

    useEffect(() => {
        if(condition1 && condition2 && condition3 && condition4)
        {
            setFormValid(true);
        }
        else{
            setFormValid(false);
        }
    }, [condition1, condition2, condition3, condition4])
  return (
    <form className="p3 m3 jt-center j-center flex f-dir-col" onSubmit={(e) => onFormSubmitted(e)}>
              <label className={`p2 m2 PE-input-${condition1 ? 'valid':'normal'}`} htmlFor="name" >
                <input className="p1 m1 form-input font-2 " type="text" placeholder="Full Name" id="name" 
                    name="name" value={name} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <label className={`p2 m2 PE-input-${condition2 ? 'valid':'normal'}`} htmlFor="email" >
                <input className="p1 m1 form-input font-2" type="email" placeholder="Email" id="email" 
                    name="email" value={email} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <label className={`p2 m2 PE-input-${condition3 ? 'valid':'normal'}`} htmlFor="password">
                <input className="p1 m1 form-input font-2" type="password" placeholder="Password" id="password" 
                    name="password" value={password} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <label className={`p2 m2 PE-input-${condition4 ? 'valid':'normal'}`} htmlFor="confirmPassword">
                <input className="p1 m1 form-input font-2" type="password" placeholder="Confirm Password" id="confirmPassword" 
                    name="confirmPassword" value={confirmPassword} onChange={(e) => {onFormUpdated(e)}}/>
              </label>
              <div className="p2 m2">
                <ButtonForm additionalStyles='font-1 s2' text={'Signup'} disabled={!formValid}/>
                <h4 className='s0 white font-1'>Already a user? <Link to='/login' style={{color: '#22aaff'}}>Sign In</Link></h4>
              </div>
    </form>  
  )
}
