import { Link } from "react-router-dom";
import { categories } from "../../data/category";
import style from "./category.module.css";

const Category = () => {
  return (
    <div className={`${style.categories}`}>
      {categories.map((category) => (
        <div key={category.id} className={`${style.categoryitem}`}>
          <Link to={`/searchCategory/${category.title}`}>
          <img className={`${style.categoryitemimg}`} src={category.image} alt="" />
          </Link>
          <b className={`${style.categoryitemtitle}`}>{category.title}</b>
        </div>
      ))}
    </div>
  );
};

export default Category;
