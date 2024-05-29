import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import style from './DetalisProducer.module.css';

export default function DetalisProducer() {
    const { proId } = useParams();

    const stateDetails = async () => {
        const { data } = await axios.get(`https://backendproduce.onrender.com/api/producer/${proId}`);
        console.log("this", data);
        return data.producer;
    };

    const { data, isLoading } = useQuery("DetalisPro", stateDetails);

    const [imageIndex, setImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (isLoading) {
        return <h1>جار التحميل....</h1>;
    }

    // Ensure that data is not undefined before accessing its properties
    if (!data) {
        return <h1>لا توجد بيانات</h1>;
    }

    const addToCartHandler = () => {
        // Ensure dispatch and addToCart are properly imported and defined
        dispatch(
            addToCart({
                id: data.id,  // Correctly reference data.id
                quantity: quantity,
                price: data.price,  // Correctly reference data.price
                title: data.title,  // Correctly reference data.title
                image: data.images[0],  // Correctly reference data.images
            })
        );
    };

    return (
        <>
            <div className={style.specialOffersPage}>
                <div className={style.specialOffersPageImgWrapper}>
                    <img
                        src={data.imageUrl[imageIndex]}
                        alt=""
                        className={style.specialOffersPageImg}
                    />
                    <div className={style.specialOffersPageSelect}>
                        {data.imageUrl.map((img, index) => (
                            <img
                                onClick={() => setImageIndex(index)}
                                className={style.selectImg}
                                key={index}
                                src={img}
                                alt=""
                            />
                        ))}
                    </div>
                </div>
                <div className={style.specialOffersPageInfo}>
                    <h3 className={style.specialOffersPageTitle}>{data.name}</h3>
                        <b className={style.specialOffersFinalPriceItem}>{data.brand}</b><br />
                        <b className={style.specialOffersFinalPriceItem}>{data.category}</b><br />
                        <b className={style.specialOffersFinalPriceItem}>${data.price}</b>
                    <div className={style.specialOffersPrice}>
                        <b className={style.specialOffersFinalPriceItem}>الاحجام المتوفره :</b>
                        <b className={style.specialOffersFinalPriceItem}>{data.size}</b>
                    </div>
                    <div className={style.specialOffersAddToCart}>
                        <div>الکمیه</div>
                        <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="1" max="10" />
                        <button onClick={addToCartHandler} className={style.addToCartBtn}>إضافه الی سله التسوق</button>
                    </div>
                </div>
            </div>
            <p className={style.productDescription}>
                <strong className={style.productDescriptionTitle}>حول هذه السلعة</strong>
                {data.description}
            </p>
        </>
    );
}
