import style from "./banner.module.css";

const HeaderBanner = () => {
  return (
    <div className={`${style.headerbanner}`}>
      <img
        className={`${style.headerbannerimg}`}
        src="/images/banners/shoes.png"
        alt=""
      />
      <img
        className={`${style.headerbannerimg}`}
        src="/images/banners/house.png"
        alt=""
      />
    </div>
  );
};

export default HeaderBanner;
