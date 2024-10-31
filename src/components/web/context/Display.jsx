import axios from "axios";
import { createContext, useContext } from "react";
import { UserContext } from '../context/User';

export const DisplayContext = createContext(null);

export function DisplayContextProvider({ children }) {
    const { userToken,userData } = useContext(UserContext);

    const config = {
        headers: {
            "Content-Type": "application/json",
            token: userToken,
        }
    };

    const AdminOrder = async () => {
        try {

            const response = await axios.get(
                `https://backendproduce.onrender.com/api/order`,
                config
            );

            if (response.data.message === "Success") {
                console.log(response.data.orders);
                return response.data.orders;
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const AdminOrderDetails = async (oId) => {
        try {

            const response = await axios.get(
                `https://backendproduce.onrender.com/api/order/${oId}`,
                config
            );

            if (response.data.message === "Success") {
                console.log("order 11", response.data.order);
                return response.data.order;
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const MyOrder = async () => {
        try {
  
          const response = await axios.get(
            `https://backendproduce.onrender.com/api/order/user/${userData._id}`,
            config
          );
  
          if (response.data.message === "success") {
            console.log("dtat11",response.data.orders);
                return response.data.orders;
          }
        } catch (err) {
          console.log(err);
        } 
      };

    const OrderDetails = async (oId) => {
        try {
  
          const response = await axios.get(
            `https://backendproduce.onrender.com/api/order/${oId}`,
            config
          );
  
          if (response.data.message === "Success") {
            return response.data.order;
          }
        } catch (err) {
          console.log(err);
        }
      };

    const handleAxiosError = (error) => {
        if (error.response) {
            console.log("استجابة الخادم برقم الحالة:", error.response.status);
            console.log("بيانات الاستجابة:", error.response.data);
        } else if (error.request) {
            console.log("لم يتم استلام استجابة من الخادم:", error.request);
        } else {
            console.log("حدث خطأ في إعداد الطلب الذي أدى إلى الخطأ:", error.message);
        }
    };

    return (
        <DisplayContext.Provider value={{ AdminOrder, AdminOrderDetails,MyOrder,OrderDetails }}>
            {children}
        </DisplayContext.Provider>
    );
}
