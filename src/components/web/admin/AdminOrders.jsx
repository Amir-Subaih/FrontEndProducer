import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import { useQuery } from 'react-query';
import style from './admin.module.css';
import { DisplayContext } from '../context/Display';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const { AdminOrder } = useContext(DisplayContext);

  const getOrder = async () => {
    const result = await AdminOrder();
    return result;
  };

  const { data, isLoading, error } = useQuery("Orders", getOrder);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}></div>
        <p>جاري تحميل الطلبات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.errorContainer}>
        <p>حدث خطأ أثناء تحميل الطلبات. الرجاء المحاولة مرة أخرى لاحقاً.</p>
      </div>
    );
  }

  return (
    <div className={style.ordersContainer}>
      <h2>كل الطلبات</h2>
      {message && <p>{message}</p>}
      {orders && orders.length === 0 ? (
        <p>لا توجد طلبات.</p>
      ) : (
        <div className={style.ordersList}>
          {orders && orders.map((order) => (
            <div key={order._id} className={style.orderCard}>
              <h3>رقم الطلب: {order._id}</h3>
              <p>تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>المجموع: {order.sumPrice}$</p>
              <p>الحالة: {order.status}</p>
              <Link to={`/admin/adminOrders/${order._id}`} className={style.updateButton}>
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
