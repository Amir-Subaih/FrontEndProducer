import axios from 'axios';
import React, { useContext,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import style from './DetalisProducer.module.css';
import { useDispatch } from 'react-redux';  // Add useDispatch hook
import { addToCart } from '../../../redux/apiCalls/cartApiCall';  // Add addToCart action
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';

export default function DetalisProducer() {
    const { proId } = useParams();
    const dispatch = useDispatch();  // Add useDispatch hook
    const {userToken}=useContext(UserContext);

    const stateDetails = async () => {
        try {
            const { data } = await axios.get(`https://backendproduce.onrender.com/api/producer/${proId}`);
            console.log("this", data);
            return data.producer;
        } catch (error) {
            console.error("Error fetching product details:", error);
            throw new Error("Failed to fetch product details");
        }
    };

    const { data, isLoading, isError } = useQuery("DetalisPro", stateDetails);

    const [imageIndex, setImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

    const addToCartHandler = () => {
        if(userToken){
                if(size && color){
                dispatch(
                    addToCart({
                        id: data._id,
                        quantity: quantity,
                        price: data.price,
                        title: data.name,
                        image: data.imageUrl && data.imageUrl.length > 0 ? data.imageUrl[0] : "", // Check if images array exists and has at least one element
                        size: size,
                        color: color,
                    })
            );
            toast.success(`تم الاضافة الى سلة التسوق بنجاح`);
        }else{
                alert("الرجاء ادخال الحجم و اللون")
            }
        }else{
            alert("الرجاء تسجيل الدخول")
        }
        console.log("userToken", userToken);
        console.log("data", data);
    };

    if (isLoading) {
        return <h1>جار التحميل....</h1>;
    }

    if (isError || !data) {
        return <h1>لا توجد بيانات</h1>;
    }

    return (
        <>
            <div className={style.specialOffersPage}>
                <div className={style.specialOffersPageImgWrapper}>
                    <img
                        src={data.imageUrl && data.imageUrl.length > imageIndex ? data.imageUrl[imageIndex] : ""}  // Check if images array exists and has enough elements
                        alt=""
                        className={style.specialOffersPageImg}
                    />
                    <div className={style.specialOffersPageSelect}>
                        {data.imageUrl && data.imageUrl.length > 0 && data.imageUrl.map((img, index) => (  // Check if images array exists and has elements
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
                        <div>
                            <div>الکمیه</div>
                            <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="1" max="10" />
                            <div>الحجم</div>
                            <input value={size} onChange={e => setSize(e.target.value)} type="text" required />
                            <div>اللون</div>
                            <input value={color} onChange={e => setColor(e.target.value)} type="text" required />
                        </div>
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
