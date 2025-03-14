import NavCss from "./navBar.module.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  signInAction,
  signInSelector,
} from "../../redux/signInreducer/signInReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [showMenu, setShowMenu] = useState(false);

  let { signIn, role, name } = useSelector(signInSelector);

  function handleLogout() {
    dispatch(signInAction.logOut());
    localStorage.clear("isAuthorize");
    navigate("/");
  }

  return (
    <>
      <div className={NavCss.navMain}>
        <div className={NavCss.NavContainer}>
          <div className={NavCss.textDiv}>
            <Link to="/">
              <p className={NavCss.textPP}>Shop Sphere</p>
            </Link>
          </div>

          <div className={NavCss.homeDiv}>
            <img src="./images/Home.png" alt="home" className={NavCss.icons} />
            <Link to="/">
              <p className={NavCss.textP}>Home</p>
            </Link>
          </div>

          {signIn & (role == "user") ? (
            <div className={NavCss.signupDiv}>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/my order.png"
                  alt="myorder"
                  className={NavCss.icons}
                />
                <Link to="/myOrder">
                  <p className={NavCss.textP}>My Orders</p>
                </Link>
              </div>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/cart.png"
                  alt="cart"
                  className={NavCss.icons}
                />
                <Link to="/cartItem">
                  <p className={NavCss.textP}>cart</p>
                </Link>
              </div>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/logout.png"
                  alt="logout"
                  className={NavCss.icons}
                />
                <p className={NavCss.textP} onClick={handleLogout}>
                  Logout
                </p>
              </div>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/profile Logo.jpg"
                  alt="profile"
                  className={NavCss.icons}
                />
                <p className={NavCss.textP}>{name}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {signIn & (role == "seller") ? (
            <>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/addProduct.png"
                  alt="addProduct"
                  className={NavCss.icons}
                />
                <Link to="/addProduct">
                  <p className={NavCss.textP}>Add Product</p>
                </Link>
              </div>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/logout.png"
                  alt="logout"
                  className={NavCss.icons}
                />
                <p className={NavCss.textP} onClick={handleLogout}>
                  Logout
                </p>
              </div>
              <div className={NavCss.innerDiv}>
                <img
                  src="./images/profile Logo.jpg"
                  alt="profile"
                  className={NavCss.icons}
                />
                <p className={NavCss.textP}>{name}</p>
              </div>
            </>
          ) : (
            ""
          )}

          {!signIn ? (
            <>
              <div className={NavCss.signinDiv}>
                <img
                  src="./images/signin.png"
                  alt="signin"
                  className={NavCss.icons}
                />
                <Link to="/signIn">
                  <p className={NavCss.textP}>SignIn</p>
                </Link>
              </div>{" "}
              <div className={NavCss.signinDiv}>
                <img
                  src="./images/signUp1.png"
                  alt="signUp"
                  className={NavCss.icons}
                />
                <Link to="/signUp">
                  <p className={NavCss.textP}>SignUp</p>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className={NavCss.HamBurgerDiv}>
          <div className={NavCss.textDiv}>
            <Link to="/">
              <p className={NavCss.textPP}>Shop Sphere</p>
            </Link>
          </div>
          {showMenu ? (
            <table className={NavCss.hambTable}>
              {signIn & (role == "user") ? (
                <tr className={NavCss.signupDivHamb}>
                  <td>
                    <button className={NavCss.tabBtn}>
                      <p
                        className={NavCss.tableP}
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        {name}
                      </p>
                    </button>
                    <button className={NavCss.tabBtn}>
                      <Link to="/myOrder">
                        <p className={NavCss.tableP}>My Orders</p>
                      </Link>
                    </button>
                    <button className={NavCss.tabBtn}>
                      <Link to="/cartItem">
                        <p className={NavCss.tableP}>cart</p>
                      </Link>
                    </button>
                    <button className={NavCss.tabBtn}>
                      <p className={NavCss.tableP} onClick={handleLogout}>
                        Logout
                      </p>
                    </button>
                  </td>
                </tr>
              ) : (
                ""
              )}

              {signIn & (role == "seller") ? (
                <tr>
                  <td>
                    <button className={NavCss.tabBtn}>
                      <p
                        className={NavCss.tableP}
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        {name}
                      </p>
                    </button>
                    <button className={NavCss.tabBtn}>
                      <Link to="/addProduct">
                        <p className={NavCss.tableP}>Add Product</p>
                      </Link>
                    </button>

                    <button className={NavCss.tabBtn}>
                      <p className={NavCss.tableP} onClick={handleLogout}>
                        Logout
                      </p>
                    </button>
                  </td>
                </tr>
              ) : (
                ""
              )}

              {!signIn ? (
                <tr>
                  <td>
                    <button className={NavCss.tabBtn}>
                      <p
                        className={NavCss.tableP}
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Home
                      </p>
                    </button>
                    <button className={NavCss.tabBtn}>
                      <Link to="/signIn">
                        <p className={NavCss.tableP}>SignIn</p>
                      </Link>
                    </button>

                    <button className={NavCss.tabBtn}>
                      <Link to="/signUp">
                        <p className={NavCss.tableP}>SignUp</p>
                      </Link>
                    </button>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </table>
          ) : (
            <div className={NavCss.homeDiv}>
              <img
                src="./images/hamburgbtn.png"
                alt="Icon"
                className={NavCss.HamIcon}
                onClick={() => setShowMenu(!showMenu)}
              />
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
