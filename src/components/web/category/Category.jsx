import { categories } from "../../data/category";
import style from "./category.module.css";

const Category = () => {
  return (
    <div className={`${style.categories}`}>
      {categories.map((category) => (
        <div key={category.id} className={`${style.categoryitem}`}>
          <img className={`${style.categoryitemimg}`} src={category.image} alt="" />
          <b className={`${style.categoryitemtitle}`}>{category.title}</b>
        </div>
      ))}
    </div>
  );
};

export default Category;
