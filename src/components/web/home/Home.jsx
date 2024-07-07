import React, { useContext, useState, useEffect } from 'react';
import Banner from '../banner/Banner';
import Category from '../category/Category';
import { UserContext } from '../context/User';
import style from './home.module.css';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import ProducerHome from './ProducerHome';

const Home = () => {
  const { userToken } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setDecodedToken(decoded);
        console.log(decoded.isAdmin);
        // Example logic to check if the user is an admin
        if (decoded.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    } else {
      console.error('No token provided');
    }
  }, [userToken]);

  const ProHome = async () => {
    try {
      const { data } = await axios.get("https://backendproduce.onrender.com/api/producer?pageNumber=1");
      return data;
    } catch (error) {
      console.error("Error fetching Producer:", error);
      throw error;
    }
  };

  const { data: proHome, isLoading: isProLoading } = useQuery("producerHome", ProHome);
  console.log(proHome);

  // Navigate to admin page if the user is an admin
  if (decodedToken && decodedToken.isAdmin) {
    navigate('/admin');
  }

  
  return (
    <>
      <div className={`${style.bg}`}>
        <Banner />
        <Category />
        <ProducerHome rs={proHome} loadingR={isProLoading} />
      </div>
    </>
  );
};

export default Home;
