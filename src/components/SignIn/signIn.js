import signInCss from "./signIn.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInAction } from "../../redux/signInreducer/signInReducer";
import { useDispatch } from "react-redux";

function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //handle SignInlogic
  const handleSignIn = async (e) => {
    e.preventDefault();
    let URL = "https://ecommerse-app-amxt.onrender.com/ecom/api/user/signIn";
    let body = { email, password };
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let responseData = await response.json();
      if (!responseData.success) {
        toast.error(responseData.msg);
      } else {
        dispatch(signInAction.userData(responseData));
        dispatch(signInAction.signIn());
        dispatch(signInAction.setRole(responseData.userdata.role));
        dispatch(signInAction.setname(responseData.userdata.name));
        let timeStamp = Date.now();
        let isLoggedIn = "true";
        localStorage.setItem(
          "isAuthorize",
          JSON.stringify({
            timeStamp,
            isLoggedIn,
            jwtToken: responseData.token,
            role: responseData.userdata.role,
            name: responseData.userdata.name,
          })
        );

        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      toast.error("Somethig went wrong please try again later");
    }
  };

  return (
    <>
      <div className={signInCss.mainContainer}>
        <div className={signInCss.formContainer}>
          <form className={signInCss.form} onSubmit={handleSignIn}>
            <h2 className={signInCss.text}>Sign In</h2>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your username"
              required
              value={email}
              className={signInCss.input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              className={signInCss.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={signInCss.btn}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            <button type="submit" className={signInCss.btn}>
              Sign in
            </button>
          </form>
          <Link to="/forgetPassword">
            <p className={signInCss.insted}>Forget password</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
