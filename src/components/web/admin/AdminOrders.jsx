import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import style from './admin.module.css';
import { UserContext } from '../context/User';
import { Link } from 'react-router-dom';  

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { userToken, userData } = useContext(UserContext);

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
          `https://backendproduce.onrender.com/api/order`,
          config
        );

        if (response.data.message === "Success") {
          setOrders(response.data.orders);
        }
      } catch (error) {
        if (error.response) {
          console.log("استجابة الخادم برقم الحالة:", error.response.status);
          console.log("بيانات الاستجابة:", error.response.data);
        } else if (error.request) {
          console.log("لم يتم استلام استجابة من الخادم:", error.request);
        } else {
          console.log("حدث خطأ في إعداد الطلب الذي أدى إلى الخطأ:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userToken]);

  

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}></div>
        <p>جاري تحميل الطلبات...</p>
      </div>
    );
  }

  return (
    <div className={style.ordersContainer}>
      <h2>كل الطلبات</h2>
      {message && <p>{message}</p>}
      {orders.length === 0 ? (
        <p>لا توجد طلبات.</p>
      ) : (
        <div className={style.ordersList}>
          {orders.map((order) => (
            <div key={order._id} className={style.orderCard}>
              <h3>رقم الطلب: {order._id}</h3>
              <p>تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>المجموع: {order.sumPrice}$</p>
              <p>الحالة: {order.status}</p>

              <Link to={`/admin/adminOrders/${order._id}`} className={`${style.updateButton}`}>
                  عرض تفاصيل الطلب
              </Link>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
