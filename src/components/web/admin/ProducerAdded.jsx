import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User'
import { useQuery } from 'react-query';
import style from './admin.module.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default function ProducerAdded() {
    let { userToken } = useContext(UserContext);
    const [userId, setUserId] = useState(() => {
        // قم بتهيئة userId من التخزين المحلي أو اجعلها تساوي القيمة الافتراضية null إذا لم تكن موجودة
        return localStorage.getItem('userId') || null;
    });

    useEffect(() => {
        if (userId) {
            // قم بتخزين userId في التخزين المحلي
            localStorage.setItem('userId', userId);
        }
    }, [userId]);

    
    const myEstate = async () => {
        try
        {   
          const {data} = await axios.get(`https://backendproduce.onrender.com/api/producer`,
          { headers: { token: userToken } });
          return data;
        }
        
        catch(error)
        {
          console.log(error);
        }
    }
    const { data, isLoading } = useQuery("myEstate", myEstate);
    console.log(data);

    const deleteProducers = async (producerId) => {
      const { data } = await axios.delete(`https://backendproduce.onrender.com/api/producer/${producerId}`,
      { headers: { token: userToken } });
      console.log(data);
      if (data.message === "success")
      {
        swal("تم الحذف بنجاح!", "You clicked the button!", "success");
        window.location.reload();
      }
    }
    if (isLoading)
    {
        return <h1>جار التحميل...</h1>
    }

  return (
    <div className='container my-5' dir='rtl'>
      <div className="row">
        {data.producers.length ? data.producers.map((producers) =>
          <div className="col-md-3" key={producers._id}>
            <div className={`mt-3 ${style.card}`}>
              <Link to={`/detalisProducer/${producers._id}`}>
              <img src={producers.imageUrl[0]} alt='Producers'/>
              </Link>
              <p className={`${style.price}`}>{producers.price} $</p>
              <p className={`${style.name}`}>{producers.name}</p>
              <p className={`${style.category}`}>{producers.category}</p>
              <p className={`${style.brand}`}>{producers.brand} </p>
              <div className={`${style.btnDeleteA}`}>
              <p className={`${style.size}`}>{producers.size}</p>
              <button type="button" className="btn btn-danger" onClick={() => deleteProducers(producers._id)}>حذف</button>
              </div>
            </div>
          </div>
        ) : <h1>لا يوجد منتجات</h1>}
      </div>
    </div>
  )
}
