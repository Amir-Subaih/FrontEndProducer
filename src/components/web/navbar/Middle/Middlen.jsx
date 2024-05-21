import React from "react";
import { Link } from "react-router-dom";
import style from "./middlrn.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Middlen = () => {
    return (
        <div className={style.middleheader}>
            <div className={style.middleheadersearchbox}>
                <input type="search" className="form-control" placeholder="ماذا ترید؟" />
                <button type="submit" className={`${style.searchboxbtn} btn btn-success`}>ابحث</button>
            </div>
            <Link to="/cart" className={style.middleheadershoppingcart}>
                سله التسوق
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className={`${style.cartnotification}`}>1</span>
            </Link>
        </div>
    );
};

export default Middlen;
