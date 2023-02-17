import {useState} from 'react'
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
//import '../../css/main.css';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth);

    function toggleDropdown() {
        // setShowDropdown((prevState) => !prevState);
        setShowDropdown(!showDropdown);
    }
  return (
    <nav className='navbar'>
      <img src='s-logo.png' alt='logo' height='70px' width='75px'/>
      {/* <h2 className='font-9 s4 white flex j-center m1'>S</h2> */}
      <ul className='item-list flex j-center'>
        <li><a className='anchor1'>Projects</a></li>
        <li><a className='anchor1'>Workspace</a></li>
        <li><a className='anchor1'>Settings</a></li>
        <li>
          <a className='anchor1' onClick={toggleDropdown}>Profile</a>
            <div 
            className={`dropdown ${showDropdown ? 'show' : 'hide'}`}
            >
              {user? (<div>
                <p>Name: John Doe</p>
                <p>Email: john.doe@example.com</p>
                <button>Logout</button>
              </div>) : (<div>
                <button>Login</button>
                <button>Signup</button>
              </div>)}
              
            </div>
        </li>
      </ul>
    </nav>
  )
}
