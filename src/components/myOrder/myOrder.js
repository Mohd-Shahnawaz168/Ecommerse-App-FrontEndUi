import { useEffect, useState } from "react";
import MyOrderCss from "./myOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/myOrderReducer/myOrderReducer";
import { myOrderSelector } from "../../redux/myOrderReducer/myOrderReducer";
import { Link, useNavigate } from "react-router-dom";
import { signInAction } from "../../redux/signInreducer/signInReducer";

function MyOrder() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [total, setTotal] = useState(0);
  let { orders, error } = useSelector(myOrderSelector);

  useEffect(() => {
    let value = localStorage.getItem("isAuthorize");
    if (value) {
      let { timeStamp, jwtToken, role, name } = JSON.parse(value);
      if (Date.now() - timeStamp <= 10800000) {
        dispatch(getAllOrder(jwtToken));
        dispatch(signInAction.signIn());
        dispatch(signInAction.setRole(role));
        dispatch(signInAction.setname(name));
      }
    }
  }, []);

  useEffect(() => {
    let initialPrice = 0;
    orders.forEach((ord) => {
      initialPrice = initialPrice + ord.totalPrice;
    });
    setTotal(initialPrice.toFixed(2));
  }, [orders]);

  if (error) {
    return navigate("/signIn");
  }

  return (
    <>
      <div className={MyOrderCss.orderContainer}>
        <h1>Your Orders</h1>
        <div className={MyOrderCss.tablediv}>
          <table className={MyOrderCss.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((prod, index) => (
                <tr key={index}>
                  <td>{prod.productName}</td>
                  <td>₹ {prod.price}</td>
                  <td>
                    {prod.orderAt.split("").slice(0, 10).join("") +
                      " " +
                      prod.orderAt.split("").slice(11, 19).join("")}
                  </td>
                  <td> {prod.qty}</td>
                  <td>₹ {prod.totalPrice}</td>
                  <td>
                    <Link to={`/addReview/${prod.productId}`}>
                      <button className={MyOrderCss.reviewbtn}>
                        Add Review
                      </button>{" "}
                    </Link>
                  </td>
                </tr>
              ))}

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>₹{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MyOrder;
