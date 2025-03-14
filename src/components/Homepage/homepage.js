// import homePageCss from "./homepage.module.css";
// import { useCallback, useEffect, useState } from "react";
// import Items from "../items/items";
// import { useDispatch } from "react-redux";
// import { signInAction } from "../../redux/signInreducer/signInReducer";

// function HomePage() {
//   let [products, setProduct] = useState([]);
//   let [allProduct, setAllproduct] = useState([]);
//   let [categoryFilterExpresion, setcategoryFilterExpresion] = useState([]);
//   let dispatch = useDispatch();

//   let fetchProduct = useCallback(async () => {
//     try {
//       console.log("fetch product");
//       let url =
//         "https://ecommerse-app-amxt.onrender.com/ecom/api/product/getAllProduct";
//       let response = await fetch(url);
//       let responseData = await response.json();
//       console.log(responseData.product);
//       setProduct(responseData.product);
//       setAllproduct(responseData.product);
//       //check is user is LoggedIn or Not
//       let value = localStorage.getItem("isAuthorize");
//       if (value) {
//         let { timeStamp, role, name } = JSON.parse(value);
//         if (Date.now() - timeStamp <= 10800000) {
//           dispatch(signInAction.signIn());
//           dispatch(signInAction.setRole(role));
//           dispatch(signInAction.setname(name));
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   // useEffect(() => {
//   //   console.log("category");
//   //   let filteredProduct = allProduct.filter((item) => {
//   //     return categoryFilterExpresion.includes(item.category);
//   //   });

//   //   setProduct(filteredProduct);
//   //   if (categoryFilterExpresion.length <= 0) {
//   //     fetchProduct();
//   //   }
//   // }, [categoryFilterExpresion]);

//   useEffect(() => {
//     if (categoryFilterExpresion.length > 0) {
//       let filteredProduct = allProduct.filter((item) => {
//         return categoryFilterExpresion.includes(item.category);
//       });

//       setProduct(filteredProduct);
//     } else {
//       fetchProduct();
//     }
//   }, [categoryFilterExpresion, allProduct, fetchProduct]);

//   function categoryFilter(e) {
//     let filterExp = e.target.value;
//     setcategoryFilterExpresion((prevCatFilter) => {
//       //checking if filter expression is available remove it else add it filtering array
//       const newFilter = prevCatFilter.includes(filterExp)
//         ? prevCatFilter.filter((f) => f !== filterExp)
//         : [...prevCatFilter, filterExp];
//       return newFilter;
//     });
//   }

//   function textSearch(text) {
//     let searchText = text.toLowerCase();

//     let searched = [];
//     allProduct.forEach((item) => {
//       let splitDescription = item.description.toLowerCase().split(" ");
//       let matched = splitDescription.filter((desc) => {
//         return desc.includes(searchText);
//       });

//       if (matched.length > 0) {
//         searched.push({ ...item });
//       }
//     });

//     setProduct(searched);

//     if (searchText === "") {
//       fetchProduct();
//     }
//   }

//   //show loading until fetchin data from server
//   if (allProduct.length <= 0) {
//     return (
//       <div className={homePageCss.spinnerContainer}>
//         <div className={homePageCss.spinner}></div>
//       </div>
//     );
//   }
//   return (
//     <>
//       <div className={homePageCss.mainContainer}>
//         <aside className={homePageCss.filteraside}>
//           <h2>Filter</h2>
//           <div className={homePageCss.filterdiv}>
//             <div className={homePageCss.catDiv}>
//               <h2>Category</h2>
//             </div>

//             <div className={homePageCss.checkDiv}>
//               <input
//                 type="checkbox"
//                 id="Electronics"
//                 name="Electronics"
//                 value="Electronics"
//                 className={homePageCss.checkbox}
//                 onClick={categoryFilter}
//               />
//               <label htmlFor="Electronics">Electronics</label>
//             </div>
//             <div className={homePageCss.checkDiv}>
//               <input
//                 type="checkbox"
//                 id="Mobile"
//                 name="Mobile"
//                 value="Mobile"
//                 className={homePageCss.checkbox}
//                 onClick={categoryFilter}
//               />
//               <label htmlFor="Mobile">Mobile</label>
//             </div>
//             <div className={homePageCss.checkDiv}>
//               <input
//                 type="checkbox"
//                 id="Shoes"
//                 name="Shoes"
//                 value="Shoes"
//                 className={homePageCss.checkbox}
//                 onClick={categoryFilter}
//               />
//               <label htmlFor="Shoes">Shoes</label>
//             </div>
//             <div className={homePageCss.checkDiv}>
//               <input
//                 type="checkbox"
//                 id="Furniture"
//                 name="Furniture"
//                 value="Furniture"
//                 className={homePageCss.checkbox}
//                 onClick={categoryFilter}
//               />
//               <label htmlFor="Furniture">Furniture</label>
//             </div>

//             <div className={homePageCss.checkDiv}>
//               <input
//                 type="checkbox"
//                 id="Clothing"
//                 name="Clothing"
//                 value="Clothing"
//                 className={homePageCss.checkbox}
//                 onClick={categoryFilter}
//               />
//               <label htmlFor="Clothing">Clothing</label>
//             </div>
//           </div>
//         </aside>

