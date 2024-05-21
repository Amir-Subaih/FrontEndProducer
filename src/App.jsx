import React, {  useContext, useEffect } from 'react'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import WebLayout from './layout/WebLayout';
import Login from './components/web/login/Login';
import Register from './components/web/register/Register';
import Home from './components/web/home/Home';
import {UserContext} from './components/web/context/User';
import Profile from './components/web/profile/Profile';
import UserInfo from './components/web/profile/UserInfo';
import UpdateInfo from './components/web/profile/UpdateInfo';

// Admin
import WebLayoutAdmin from './layout/WebLayoutAdmin';
import AdminPage from './components/web/admin/Admin';
import ProducerAdded from './components/web/admin/ProducerAdded';


export default function App() {
  let {setUserToken,setUserId}=useContext(UserContext);

  useEffect(()=>{
    const storedToken = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId");
    if(storedToken)
    {
      setUserToken(storedToken);
      setUserId(storedUserId);
      // localStorage.removeItem("userToken");
      // localStorage.removeItem("userId");
    }
  },[]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout/>,
      children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"profile",
        element:<Profile/>,
        children:[
          {
            index:true,
            element:<UserInfo/>
          },
          {
            path:"updateInfo",
            element:<UpdateInfo/>
          }
        ]
      }
    ]
    },
    {
      path: '/admin',
      element: <WebLayoutAdmin/>,
      children:[
      {
        path: '/admin',
        element: <AdminPage />,
        children:[
            {
              index:true,
              element:<UserInfo/>
            },
            {
              path:"updateInfo",
              element:<UpdateInfo/>
            },
            {
              path:"producerAdded",
              element:<ProducerAdded/>,
            }
          ]
      }
    ]
    }
    
  ]);
  return (
    // <UserContextProvider>
    <RouterProvider router={router} />
    // </UserContextProvider>
  )
}
