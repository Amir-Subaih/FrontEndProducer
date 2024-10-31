import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/User';
import { Link } from 'react-router-dom';
import style from './Profile.module.css';
import swal from 'sweetalert'; 
import { toast } from 'react-toastify';
import { DisplayContext } from '../context/Display';
import { useQuery } from 'react-query';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken, userData } = useContext(UserContext);
  const [message, setMessage] = useState('');
  
  const { MyOrder } = useContext(DisplayContext);

  const ordersMy = async () => {
    const result = await MyOrder();
    console.log("result", result);
    return result;
  };

  const { data, isLoading, error } = useQuery('myOrder', ordersMy);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const deletOrder = async (orderId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        }
      };

      const response = await axios.delete(
        `https://backendproduce.onrender.com/api/order/${orderId}`,
        config
      );

      console.log(response.data);
      if (response.data.message === "success") {
        swal("Deleted Success!", "You clicked the button!", "success");
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 403) {
        swal("Error", "You do not have permission to delete this order.", "error");
      } else if (err.response && err.response.data && err.response.data.message) {
        swal("Error", `Error: ${err.response.data.message}`, "error");
      } else {
        swal("Error", "An error occurred while trying to delete the order.", "error");
      }
    }
  };

  console.log("Data id", userData._id);
  console.log("Orders", data);

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}></div>
        <p>جاري تحميل الطلبات...</p>
      </div>
    );
  }

  return (
    <div className={`${style.ordersContainer}`}>
      <h2>طلباتي</h2>
      {message && <p>{message}</p>}
      {orders.length === 0 ? (
        <p>لا توجد طلبات.</p>
      ) : (
        <div className={`${style.ordersList}`}>
          {orders.map((order) => (
              <div key={order._id} className={`${style.orderCard}`}>
                <h3>رقم الطلب: {order._id}</h3>
                <p>تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>المجموع: {order.sumPrice}$</p>
                <p>حالة الطلب: {order.status}</p>
                
                <Link to={`/orders/${order._id}`} className={`${style.orderDetailsButton}`}>
                  عرض تفاصيل الطلب
                </Link>
                
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
