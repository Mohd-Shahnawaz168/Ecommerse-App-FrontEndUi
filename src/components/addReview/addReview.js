import React, { useState } from "react";
import { toast } from "react-toastify";
import addReviewCss from "./addReview.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddReview() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let { productId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment) {
      setErrorMessage("Comment are required fields.");
      return;
    }

    const newReview = {
      productId: productId,
      rating: parseInt(rating, 10),
      comment,
    };

    let value = localStorage.getItem("isAuthorize");

    if (value) {
      let { jwtToken } = JSON.parse(value);
      const url = `https://ecommerse-app-amxt.onrender.com/ecom/api/review/addReview`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify(newReview),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setRating(5);
            setComment("");
            setErrorMessage("");
            setSuccessMessage("Review added successfully!");
            toast.success("Review added!");
            navigate(-1);
          } else {
            setErrorMessage("Failed to add review. Please try again.");
            toast.error("Failed to add review.");
          }
        })
        .catch((error) => {
          setErrorMessage("An error occurred. Please try again.");
          toast.error("An error occurred.");
          console.error("Error adding review:", error);
        });
    }

    // Replace this URL with the actual endpoint to submit the review
  };

  return (
    <div className={addReviewCss.addReviewContainer}>
      <h2 className={addReviewCss.addReviewTitle}>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div className={addReviewCss.addReviewField}>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className={addReviewCss.addReviewField}>
          <label htmlFor="comment">Your Review</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here"
          />
        </div>

        <button type="submit" className={addReviewCss.submitButton}>
          Submit Review
        </button>
      </form>

      {errorMessage && (
        <p className={addReviewCss.errorMessage}>{errorMessage}</p>
      )}
      {successMessage && (
        <p className={addReviewCss.successMessage}>{successMessage}</p>
      )}
    </div>
  );
}

export default AddReview;
