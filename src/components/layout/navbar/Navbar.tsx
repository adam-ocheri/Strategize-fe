import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import ButtonBase from '../../elements/buttons/ButtonBase/ButtonBase';
import Drawer_Generic from 'src/components/elements/overlays/drawers/generic/Drawer_Generic';
import Drawer_Main from 'src/components/elements/overlays/drawers/main/Drawer_Main';
import { Flex } from '@chakra-ui/react';
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
    <>
      <nav className='navbar'>
        <img src='s-logo.png' alt='logo' height='70px' width='75px' className='logo-img'/>
        {/* <h2 className='font-9 s4 white flex j-center m1'>S</h2> */}
        <ul className='flex f-dir-col' style={{width: '100%', justifyContent: 'space-between'}}>
          <div className='flex f-dir-row'>
            <li onClick={() => navigator('/')}><a className='anchor1 font-8'>Projects</a></li>
            <li onClick={() => navigator('/profile')}><a className='anchor1 font-8'>Workspace</a></li> {/**TODO Change to 'workspace' */}
            <li onClick={() => navigator('/strategizer')}><a className='anchor1 font-8'>Strategizer</a></li>
          </div>
          <div className='flex f-dir-row'>
            <li style={{background: '#32eeee'}}>
              <a className='anchor1 font-8' onClick={toggleDropdown}>Profile</a>
            </li>
          </div>
          
        </ul>
      </nav>
      <Drawer_Main visible={showDropdown} changeVisibility={() => {setShowDropdown(!showDropdown)}} user={user}/>
    </>
  )
}
