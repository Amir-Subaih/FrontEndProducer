import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/User';
import style from './Profile.module.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            token: userToken,
          }
        };

        const response = await axios.get(
          `https://backendproduce.onrender.com/api/order/${orderId}`,
          config
        );

        if (response.data.message === "Success") {
          setOrder(response.data.order);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchOrderDetails();
  }, [userToken, orderId]);

  // Show loading animation if data is still fetching
  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  // Show order details once data is fetched
  return (
    <div className={style.orderDetailsContainer}>
      <h2>تفاصيل الطلب</h2>
      <div className={style.orderCard}>
        <h3>رقم الطلب: {order._id}</h3>
        <p>تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>المجموع: {order.sumPrice}$</p>
        <p>حالة الطلب: {order.status}</p>
        <div className={style.orderItems}>
          {order.orderArray && order.orderArray.length > 0 ? (
            <div className={style.orderItemsList}>
              {order.orderArray.map((item, index) => (
                <div key={index} className={style.orderItem}>
                  <img src={item.producerId.imageUrl[0]} alt={item.producerId.name} />
                  <div className={style.productInfo}>
                    <p>اسم المنتج: {item.producerId.name}</p>
                    <p>الكمية: {item.quantity}</p>
                    <p>الحجم: {item.size}</p>
                    <p>اللون: {item.color}</p>
                    <p>السعر: {(item.producerId.price * item.quantity).toFixed(2)}$</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>لا توجد عناصر في هذا الطلب.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
