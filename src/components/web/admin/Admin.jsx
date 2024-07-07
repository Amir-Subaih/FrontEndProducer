import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/User';
import jwtDecode from 'jwt-decode';
import style from './admin.module.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { userToken, setUserToken, setUserData } = useContext(UserContext);
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userToken) {
        try {
          const decoded = jwtDecode(userToken);
          setDecodedToken(decoded.isAdmin);
          setLoading(false); // Set loading to false once token is decoded
        } catch (error) {
          console.error('Error decoding the token:', error);
          setLoading(false); // Ensure loading state is updated on error
        }
      }
    };

    fetchData();
  }, [userToken]);

  if (loading) {
    return (
      <div className={`${style.loadingContainer}`}>
        <div className={`${style.loadingSpinner}`}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (!userToken || !decodedToken) {
    return <div>You do not have access to this page.</div>;
  }

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate('/');
  };

  return (
    <aside className={`${style.admin}`} dir="rtl">
      <div className={`${style.adminLinks}`}>
        <nav>
          <Link to="">المعلومات</Link>
          <Link to="updateInfo">تحديث البيانات</Link>
          <Link to="addProducer"> أضافة منتج</Link>
          <Link to="producerAdded"> المنتجات</Link>
          <Link to="orders"> الطلبات</Link>
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
