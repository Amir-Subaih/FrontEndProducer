import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import style from './admin.module.css';
import { UserContext } from '../context/User';

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

  const handleUpdateState = async (orderId, newState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };

      const response = await axios.put(
        `https://backendproduce.onrender.com/api/order/${orderId}`,
        { status: newState },
        config
      );

      if (response.data.message === "success") {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: newState } : order));
        setMessage('تم تحديث حالة الطلب بنجاح');
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setMessage('حدث خطأ أثناء محاولة تحديث حالة الطلب.');
    }
  };

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
              
              <button onClick={() => handleUpdateState(order._id, 'قيد المعالجة')} className={style.updateButton}>
                تعيين كقيد المعالجة
              </button>
              <button onClick={() => handleUpdateState(order._id, 'تم الشحن')} className={style.updateButton}>
                تعيين كتم الشحن
              </button>
              <button onClick={() => handleUpdateState(order._id, 'تم التوصيل')} className={style.updateButton}>
                تعيين كتم التوصيل
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
