import React from 'react'
import style from './Estate.module.css';

export default function Estate({rs,loadingR}) {
    console.log(rs);
    if (loadingR) {
        return <h1>Loading...</h1>
    }
    return (
        <div className={`container my-5 ${style.recnt}`}>
            <p>Recently Added</p>
            <div className="row">
                { rs.estates? rs.estates.map((state) =>
                    <div className={`col-md-6  ${style.item}`} key={state._id}>
                        <div className="img">
                            <img src={state.imageUrl}/>
                            <span className={`${style.addres}`}>{state.address}</span>
                            <span className={`${style.name}`}>{state.ownerId.name}</span>
                            <span className={`${style.phone}`}>{state.ownerId.phone}</span>
                            <span className={`${style.price}`}>${state.price}</span>
                        </div>
                    </div>

                ):<h1>null</h1>}
            </div>
        </div>
    )
}
