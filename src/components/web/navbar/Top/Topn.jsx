import React from "react";
import style from "../Navbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faBasketball, faList12, faPhone, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Topn = () => {
    return (
        <div className={`${style.topheader}`}>
            <div className={`${style.topheadermenu}`}>
                <FontAwesomeIcon icon={faList12}/>
            </div>
            <div className={`${style.topheaderlogo}`}>
                <FontAwesomeIcon icon={faBasketShopping}  />
                بغداد شاب
            </div>
            <div className={`${style.topheadertext}`}>اهلا و سهلا بكم</div>
            <div className={`${style.topheaderphone}`}>
                123-456-789
                <FontAwesomeIcon icon={faPhone}/>
            </div>
        </div>
    );
};

export default Topn;
