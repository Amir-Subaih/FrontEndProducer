import { useFormik } from 'formik'
import React ,{useState} from 'react'
import { registerSchema } from '../../../validation/Validation'
import Input from '../../shared/Input'
import style from '../login/Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Register() {
    const navigate = useNavigate();
    const [passwordFocused, setPasswordFocused] = useState(false);
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        location:'',
        password: '',
        confirm_password:'',
    }
    const onSubmit = async (users) => {
        try {
          const { data } = await axios.post("https://backendproduce.onrender.com/api/auth/register", users);
          console.log(data);
          if (data.message === "success") {
            toast.success("تم التسجيل بنجاح");
            navigate("/login");
          }
        } catch (err) {
          console.error(err);
          if (err.response) {
            // Server responded with an error status code
            toast.error(err.response.data); // Display the error message returned by the server
          } else {
            // An error occurred before the request could be sent
            toast.error("حدث خطأ ما أثناء معالجة الطلب");
          }
        }
      };
      
      

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema
    })

    const inputs = [

        {
            id: 'name',
            name: 'name',
            title: 'اسم المستخدم',
            className: 'form-control',
            type: 'text',
            value: formik.values.name,
        },
        {
            id: 'email',
            name: 'email',
            title: 'البريد الإلكتروني',
            type: 'email',
            className: 'form-control',
            value: formik.values.email
        },
        {
            id: 'phone',
            name: 'phone',
            title: 'الهاتف',
            className: 'form-control',
            type: 'text',
            value: formik.values.phone,
        },
        {
            id: 'location',
            name: 'location',
            title: 'الموقع',
            className: 'form-control',
            type: 'text',
            value: formik.values.location,
        },
        {
            id: 'password',
            name: 'password',
            title: 'كلمة المرور',
            type: 'password',
            className: 'form-control',
            value: formik.values.password,
            onFocus: () => setPasswordFocused(true),
            onBlur: () => setPasswordFocused(false)
        },
        {
            id:'confirm_password',
            name:'confirm_password',
            title:'تأكيد كلمة المرور',
            type:'password',
            className:'form-control',
            value:formik.values.confirm_password
        },

    ]

    const renderInputs = inputs.map((input, index) => {
        return (
            <Input type={input.type}
            id={input.id}
            name={input.name}
            title={input.title}
            className={input.className}
            value={input.value}
            onChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
            onFocus={input.onFocus}
            key={index}/>

        )
    })
    return (
        <div className='container' dir='rtl'>
            <div className="row">
                <div className="col-md-7">
                    <img src={"../../../../img/login1.png"} alt='register' className={`${style.logimg1}`} />
                </div>
                <div className="col-md-5 ">

                    <div className="imgLogo">
                        <img src={"../../../../img/logoLogin.png"} alt="logoLogin" className={`${style.logoLogin}`} />
                    </div>

                    <div className={`${style.content}`}>
                        <h1>التسجيل</h1>
                        <p>كن عضوًا.</p>
                    </div>

                    <form className="mt-3 " onSubmit={formik.handleSubmit}>
                        {renderInputs}
                        <button type="submit" className={`${style.btnLogin}`} disabled={!formik.isValid}>تسجيل</button>
                    </form>
                    <div className={`${style.dontAcount}`}>
                        <p> لديك حساب؟ <Link to={"/Login"}> <span>تسجيل الدخول</span> </Link></p>
                    </div>
                    {passwordFocused && (
                    <div className="password-rules">
                        <ul>
                            <li>على الأقل 8 أحرف </li>
                            <li>يحتوي على رقم</li>
                            <li>يحتوي على حرف كبير</li>
                            <li>يحتوي على حرف صغير</li>
                            <li>يحتوي على حرف خاص (!@#$%^&*)</li>
                        </ul>
                    </div>
                    )}
                </div>
            </div>

        </div>
    )
}
