import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/signUp";
import NavBar from "./components/Navbar/navBar";
import EnterOTP from "./components/enterOtp/enterOtp";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/Homepage/homepage";
import AddProduct from "./components/addProduct/addProduct";
import CartItems from "./components/cartItem/cartItem";
import MyOrder from "./components/myOrder/myOrder";
import NewPassword from "./components/newPassword.js/newPassword";
import ForgetPassword from "./components/forgetPassword/forgetPassword";
import ForgetPasswordotpVerify from "./components/forgetPasswordOtpverifandcahngePass/forgetPasswordotpVerify";
import Reviews from "./components/Reviews/reviews";
import AddReview from "./components/addReview/addReview";
import UpdateProduct from "./components/UpdateProduct/updateProduct";

import Page404 from "./components/Page404/Page404";

function App() {
  //only SignIn user can access
  function ProtectedRoute({ children }) {
    let value = localStorage.getItem("isAuthorize");
    if (value) {
      let { timeStamp, isLoggedIn } = JSON.parse(value);
      if (Date.now() - timeStamp <= 10800000 || isLoggedIn !== "true") {
        return children;
      } else {
        return <Navigate to="/signIn" />;
      }
    } else {
      return <Navigate to="/signIn" />;
    }
  }

  //if User is already signIn user will not be able to see signIn and SignUp
  function UserLoggedRouter({ children }) {
    let value = localStorage.getItem("isAuthorize");
    if (value) {
      let { timeStamp } = JSON.parse(value);
      if (Date.now() - timeStamp <= 10800000) {
        return <Navigate to="/" />;
      } else {
        return children;
      }
    } else {
      return children;
    }
  }

  //only seller can scces these route
  function SellerRouter({ children }) {
    let value = localStorage.getItem("isAuthorize");
    if (value) {
      let { timeStamp, role } = JSON.parse(value);
      if ((Date.now() - timeStamp <= 10800000) & (role == "seller")) {
        return children;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      return <Navigate to="/" />;
    }
  }

  let route = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      errorElement: <Page404 />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "signIn",
          element: (
            <UserLoggedRouter>
              {" "}
              <SignIn />
            </UserLoggedRouter>
          ),
        },
        {
          path: "signUp",
          element: (
            <UserLoggedRouter>
              <SignUp />
            </UserLoggedRouter>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            <UserLoggedRouter>
              <ForgetPassword />
            </UserLoggedRouter>
          ),
        },
        {
          path: "forgetPasswordotpVerify",
          element: (
            <UserLoggedRouter>
              <ForgetPasswordotpVerify />
            </UserLoggedRouter>
          ),
        },
        { path: "enterOtp", element: <EnterOTP /> },
        {
          path: "cartItem",
          element: (
            <ProtectedRoute>
              <CartItems />
            </ProtectedRoute>
          ),
        },
        {
          path: "myOrder",
          element: (
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          ),
        },
        {
          path: "newPassword",
          element: (
            <ProtectedRoute>
              <NewPassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "addProduct",
          element: (
            <SellerRouter>
              <AddProduct />
            </SellerRouter>
          ),
        },
        {
          path: "reviews/:productId",
          element: <Reviews />,
        },
        {
          path: "addReview/:productId",
          element: <AddReview />,
        },
        {
          path: "updateProduct/:productId",
          element: (
            <SellerRouter>
              <UpdateProduct />
            </SellerRouter>
          ),
        },
      ],
    },
  ]);
  return (
    <RouterProvider
      router={route}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    />
  );
}

export default App;
