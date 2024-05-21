import React from "react";
import { Link } from "react-router-dom";
import style from "./footern..module.css";

const Footern = () => {
    return (
        <nav style={{ right: "0" }} className={`${style.navbar} navbar-expand-lg `}>
            <button className="navbar-toggler" type="button" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${style.navbarlinks}`}>
                <ul className={`navbar-nav mr-auto`}>
                     <Link to="/"  className={`${style.navbarlink}`}>
                      الصفحه الرئیسیه
                    </Link>
                    <Link to="/products"  className={`${style.navbarlink}`}>
                    الإلكترونيات و الموبايلات
                    </Link>
                    <li className={`nav-item`} >
                        <a className={`${style.navbarlink}`} href="#">المنزل و المطبخ</a>
                    </li>
                    <li className={`nav-item`} >
                        <a className={`${style.navbarlink}`} href="#">رجاليه</a>
                    </li>
                    <li className={`nav-item`} >
                        <a className={`${style.navbarlink}`} href="#">نسائیه</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Footern;
