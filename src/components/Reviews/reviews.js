import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import reviewCss from "./reviews.module.css";

function Reviews() {
  let { productId } = useParams();
  let [item, setItem] = useState({});
  let [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    let url = `https://ecommerse-app-amxt.onrender.com/ecom/api/product/getProductById/${productId}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItem(data.product);
      })
      .catch((error) => {
        toast.error("Failed to load product data.");
        console.error("Error fetching product data:", error);
      });
  }, [productId]);

  const handleReviewToggle = () => {
    setShowReviews(!showReviews);
  };

  return (
    <>
      <div className={reviewCss.productContainer}>
        <div className={reviewCss.imageContainer}>
          <img
            className={reviewCss.productImage}
            alt="product"
            src={`https://ecommerse-app-amxt.onrender.com/features/uploads/images/${item.imageUrl}`}
          />
        </div>
        <div className={reviewCss.productDetail}>
          <div className={reviewCss.productName}>
            <p>{item.name}</p>
          </div>
          <div className={reviewCss.Description}>
            <p>Description:-</p>
            <p>{item.description}</p>
          </div>
          <div className={reviewCss.productPrice}>
            <p>Price ₹ {item.price}</p>
          </div>
          <div className={reviewCss.productPrice}>
            <p onClick={handleReviewToggle} className={reviewCss.reviewsToggle}>
              Reviews {item.reviews?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {showReviews && (
        <div className={reviewCss.productReview}>
          {item.reviews && item.reviews.length > 0 ? (
            item.reviews.map((review, index) => (
              <div key={index} className={reviewCss.Description}>
                <p className={reviewCss.reviewName}>{review.name}</p>
                <p className={reviewCss.reviewRating}>
                  Rating: {review.rating} ⭐
                </p>
                <p className={reviewCss.reviewComment}>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}
    </>
  );
}

export default Reviews;
