import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import ButtonBase from '../../elements/buttons/ButtonBase/ButtonBase';
//import '../../css/main.css';

export default function Navbar() {
    const navigator = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const dispatch = useAppDispatch();
    const {user} : any = useAppSelector((state) => state.auth);

    function toggleDropdown() {
        // setShowDropdown((prevState) => !prevState);
        setShowDropdown(!showDropdown);
    }
  return (
    <nav className='navbar'>
      <img src='s-logo.png' alt='logo' height='70px' width='75px' className='logo-img'/>
      {/* <h2 className='font-9 s4 white flex j-center m1'>S</h2> */}
      <ul className='item-list flex j-center'>
        <li><a className='anchor1 font-8'>Projects</a></li>
        <li><a className='anchor1 font-8'>Settings</a></li>
        <li onClick={() => navigator('/assistant')}><a className='anchor1 font-8'>Assistant</a></li>
        <li>
          <a className='anchor1 font-8' onClick={toggleDropdown}>Profile</a>
            <div 
            className={`dropdown ${showDropdown ? 'show' : 'hide'}`}
            >
              {user? (<div className='font-8'>
                <p>Name: <button onClick={() => {navigator('/profile')}}>{user.name}</button></p>
                <p>Email: john.doe@example.com</p>
                <ButtonBase>Logout</ButtonBase>
              </div>) : (<div>
                <ButtonBase>Login</ButtonBase>
                <ButtonBase>Signup</ButtonBase>
              </div>)}
              
            </div>
        </li>
      </ul>
    </nav>
  )
}
