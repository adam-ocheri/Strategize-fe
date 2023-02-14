import {useState} from 'react'
import '../../css/main.css';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    function toggleDropdown() {
        // setShowDropdown((prevState) => !prevState);
        setShowDropdown(!showDropdown);
    }
  return (
    <nav className='navbar'>
      <ul className='item-list flex j-center'>
        <li><button>Projects</button></li>
        <li><button>Workspace</button></li>
        <li className=''><button>Settings</button></li>
        <li className=''>
          <button onClick={toggleDropdown}>Profile</button>
            <div 
            className={`dropdown ${showDropdown ? 'show' : 'hide'}`}
            >
              <p>Name: John Doe</p>
              <p>Email: john.doe@example.com</p>
              <button>Logout</button>
            </div>
        </li>
      </ul>
    </nav>
  )
}
