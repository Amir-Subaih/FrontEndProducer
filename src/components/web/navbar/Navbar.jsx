import React, { useContext,useState} from 'react'
import style from '../navbar/Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'
import Topn from "./Top/Topn";
import Middlen from "./Middle/Middlen";
import Footern from "./Footer/Footern";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
export default function Navbar() {
  // const {userId}=useParams();
  const navigate=useNavigate();
  let {userToken,setUserToken,userData,setUserData,loading}=useContext(UserContext);
  
  const logout=()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate("/");
  }
  if(loading&&userToken){
    return <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>  
  }

  return (
  
          <div className={`${style.header}`}>
                  <Topn  />
                  <Middlen />
                  <Footern  />
                  <div className={`${style.headerlogin}`}>
                      {/* <Link className={`dropdown-item `} to={"/login"}>تسجيل الدخول<FontAwesomeIcon icon={faPerson}  /></Link>  */}
                      <li className="nav-item dropdown">
                          {!userToken ?
                            <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              الحساب <FontAwesomeIcon icon={faPerson}  />
                            </a>
                            :
                            <a className={`dropdown-toggle ${style.userName}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              {userData && userData.name}
                            </a>
                          }
                          <ul className="dropdown-menu">
                            {!userToken ?
                              <>
                                <li><Link className={`dropdown-item ${style.login}`} to={"/login"}>تسجيل الدخول</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className={`dropdown-item ${style.login}`} to={"/register"}>تسجيل</Link></li>
                              </>
                              :
                              <>
                                <li><Link className={`dropdown-item ${style.login}`} to={`/`}>الملف الشخصي</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className={`dropdown-item ${style.login}`} onClick={logout}>تسجيل الخروج</Link></li>
                              </>
                            }

                          </ul>
                        </li>
                  </div>
          </div>
  
  )
      }
