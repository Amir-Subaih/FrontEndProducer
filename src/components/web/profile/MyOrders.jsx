import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/User';
import { Link } from 'react-router-dom';
import style from './Profile.module.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken, userData } = useContext(UserContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            token: userToken,
          }
        };

        const response = await axios.get(
          `https://backendproduce.onrender.com/api/order/user/${userData._id}`,
          config
        );

        if (response.data.message === "success") {
          setOrders(response.data.orders);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userToken, userData._id]);

  const handleDelete = async (orderId) => {
    console.log("Order ID", orderId);
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

      console.log("data", response.data);
      if (response.data.message === "success") {
        setOrders(orders.filter(order => order._id !== orderId));
        setMessage('Order deleted successfully');
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Error: ${err.response.data.message}`);
      } else {
        setMessage('An error occurred while trying to delete the order.');
      }
    }
  };

  console.log("Data id", userData._id);
  console.log("Orders", orders);

  if (loading) {
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
          {orders.map((order) => {
            const orderCreationTime = new Date(order.createdAt);
            const currentTime = new Date();
            const timeDifference = (currentTime - orderCreationTime) / (1000 * 60); // Time difference in minutes
            const canDelete = timeDifference <= 10;

            return (
              <div key={order._id} className={`${style.orderCard}`}>
                <h3>رقم الطلب: {order._id}</h3>
                <p>تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>المجموع: {order.sumPrice}$</p>
                <p>حالة الطلب: {order.status}</p>
                
                <Link to={`/orders/${order._id}`} className={`${style.orderDetailsButton}`}>
                  عرض تفاصيل الطلب
                </Link>
                {canDelete ? (
                  <button onClick={() => handleDelete(order._id)} className={`${style.deleteButton}`}>
                    حذف الطلب
                  </button>
                ) : (
                  <p>لا يمكن حذف الطلب بعد 10 دقائق من الإنشاء</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
