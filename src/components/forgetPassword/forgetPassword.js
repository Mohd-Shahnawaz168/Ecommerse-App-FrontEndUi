import enterOtpCss from "./forgetPassword.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  let [email, setEmail] = useState("");
  let navigate = useNavigate();

  async function handleSendMail(e) {
    e.preventDefault();

    let URL =
      "https://ecommerse-app-amxt.onrender.com/ecom/api/user/forgetPassword";
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      let responseData = await response.json();

      if (!responseData.success) {
        return toast.error(responseData.msg);
      } else {
        toast.success(responseData.msg);
        navigate("/forgetPasswordotpVerify");
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
            <p className={enterOtpCss.text}>Enter Your registered E mail</p>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              className={enterOtpCss.input}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className={enterOtpCss.btn}>
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
