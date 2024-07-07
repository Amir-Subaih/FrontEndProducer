import React from 'react';
import style from './home.module.css';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function AllProducer() {

    const Pro = async () => {
        try {
          const { data } = await axios.get("https://backendproduce.onrender.com/api/producer");
          return data;
        } catch (error) {
          console.error("Error fetching Producer:", error);
          throw error;
        }
      };
    
      const { data: pro, isLoading: isProLoading } = useQuery("producer", Pro);

    if (isProLoading) {
        return <h1>جارٍ التحميل...</h1>;
    }

    if (!pro || !pro.producers) {
        return <h1>فارغ</h1>; // Display a message or fallback UI when rs or rs.producers is undefined
    }

    return (
        <div className="container my-5" dir="rtl">
            <div className="row">
                {pro.producers.map((state) => (
                    <div className="col-md-6" key={state._id}>
                        <div className={style.offer}>
                            <div className={style.offerImageWrapper}>
                                <img src={state.imageUrl[0]} className={style.offerImage} alt="عقار" />
                            </div>
                            <div className={style.offerInfo}>
                                <b className={style.offerTitle}>{state.name}</b>
                                <b className={style.offerItem}>{state.category}</b>
                                <b className={style.offerItemL}>{state.brand}</b>
                                <div className={style.offerPriceSize}>
                                    <b className={style.offerItemL}>{state.size}</b>
                                    <b className={style.offerItem}>${state.price}</b>
                                </div>
                                <Link to={`/detalisProducer/${state._id}`} className={style.offerSeeMore}>
                                    شاهد المزید ...
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
