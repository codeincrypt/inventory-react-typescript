import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { FaSun } from 'react-icons/fa';
import { PiMoonFill } from 'react-icons/pi';

import logo from "../assets/images/logo.svg";
import profile from "../assets/images/image-avatar.jpg";

const Sidebar: React.FC = (props: any) => {
  // eslint-disable-next-line
  const location = useLocation();

  const [icon, setIcon] = useState<boolean>(true);

  const switchMode = () => {
    var element = document.getElementById("darkmode");
    if (element && element.classList.contains('dark-mode')) {
      element.classList.remove('dark-mode');
      localStorage.setItem('darkmode', "")
      setIcon(false)
    } else {
      element && element.classList.add('dark-mode');
      localStorage.setItem('darkmode', "darkmode")
      setIcon(true)
    }
  }

  useEffect(() => {
    const element = document.getElementById("darkmode");
    if (element && localStorage.getItem('darkmode')) {
      element.classList.add('dark-mode');
      setIcon(true)
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <div className="my-sidebar">
        <div className="sidebar-logo text-center">
          <Link to={'/'}>
            <img src={logo} alt="brand-logo" className="header-logo" />
          </Link>
        </div>
        <div className="sidebar-bottom">
          <div className='text-center p-3 '>
            <button className="mode" id="changeMode" title="Change Mode" onClick={switchMode}>
              {icon ? (<FaSun />) : (<PiMoonFill />)}
            </button>
          </div>
          <div className='text-center p-3 profile'>
            <Link to={'/profile'}>
              <img src={profile} alt="profile" className="header-logo rounded-circle" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar;