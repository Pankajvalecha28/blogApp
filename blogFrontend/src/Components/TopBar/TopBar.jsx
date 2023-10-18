import './TopBar.css';

import {Link} from "react-router-dom"
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
  const {user, dispatch}= useContext(Context);
  const PF = "http://localhost:5000/"

  const handleLogout = () =>{
    dispatch({type: "LOGOUT"})
  }
  return (
    <div className='top'>
      <div className="topleft">
      <i className="topicon fa-brands fa-square-facebook"></i>
      <i className="topicon fa-brands fa-square-twitter"></i>
      <i className="topicon fa-brands fa-square-pinterest"></i>
      <i className="topicon fa-brands fa-square-instagram"></i>
      </div>
      
      <div className="topcenter">
        <ul className="toplist">
          <li className='toplistitem'>
            <Link className='link' to='/' >HOME</Link>
          </li>
          <li className='toplistitem'>
          <Link className='link' to='/' >ABOUT</Link>
          </li>
          <li className='toplistitem'>
            <Link className='link' to='/' >CONTACT</Link>
            </li>
          <li className='toplistitem'>
            <Link className='link' to='/write' >WRITE</Link>
            </li>
          <li className='toplistitem' onClick={handleLogout}>{user && "LOGOUT"}</li>
        </ul>
      </div>
      <div className="topright">
        
        {
          user ? (
            <Link to="/settings">
        
        <img className='topimg' src={PF+user.profilepic} alt="" />
        </Link>
        ) : (<ul className='toplist'>
          <li className='toplistitem'>
          <Link className='link' to='/login'>LOGIN</Link>
          </li>
          <li className='toplistitem'>
          <Link className='link' to='/register'>REGISTER</Link>
          </li>
          
          </ul>
        )
        }
        <i className="topsearchicon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}
