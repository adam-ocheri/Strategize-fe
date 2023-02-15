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
      <img src='s-logo.png' alt='logo' height='80px' width='85px'/>
      <ul className='item-list flex j-center'>
        <li><button>Projects</button></li>
        <li><button>Workspace</button></li>
        <li className=''><button>Settings</button></li>
        <li className=''>
          <button onClick={toggleDropdown}>Profile</button>
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
