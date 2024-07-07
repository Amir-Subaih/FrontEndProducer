import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/apiCalls/cartApiCall";
import { Link,useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/User";
import axios from "axios";
import { cartActions } from "../../../redux/slices/cartSlice"; // Adjust the path
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userToken } = useContext(UserContext);
  const [sum, setSum] = useState(0);
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }, [userId]);

  useEffect(() => {
    const total = cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0).toFixed(2);
    setSum(total);
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = cartItems.map(item => ({
      producerId: item.id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    const data = {
      userId: userId,
      orderArray: order,
      sumPrice: sum,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: userToken,
      }
    };

    try {
      const response = await axios.post(
        "https://backendproduce.onrender.com/api/order/create",
        data,
        config
      );

      if (response.data.message === "success") {
        dispatch(cartActions.clearCart()); // Clear the cart
        toast.success("تمت الاضافة بنجاح");
        navigate('/profile/myOrders');
      }
    } catch (err) {
      console.log(err);
    }
    setSum(0);
  };

  // Handle order cancellation
  const handleCancelOrder = async () => {
    
        dispatch(cartActions.clearCart()); // Clear the cart
        toast.success("تم الغاء الطلب بنجاح");
      
  };

  return cartItems.length < 1 ? (
    <div className="empty-cart">
      <h1>سله التسوق الخاصه بك فارغه</h1>
      <p>لا یوجد سلع</p>
      <Link className="empty-cart-link" to="/products">
        صفحه السلع
      </Link>
      <br />
      <br />
    </div>
  ) : (
    <section className="cart">
      <h1 className="cart-title">سله التسوق</h1>
      <div className="cart-wrapper">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img-wrapper">
                <img className="cart-item-img" src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-quantity">
                  الكمية:
                  <span>{item.quantity}</span>
                </div>
                <div className="cart-item-quantity">
                  الألوان:
                  <span>{item.color}</span>
                </div>
                <div className="cart-item-quantity">
                  الأحجام:
                  <span>{item.size}</span>
                </div>
                <div className="cart-item-price">
                  السعر:
                  <span>{(item.price * item.quantity).toFixed(2)}$</span>
                </div>
                <i
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bi bi-trash-fill cart-item-delete-icon"
                ></i>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-summary-text">
            <i className="bi bi-check-circle-fill"></i>
            جزء من طلبك مؤهل للشحن المجاني. قم بتحديد هذا الخيار عند دفع
            التفاصيل
          </div>
          <div className="cart-summary-total">
            المجموع:
            <span>{sum}$</span>
          </div>
          <button onClick={handleSubmit} className="cart-summary-btn">تأكيد وارسال الطلب</button>
          <button onClick={handleCancelOrder} className="cart-summary-cancel-btn">الغاء الطلب</button> {/* Added Cancel Order Button */}
        </div>
      </div>
    </section>
  );
};

export default Cart;
