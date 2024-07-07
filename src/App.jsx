import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WebLayout from './layout/WebLayout';
import Login from './components/web/login/Login';
import Register from './components/web/register/Register';
import Home from './components/web/home/Home';
import { UserContext } from './components/web/context/User';
import Profile from './components/web/profile/Profile';
import UserInfo from './components/web/profile/UserInfo';
import UpdateInfo from './components/web/profile/UpdateInfo';
import ProducerHome from './components/web/home/ProducerHome';
import DetalisProducer from './components/web/detalisProd/DetalisProducer';
import SearchCategory from './components/web/category/SearchCategory';
import Cart from './components/web/cart/Cart';
import AllProducer from './components/web/home/AllProducer';
import MyOrders from './components/web/profile/MyOrders';
import OrderDetails from './components/web/profile/OrderDetails';

// Admin
import WebLayoutAdmin from './layout/WebLayoutAdmin';
import AdminPage from './components/web/admin/Admin';
import ProducerAdded from './components/web/admin/ProducerAdded';
import AddProducer from './components/web/admin/AddProducer';

// Not Found
import NotFound from './components/notFound/NotFound'; // Added import for NotFound component

export default function App() {
  const { setUserToken, setUserId } = useContext(UserContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setUserToken(storedToken);
      setUserId(storedUserId);
    }
  }, [setUserToken, setUserId]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'producerHome',
          element: <ProducerHome />
        },
        {
          path: 'detalisProducer/:proId',
          element: <DetalisProducer />
        },
        {
          path: 'searchCategory/:ca',
          element: <SearchCategory />
        },
        {
          path: 'allProducer',
          element: <AllProducer />
        },
        {
          path: 'orders/:orderId',
          element: <OrderDetails />
        },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            {
              index: true,
              element: <UserInfo />
            },
            {
              path: 'updateInfo',
              element: <UpdateInfo />
            },
            {
              path: 'myOrders',
              element: <MyOrders />
            }
          ]
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: '*',
          element: <NotFound /> // Added catch-all route for undefined paths
        }
      ]
    },
    {
      path: '/admin',
      element: <WebLayoutAdmin />,
      children: [
        {
          path: '/admin',
          element: <AdminPage />,
          children: [
            {
              index: true,
              element: <UserInfo />
            },
            {
              path: 'updateInfo',
              element: <UpdateInfo />
            },
            {
              path: 'producerAdded',
              element: <ProducerAdded />
            },
            {
              path: 'detalisProducer/:proId',
              element: <DetalisProducer />
            },
            {
              path: 'addProducer',
              element: <AddProducer />
            }
          ]
        },
        {
          path: '*',
          element: <NotFound /> // Added catch-all route for undefined paths
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}
