import enterOtpCss from "./enterOtp.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EnterOTP() {
  let [OTP, setOtp] = useState("");
  let navigate = useNavigate();

  async function handleValidateOtp(e) {
    e.preventDefault();
    let URL = "https://ecommerse-app-amxt.onrender.com/ecom/api/user/signUpOtp";
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OTP: OTP }),
      });

      let responseData = await response.json();

      if (!responseData.success) {
        return toast.error(responseData.msg);
      } else {
        toast.success(responseData.msg);
      }
    } catch (error) {
      toast.error("please try again later");
    }
    navigate("/signIn");
  }

  return (
    <>
      <div className={enterOtpCss.mainContainer}>
        <div className={enterOtpCss.formContainer}>
          <form className={enterOtpCss.form} onSubmit={handleValidateOtp}>
            <h2 className={enterOtpCss.text}>Enter OTP</h2>
            <input
              type="text"
              id="OTP"
              name="OTP"
              placeholder="Enter your OTP"
              required
              className={enterOtpCss.input}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button type="submit" className={enterOtpCss.btn}>
              Submit OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EnterOTP;
