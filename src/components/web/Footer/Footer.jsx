import React from 'react';

import style from "./footer.module.css";

function Footer (){
  return (
    <footer className={`${style.footer}`}>
      <div className={`${style.footertop}`}>
        <h3 className={`${style.footertoptitle}`}>متواجدین دائما لمساعدتك</h3>
        <div className={`${style.footertopemail}`}>
          <span className={`${style.footertopemailtext}`}>تواصل معانا عبر الإيميل</span>
          <span className={`${style.footertopemailaddress}`}>
            <i className="bi bienvelope"></i>
            amirsubaih@gmail.com
          </span>
        </div>
      </div>
      <div className={`${style.footeritemswrapper}`}>
         <div className={`${style.footeritem}`}>
            <h4 className={`${style.footeritemtitle}`}>الإلكترونيات</h4>
            <ul className={`${style.footeritemlinks}`}>
                <li className={`${style.footeritemlink}`}>الکامیرات و تسجیل فیدیو</li>
                <li className={`${style.footeritemlink}`}>الأجهزه المنزلیه</li>
                <li className={`${style.footeritemlink}`}>الهواتف</li>
                <li className={`${style.footeritemlink}`}>سماعات الرأس</li>
                <li className={`${style.footeritemlink}`}>التلفیزیونات</li>
                <li className={`${style.footeritemlink}`}>اجهزه التابلیت</li>
            </ul>
         </div>
         <div className={`${style.footeritem}`}>
            <h4 className={`${style.footeritemtitle}`}>الأزیاء</h4>
            <ul className={`${style.footeritemlinks}`}>
                <li className={`${style.footeritemlink}`}>أزیاء رجالیه</li>
                <li className={`${style.footeritemlink}`}>أزیاء نسائیه</li>
                <li className={`${style.footeritemlink}`}>أزیاء الأولاد</li>
                <li className={`${style.footeritemlink}`}>نظارات</li>
                <li className={`${style.footeritemlink}`}>المجوهرات</li>
                <li className={`${style.footeritemlink}`}>الساعات</li>
            </ul>
         </div>
         <div className={`${style.footeritem}`}>
            <h4 className={`${style.footeritemtitle}`}>المطبخ و الأجهزه المنزلیه</h4>
            <ul className={`${style.footeritemlinks}`}>
                <li className={`${style.footeritemlink}`}>دیکورات منازل</li>
                <li className={`${style.footeritemlink}`}>الأثاث</li>
                <li className={`${style.footeritemlink}`}>المطبخ و أدوات الطعام</li>
                <li className={`${style.footeritemlink}`}>مستلزمات الحمام</li>
                <li className={`${style.footeritemlink}`}>اجهزه صوت و فیدیو</li>
                <li className={`${style.footeritemlink}`}>مستلزمات الحدائق</li>
            </ul>
         </div>
         <div className={`${style.footeritem}`}>
            <h4 className={`${style.footeritemtitle}`}>الجمال</h4>
            <ul className={`${style.footeritemlinks}`}>
                <li className={`${style.footeritemlink}`}>العطور</li>
                <li className={`${style.footeritemlink}`}>المکیاج</li>
                <li className={`${style.footeritemlink}`}>العنایه بالشعر</li>
                <li className={`${style.footeritemlink}`}>العنایه بالبشره</li>
                <li className={`${style.footeritemlink}`}>الجسم و الاستحمام</li>
                <li className={`${style.footeritemlink}`}>منتجات الرعایه الصحیه</li>
            </ul>
         </div>
      </div>
      <div className={`${style.footerbottom}`}>
      <i className="bi biccircle"></i> 2024
       کل الحقوق محفوظه
      </div>
    </footer>
  );
};

export default Footer;

