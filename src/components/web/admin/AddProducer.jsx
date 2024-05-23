import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from './admin.module.css'
import { UserContext } from "../context/User";
import { toast } from "react-toastify";

const AddProducer = () => {
    let { userToken } = useContext(UserContext);
    let [userId,setUserId]=useState("");

    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    
    useEffect(()=>{
    if(localStorage.getItem("userId"))
    {
        setUserId(localStorage.getItem("userId"));
    }
    },[])
    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        console.log("test");
        const formData = new FormData();
        formData.append("ownerId",userId);
        formData.append("name", name);
        formData.append("size",size);
        formData.append("price", parseInt(price));
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("description",description);

        

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const data = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(data);
        const config = {
            headers: 
            {
                "Content-Type": "multipart/form-data",
                token: userToken,
            }
        };
        try {
            const {data} = await axios.post(
                "https://backendproduce.onrender.com/api/producer/create",
                formData,
                config,
            );
            if(data.message=="success")
            {
                toast.success("تمت الاضافة بنجاح");
                navigat('/admin/producerAdded');
            }
            // console.log(res.data);

        } catch (err) {
            console.log(err);
        }

        // Explicitly reset state fields
        setUserId("");
        setName("");
        setSize("");
        setCategory("");
        setBrand("");
        setPrice("");
        setDescription("");
        setImages([]);
    };
    

    return (
        <div className="container" dir="rtl">
            <div className={`${style.AddProducer}`}>
            <p>مرحبًا بكم في صفحة إضافة المنتجات</p>
                <span>
                    يسرنا أن نقدم لكم واجهة سهلة الاستخدام لإضافة منتجات جديدة إلى متجرنا الإلكتروني. سواء كنت بائعًا جديدًا أو لديك مجموعة متنوعة من المنتجات التي ترغب في عرضها، يمكنك ببساطة إدخال تفاصيل المنتج هنا، بما في ذلك الاسم، الوصف، السعر، والصور.
                نحن نهدف إلى تسهيل عملية إدارة المنتجات لك، وضمان عرضها بشكل مثالي لجذب المزيد من العملاء وزيادة مبيعاتك. ابدأ الآن وأضف منتجاتك بسهولة وسرعة!
                </span>
            </div>

            <form onSubmit={handleSubmit} id="myForm">

                <div className="row">
                <div className="col-md-3">
                    <div className="price ">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> الاسم:</label>
                    <div className="input-group mb-3">
                        <input type="text" id="myForm" required placeholder='أدخل الاسم' className="form-control border-4" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="price ">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> الحجم:</label>
                    <div className="input-group mb-3">
                        <input type="text" id="myForm" required placeholder='أدخل الحجم' className="form-control border-4" value={size} onChange={(e) => setSize(e.target.value)}/>
                    </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="price ">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> العلامة التجارية:</label>
                    <div className="input-group mb-3">
                        <input type="text" id="myForm" required placeholder='أدخل العلامة التجارية' className="form-control border-4" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                    </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="location">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> الفئة:</label>
                    <select className="form-select w-75 border-4" required value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">اختر الفئة</option>
                        <option value="الساعات">الساعات</option>
                        <option value="الأثاث">الأثاث</option>
                        <option value="أجهزه-للارتداء">أجهزه-للارتداء</option>
                        <option value="اللابتوبات">اللابتوبات</option>
                        <option value="الجوالات">الجوالات</option>
                        <option value="النظافه">النظافه</option>
                        <option value="ملابس-ریاضیه">ملابس-ریاضیه</option>
                        <option value="أزیاء-رجالیه">أزیاء-رجالیه</option>
                        <option value="أزیاء-نسائیه">أزیاء-نسائیه</option>
                        <option value="قرطاسیه">قرطاسیه</option>
                        <option value="الأحذیه-الریاضیه">الأحذیه-الریاضیه</option>
                    </select>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <div className="price ">
                    <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> السعر:</label>
                    <div className="input-group mb-3">
                    <span className="input-group-text">.00</span>
                    <input type="number" id="myForm" required placeholder='أدخل السعر بالدولار' className="form-control border-4" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <span className="input-group-text">$</span>
                    </div>
                    </div>
                </div>

                <div className="detalis mb-2">
                <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> التفاصيل:</label>
                    <textarea
                        required
                        className="form-control border-4 w-25"
                        placeholder='تفاصيل المنتج'
                        value={description}
                        id="myForm"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                
                <div className="images mb-4">
                <label className={`mb-2 ${style.label}`}><span className="text-danger">*</span> الصور:</label>
                    <input
                        type="file"
                        multiple
                        required
                        className="form-control border-4 w-50"
                        onChange={(e) => setImages(e.target.files)}
                    />
                
                </div>
                
                </div>
                <button type="submit"  className={`${style.btn}`}>تقديم</button>
                
            </form>

        </div>
    );
};

export default AddProducer;