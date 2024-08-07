import React from 'react';
import style from './home.module.css';
import { Link } from 'react-router-dom';

export default function ProducerHome({ rs, loadingR }) {
    console.log(rs);

    if (loadingR) {
        return <h1>جارٍ التحميل...</h1>;
    }

    if (!rs || !rs.producers) {
        return <h1>فارغ</h1>; // Display a message or fallback UI when rs or rs.producers is undefined
    }

    return (
        <div className="container my-5" dir="rtl">
            <div className="d-flex justify-content-between">
                <p className={style.titleState}>تمت إضافتها مؤخرًا</p>
                <Link to="/allProducer" className={style.btnSeeAll}>عرض الكل</Link>
            </div>
            <div className="row">
                {rs.producers.map((state) => (
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
