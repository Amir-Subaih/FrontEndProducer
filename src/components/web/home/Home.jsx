import React, { useContext,useState,useEffect } from 'react';
import Banner from '../banner/Banner';
import Category from '../category/Category';
import { UserContext } from '../context/User';
import style from './home.module.css';
import jwtDecode from 'jwt-decode';


const Home = () => {

  const { userToken } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

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

 

  return (
    <>
    <Banner/>
    <Category/>
      <div className={``}>
        <h1>Home</h1>
      </div>
    </>
  );
}

export default Home;
