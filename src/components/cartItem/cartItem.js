import cartItemCss from "./cartitem.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, cartSelector } from "../../redux/cartReducer/cartReducer";
import { toast } from "react-toastify";
import { signInAction } from "../../redux/signInreducer/signInReducer";
import { useNavigate } from "react-router-dom";

function CartItems() {
  let [total, setTotal] = useState(0);
  let dispatch = useDispatch();
  let { cart } = useSelector(cartSelector);
  let navigate = useNavigate();

  useEffect(() => {
    // Update the total price whenever the cart changes
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(newTotal);
  }, [cart]);

  function setCart() {
    try {
      let value = localStorage.getItem("isAuthorize");
      if (value) {
        let { timeStamp, jwtToken, role, name } = JSON.parse(value);
        if (Date.now() - timeStamp <= 10800000) {
          let url =
            "https://ecommerse-app-amxt.onrender.com/ecom/api/cart/getUserCartItem";
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: jwtToken,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                dispatch(cartAction.setUserCartItem(data.item));
              }
            });
          dispatch(signInAction.signIn());
          dispatch(signInAction.setRole(role));
          dispatch(signInAction.setname(name));
        }
      } else {
        navigate("/signIn");
      }
    } catch (err) {
      toast.error("Something is wrong please try again later");
    }
  }

  useEffect(() => {
    setCart();
  }, []);

  async function removeFromCart(orderId) {
    let url = `https://ecommerse-app-amxt.onrender.com/ecom/api/cart/deleteItemFromCart/${orderId}`;
    let value = localStorage.getItem("isAuthorize");
    let { jwtToken } = JSON.parse(value);
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: jwtToken,
      },
    });
    let responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData.msg);

      //after deleting use dispatch and modify cart
      dispatch(cartAction.removeCartItem(orderId));

      //or call setCart() to fetch data from server and render cart
      //setCart();
    } else {
      toast.error(responseData.msg);
    }
  }

  async function manageQty(orderId, qty) {
    let url = "https://ecommerse-app-amxt.onrender.com/ecom/api/cart/updateQty";
    let value = localStorage.getItem("isAuthorize");
    let { jwtToken } = JSON.parse(value);
    let body = { cartItemId: orderId, qty: qty };
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken,
      },
      body: JSON.stringify(body),
    });

    await response.json();

    //after updating use dispatch and modify cart
    dispatch(cartAction.updateQty({ orderId, qty }));

    //or call setCart() to fetch data from server and render cart
    // setCart();
    // console.log(responseData);
  }

  function placeOrder() {
    cart.forEach(async (item) => {
      let value = localStorage.getItem("isAuthorize");
      let { jwtToken } = JSON.parse(value);

      let url =
        "https://ecommerse-app-amxt.onrender.com/ecom/api/order/placeOrder";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify({ cartItemId: item._id }),
      });

      await response.json();
    });

    dispatch(cartAction.emptyCart());
  }

  return (
    <div className={cartItemCss.masterContainer}>
      {cart.length === 0 ? (
        <div className={cartItemCss.emptyCart}>
          <h1>No item Available!</h1>
        </div>
      ) : (
        ""
      )}

      <aside className={cartItemCss.asideContainer}>
        <p> Total Price:- ₹{total} /-</p>
        <button className={cartItemCss.purchaseBtn} onClick={placeOrder}>
          Place Order
        </button>
      </aside>

      <div className={cartItemCss.mainContainer}>
        {cart.map((order, index) => (
          <div key={index} className={cartItemCss.productContainer}>
            <div className={cartItemCss.imageContainer}>
              <img
                className={cartItemCss.productImage}
                alt="product"
                src={`https://ecommerse-app-amxt.onrender.com/features/uploads/images/${order.imageUrl}`}
              />
            </div>
            <div className={cartItemCss.productDetail}>
              <div className={cartItemCss.productName}>
                <p> {order.productName}</p>
              </div>
              <div className={cartItemCss.productPrice}>
                <p>₹ {order.price}</p>
                <img
                  className={cartItemCss.icon}
                  alt="minus"
                  src="./images/minus.png"
                  onClick={() => manageQty(order._id, -1)}
                />
                <p>{order.qty}</p>
                <img
                  className={cartItemCss.icon}
                  alt="minus"
                  src="./images/plus.png"
                  onClick={() => manageQty(order._id, 1)}
                />
              </div>
              <button
                className={cartItemCss.removeCartButton}
                onClick={() => removeFromCart(order._id)}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItems;