//         <form className={homePageCss.searchForm}>
//           <input
//             className={homePageCss.searchInput}
//             type="search"
//             placeholder="Search By Name"
//             onChange={(e) => {
//               textSearch(e.target.value);
//             }}
//           />
//         </form>
//         <div className={homePageCss.itemDiv}>
//           {products.map((product, index) => (
//             <Items key={index} product={product} fetchProduct={fetchProduct} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default HomePage;

import homePageCss from "./homepage.module.css";
import { useCallback, useEffect, useState } from "react";
import Items from "../items/items";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/signInreducer/signInReducer";

function HomePage() {
  let [products, setProduct] = useState([]);
  let [allProduct, setAllproduct] = useState([]);
  let [categoryFilterExpresion, setcategoryFilterExpresion] = useState([]);
  let dispatch = useDispatch();

  let fetchProduct = useCallback(async () => {
    try {
      let url =
        "https://ecommerse-app-amxt.onrender.com/ecom/api/product/getAllProduct";
      let response = await fetch(url);
      let responseData = await response.json();

      setProduct(responseData.product);
      setAllproduct(responseData.product);
      console.log("fetch product");
      //check is user is LoggedIn or Not
      let value = localStorage.getItem("isAuthorize");
      if (value) {
        let { timeStamp, role, name } = JSON.parse(value);
        if (Date.now() - timeStamp <= 10800000) {
          dispatch(signInAction.signIn());
          dispatch(signInAction.setRole(role));
          dispatch(signInAction.setname(name));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (categoryFilterExpresion.length > 0) {
      let filteredProduct = allProduct.filter((item) => {
        return categoryFilterExpresion.includes(item.category);
      });

      setProduct(filteredProduct);
    } else {
      fetchProduct();
    }
  }, [categoryFilterExpresion]);

  function categoryFilter(e) {
    let filterExp = e.target.value;
    setcategoryFilterExpresion((prevCatFilter) => {
      //checking if filter expression is available remove it else add it filtering array
      const newFilter = prevCatFilter.includes(filterExp)
        ? prevCatFilter.filter((f) => f !== filterExp)
        : [...prevCatFilter, filterExp];
      return newFilter;
    });
  }

  function textSearch(text) {
    let searchText = text.toLowerCase();

    let searched = [];
    allProduct.forEach((item) => {
      let splitDescription = item.description.toLowerCase().split(" ");
      let matched = splitDescription.filter((desc) => {
        return desc.includes(searchText);
      });

      if (matched.length > 0) {
        searched.push({ ...item });
      }
    });

    setProduct(searched);

    if (searchText === "") {
      fetchProduct();
    }
  }

  //show loading until fetchin data from server
  if (allProduct.length <= 0) {
    return (
      <div className={homePageCss.spinnerContainer}>
        <div className={homePageCss.spinner}></div>
      </div>
    );
  }
  return (
    <>
      <div className={homePageCss.mainContainer}>
        <aside className={homePageCss.filteraside}>
          <h2>Filter</h2>
          <div className={homePageCss.filterdiv}>
            <div className={homePageCss.catDiv}>
              <h2>Category</h2>
            </div>

            <div className={homePageCss.checkDiv}>
              <input
                type="checkbox"
                id="Electronics"
                name="Electronics"
                value="Electronics"
                className={homePageCss.checkbox}
                onClick={categoryFilter}
              />
              <label htmlFor="Electronics">Electronics</label>
            </div>
            <div className={homePageCss.checkDiv}>
              <input
                type="checkbox"
                id="Mobile"
                name="Mobile"
                value="Mobile"
                className={homePageCss.checkbox}
                onClick={categoryFilter}
              />
              <label htmlFor="Mobile">Mobile</label>
            </div>
            <div className={homePageCss.checkDiv}>
              <input
                type="checkbox"
                id="Shoes"
                name="Shoes"
                value="Shoes"
                className={homePageCss.checkbox}
                onClick={categoryFilter}
              />
              <label htmlFor="Shoes">Shoes</label>
            </div>
            <div className={homePageCss.checkDiv}>
              <input
                type="checkbox"
                id="Furniture"
                name="Furniture"
                value="Furniture"
                className={homePageCss.checkbox}
                onClick={categoryFilter}
              />
              <label htmlFor="Furniture">Furniture</label>
            </div>

            <div className={homePageCss.checkDiv}>
              <input
                type="checkbox"
                id="Clothing"
                name="Clothing"
                value="Clothing"
                className={homePageCss.checkbox}
                onClick={categoryFilter}
              />
              <label htmlFor="Clothing">Clothing</label>
            </div>
          </div>
        </aside>

        <form className={homePageCss.searchForm}>
          <input
            className={homePageCss.searchInput}
            type="search"
            placeholder="Search By Name"
            onChange={(e) => {
              textSearch(e.target.value);
            }}
          />
        </form>
        <div className={homePageCss.itemDiv}>
          {products.map((product, index) => (
            <Items key={index} product={product} fetchProduct={fetchProduct} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
