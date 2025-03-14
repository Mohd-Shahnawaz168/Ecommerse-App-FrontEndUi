import signUpCss from "./signUp.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);

  const hangleSignUp = async (e) => {
    e.preventDefault();
    //clear inputs
    const data = {
      name: name,
      email: email,
      password: password,
      role: role,
    };
    let url = "https://ecommerse-app-amxt.onrender.com/ecom/api/user/signUp";
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let responseData = await response.json();

      if (!responseData.success) {
        toast.error(responseData.msg);
        return navigate("/signUp");
      }
      toast.success(responseData.msg);
      navigate("/enterOtp");
    } catch (error) {
      toast.error("something went wrong please try again later");
    }
    setEmail("");
    setPassword("");
    setName("");
    setRole("");
  };

  return (
    <div className={signUpCss.mainContainer}>
      <div className={signUpCss.formContainer}>
        <form className={signUpCss.form} onSubmit={hangleSignUp}>
          <h2 className={signUpCss.text}>Sign Up</h2>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your username"
            required
            className={signUpCss.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your Email"
            required
            className={signUpCss.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className={signUpCss.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            placeholder="Enter your role"
            required
            className={signUpCss.input}
            onChange={(e) => setRole(e.target.value)}
            list="role-options"
          />
          <datalist id="role-options">
            <option value="user" />
            <option value="seller" />
          </datalist>
          <button
            type="button"
            className={signUpCss.btn}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
          <button type="submit" className={signUpCss.btn}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
