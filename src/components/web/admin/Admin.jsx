// src/components/admin/AdminPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/User';
import jwtDecode from 'jwt-decode';
import style from './admin.module.css';
import { Link,Outlet,useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { userToken,setUserToken,setUserData } = useContext(UserContext);
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setDecodedToken(decoded.isAdmin);
      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    }
  }, [userToken]);

  if (!userToken || !decodedToken ) {
    console.log(decodedToken);
    return <div>You do not have access to this page.</div>;
  }
  const logout=()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate("/");
  }

  return (
    <aside className={`${style.admin}`} dir='rtl'>
         <div className={`${style.adminLinks}`}>
            <nav>
                <Link to="">المعلومات</Link>
                <Link to="updateInfo">تحديث البيانات</Link>
                <Link to="producerAdded"> المنتجات</Link>
                <Link onClick={logout}>تسجيل الخروج</Link>
            </nav>

        </div>
        <div className={`${style.data}`}>
        <Outlet />
      </div>
    </aside>
  );
};

export default AdminPage;
