import newPasswordCss from "./newPassword.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/signInreducer/signInReducer";

function NewPassword() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [newPassword, setNewPassword] = useState("");
  async function handleChangePassword(e) {
    e.preventDefault();
    let value = localStorage.getItem("isAuthorize");

    let { jwtToken } = JSON.parse(value);

    let URL =
      "https://ecommerse-app-amxt.onrender.com/ecom/api/user/changePassword";
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify({ newPassword: newPassword }),
      });

      let responseData = await response.json();

      if (!responseData.success) {
        return toast.error(responseData.msg);
      } else {
        toast.success(responseData.msg);
        navigate("/");
      }
    } catch (error) {
      toast.error("please try again later");
    }
  }

  useEffect(() => {
    let value = localStorage.getItem("isAuthorize");
    if (value) {
      let { timeStamp } = JSON.parse(value);
      if (Date.now() - timeStamp <= 10800000) {
        dispatch(signInAction.signIn());
      }
    }
  }, []);

  return (
    <>
      <div className={newPasswordCss.mainContainer}>
        <div className={newPasswordCss.formContainer}>
          <form className={newPasswordCss.form} onSubmit={handleChangePassword}>
            <p className={newPasswordCss.text}>Enter Your New Password</p>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your Password"
              required
              className={newPasswordCss.input}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit" className={newPasswordCss.btn}>
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
