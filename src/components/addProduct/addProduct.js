import React, { useEffect, useState } from "react";
import styles from "./addProduct.module.css"; // Import the CSS module
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/signInreducer/signInReducer";

const AddProduct = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: null,
    stock: "",
    description: "",
  });

  useEffect(() => {
    let value = localStorage.getItem("isAuthorize");
    if (value) {
      let { timeStamp, role, name } = JSON.parse(value);
      if (Date.now() - timeStamp <= 10800000) {
        dispatch(signInAction.signIn());
        dispatch(signInAction.setRole(role));
        dispatch(signInAction.setname(name));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    setProduct({ ...product, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url =
        "https://ecommerse-app-amxt.onrender.com/ecom/api/product/addProduct";
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);
      formData.append("imageUrl", product.imageUrl);

      let value = localStorage.getItem("isAuthorize");
      if (value) {
        let { timeStamp, jwtToken, role, name } = JSON.parse(value);
        if (Date.now() - timeStamp <= 10800000) {
          let response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: jwtToken,
            },
            body: formData,
          });

          let responseData = await response.json();
          toast.success(responseData.msg);
          setProduct({
            name: "",
            category: "",
            price: "",
            imageUrl: null,
            stock: "",
            description: "",
          });
          dispatch(signInAction.signIn());
          dispatch(signInAction.setRole(role));
          dispatch(signInAction.setname(name));
          navigate("/");
        }
      } else {
        navigate("/signIn");
      }
    } catch (error) {
      toast.error("please try again");
    }
  };

  return (
    <div className={styles.addProductForm}>
      <h2 className={styles.heading}>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <select
            id="category"
            name="category"
            className={styles.input}
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Shoes">Shoes</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>
            Image URL
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            className={styles.input}
            onChange={handleImage}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={styles.input}
            value={product.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="stock" className={styles.label}>
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className={styles.input}
            value={product.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className={styles.textarea}
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
