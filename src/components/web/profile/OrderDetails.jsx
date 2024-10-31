import React, { useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import style from './Profile.module.css';
import { DisplayContext } from '../context/Display';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);
  const { OrderDetails } = useContext(DisplayContext);

  const getOrder = async () => {
    const result = await OrderDetails(orderId);
    return result;
  };

  const { data: order, isLoading, error } = useQuery(['OrdersD', orderId], getOrder);

  console.log("token", userToken);
  console.log("order", order);

  const handleDeleteOrder = async () => {
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

      if (response.data.message === "success") {
        toast.success(`تم حذف الطلب بنجاح`);
        navigate('/profile/myOrders');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('حدث خطأ أثناء محاولة حذف الطلب.');
    }
  };

  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return <p>حدث خطأ أثناء جلب تفاصيل الطلب.</p>;
  }

  if (!order) {
    return <p>لم يتم العثور على الطلب.</p>;
  }

  const orderCreationTime = new Date(order.createdAt);
  const currentTime = new Date();
  const timeDifference = (currentTime - orderCreationTime) / (1000 * 60); // Time difference in minutes
  const canDelete = timeDifference <= 10;

  return (
    <div className={style.orderDetailsContainer}>
      <h2>تفاصيل الطلب</h2>
      <div className={style.orderCard}>
        <h3>رقم الطلب: {order._id}</h3>
        <p>تاريخ الطلب: {orderCreationTime.toLocaleDateString()}</p>
        <p>المجموع: {`${order.sumPrice}$`}</p>
        <p>حالة الطلب: {order.status}</p>

        {canDelete ? (
          <button onClick={handleDeleteOrder} className={style.deleteButton}>
            حذف الطلب
          </button>
        ) : (
          <p>لا يمكن حذف الطلب بعد 10 دقائق من الإنشاء</p>
        )}
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
