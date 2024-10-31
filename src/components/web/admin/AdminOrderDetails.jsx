import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import style from './admin.module.css';
import { DisplayContext } from '../context/Display';
import { useQuery } from 'react-query';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify'

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate(); // Updated to useNavigate
  const [state, setState] = useState('');
  const { userToken } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const { AdminOrderDetails } = useContext(DisplayContext);

  const getOrder = async () => {
    const result = await AdminOrderDetails(orderId);
    return result;
  };

  const { data, isLoading, error } = useQuery(['OrdersD', orderId], getOrder);

  const handleUpdateState = async (orderId, newState) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        }
      };

      const response = await axios.put(
        `https://backendproduce.onrender.com/api/order/${orderId}`,
        { status: newState },
        config
      );

      if (response.data.message === "Order updated successfully") {
        setMessage('تم تحديث حالة الطلب بنجاح');
        toast.success(`تم تحديث حالة الطلب بنجاح`);
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setMessage('حدث خطأ أثناء محاولة تحديث حالة الطلب.');
      toast.success(`حدث خطأ أثناء محاولة تحديث حالة الطلب.`);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        }
      };

      const response = await axios.delete(
        `https://backendproduce.onrender.com/api/order/admin/${orderId}`,
        config
      );

      if (response.data.message === "Order deleted successfully") {
        setMessage('تم حذف الطلب بنجاح');
        
        toast.success(`تم حذف الطلب بنجاح`); 
        // Redirect to another page, e.g., the orders list
        navigate('/admin/orders'); // Updated to use navigate
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setMessage('حدث خطأ أثناء محاولة حذف الطلب.');
      
      toast.success(`حدث خطأ أثناء محاولة حذف الطلب.`); 
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
    return (
      <div className={style.errorContainer}>
        <p>حدث خطأ أثناء جلب بيانات الطلب.</p>
      </div>
    );
  }

  return (
    <div className={style.orderDetailsContainer}>
      <h2>تفاصيل الطلب</h2>
      <div className={style.orderCard}>
        <h3>رقم الطلب: {data._id}</h3>
        <p>تاريخ الطلب: {new Date(data.createdAt).toLocaleDateString()}</p>
        <p>المجموع: {data.sumPrice}$</p>
        <p>حالة الطلب: {data.status}</p>
        <div className={style.updateSection}>
          <div className='row'>
            <div className='col-md-1'>
              <select className={style.statusSelect} required value={state} onChange={(e) => setState(e.target.value)}>
                <option value="معلقة">معلقة</option>
                <option value="مرفوضة">مرفوضة</option>
                <option value="مقبولة">مقبولة</option>
                <option value="سلمت">سلمت</option>
              </select>
            </div>
            <div className='col-md-6'>
              <button onClick={() => handleUpdateState(data._id, state)} className={style.updateButton}>
                تحديث حالة الطلب
              </button>
              <button onClick={() => handleDeleteOrder(data._id)} className={style.deleteButton}>
                حذف الطلب
              </button>
            </div>
          </div>
        </div>
        {message && <p className={style.message}>{message}</p>}
        <div className={style.orderItems}>
          {data.orderArray && data.orderArray.length > 0 ? (
            <div className={style.orderItemsList}>
              {data.orderArray.map((item, index) => (
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

export default AdminOrderDetails;
