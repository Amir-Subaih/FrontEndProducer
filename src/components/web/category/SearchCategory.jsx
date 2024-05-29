    import axios from 'axios'
    import React, { useState,useEffect } from 'react'
    import { Link,useParams } from 'react-router-dom';
    import style from './searchCategory.module.css';


    export default function SearchCategory() {
        let { ca } = useParams();
        let [dataState,setDataState]=useState([]);
        const seeAllL = async () => {
            const data  = await axios.get(`https://backendproduce.onrender.com/api/producer/search?categorys=${ca}`);
            setDataState(data.data.producers);
        }
        useEffect(()=>{
            seeAllL();
        },[]);
        
        return (
            <div className='container my-5'>
                <p className={` ${style.titleProduct}`}>{ca}</p>


                <div className="row">
                    {dataState ? dataState.map((producer) =>

                        <div className="col-md-3" key={producer._id}>
                            <div className={`my-4 ${style.card}`}>
                                <Link to={`/detalisProducer/${producer._id}`}>
                                    <img src={producer.imageUrl[0]} alt='producer' />
                                    <p className={`${style.price}`}>{producer.price} $</p>
                                    <p className={`${style.name}`}>{producer.name}</p>
                                    <p className={`${style.brand}`}>{producer.brand}</p>
                                    <p className={`${style.size}`}>{producer.size}</p>
                                    <p className={`${style.category}`}>{producer.category}</p>
                                </Link>
                            </div>
                        </div>

                    ) : <h1>Producer null</h1>}
                </div>
            </div>
        )
    }
