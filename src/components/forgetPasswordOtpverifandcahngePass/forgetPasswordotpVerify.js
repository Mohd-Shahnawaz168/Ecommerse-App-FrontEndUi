import enterOtpCss from "./forgetPasswordotpVerify.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPasswordotpVerify() {
  let [password, setPassword] = useState("");
  let [OTP, setOTP] = useState("");
  let navigate = useNavigate();

  async function handleSendMail(e) {
    e.preventDefault();

    let URL =
      "https://ecommerse-app-amxt.onrender.com/ecom/api/user/forgetPasswordOTP";
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OTP: OTP, password: password }),
      });

      let responseData = await response.json();

      if (!responseData.success) {
        return toast.error(responseData.msg);
      } else {
        toast.success(responseData.msg);
        navigate("/signIn");
      }
    } catch (error) {
      toast.error("please try again later");
    }
  }

  return (
    <>
      <div className={enterOtpCss.mainContainer}>
        <div className={enterOtpCss.formContainer}>
          <form className={enterOtpCss.form} onSubmit={handleSendMail}>
            <p className={enterOtpCss.text}>Change Password</p>
            <input
              type="text"
              id="OTP"
              name="OTP"
              placeholder="Enter your OTP"
              required
              value={OTP}
              className={enterOtpCss.input}
              onChange={(e) => setOTP(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              required
              value={password}
              className={enterOtpCss.input}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className={enterOtpCss.btn}>
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPasswordotpVerify;
