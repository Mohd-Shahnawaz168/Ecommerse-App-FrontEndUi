import itemCss from "./items.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInSelector } from "../../redux/signInreducer/signInReducer";
function Items(props) {
  const { product, fetchProduct } = props;
  let [isadding, setIsAdding] = useState(false);
  let { role } = useSelector(signInSelector);
  let navigate = useNavigate();

  async function addToCart() {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);

    //check is user is LoggedIn or Not
    let value = localStorage.getItem("isAuthorize");
    if (!value) {
      return navigate("/signIn");
    }
    let { timeStamp, isLoggedIn, jwtToken } = JSON.parse(value);

    if (Date.now() - timeStamp > 10800000 || isLoggedIn !== "true") {
      toast.error("Session Expired please Login ");
      return navigate("/signIn");
    }

    let data = {
      productId: product._id,
      qty: 1,
      price: product.price,
      productName: product.name,
      imageUrl: product.imageUrl,
    };

    let url = "https://ecommerse-app-amxt.onrender.com/ecom/api/cart/addToCart";
    let body = JSON.stringify(data);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken,
      },
      body: body,
    });
    let responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData.msg);
    } else {
      toast.error(responseData.msg);
    }
  }

  async function deleteProduct(productId) {
    //check is user is LoggedIn or Not
    let value = localStorage.getItem("isAuthorize");
    if (!value) {
      return navigate("/signIn");
    }
    let { timeStamp, isLoggedIn, jwtToken } = JSON.parse(value);

    if (Date.now() - timeStamp > 10800000 || isLoggedIn !== "true") {
      toast.error("Session Expired please Login ");
      return navigate("/signIn");
    }

    let url = `https://ecommerse-app-amxt.onrender.com/ecom/api/product/deleteProduct/${productId}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken,
      },
    });

    let responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData.msg);
      fetchProduct();
    } else {
      toast.error(responseData.msg);
    }
  }

  return (
    <div className={itemCss.productContainer}>
      <div className={itemCss.imageContainer}>
        <img
          className={itemCss.productImage}
          alt="product"
          src={`https://ecommerse-app-amxt.onrender.com/features/uploads/images/${product.imageUrl}`}
        />
      </div>
      <div className={itemCss.productDetail}>
        <div className={itemCss.productName}>
          <Link to={`reviews/${product._id}`}>
            <p>{product.name}</p>
          </Link>
        </div>
        <div className={itemCss.productPrice}>
          <p>₹ {product.price}</p>

          <p className={itemCss.reviewP}> Review {product.reviews.length}</p>
        </div>

        {role === "seller" ? (
          <>
            <Link to={`/updateProduct/${product._id}`}>
              <button className={itemCss.updateBtn}>Update</button>
            </Link>
            <button
              className={itemCss.deleteBtn}
              onClick={() => deleteProduct(product._id)}
            >
              Delete
            </button>
          </>
        ) : (
          <button className={itemCss.addCartButton} onClick={addToCart}>
            {isadding ? "Adding" : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Items;
