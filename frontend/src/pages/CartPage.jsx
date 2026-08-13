import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getMyCart,
  deleteCourseFromCart,
  deleteAllCart,
  checkoutCart,
} from "../services/functions/cart";

import "../components/css/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  async function loadCart() {
    try {
      const response = await getMyCart();

      console.log(response);

      setCart(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleRemove(courseId) {
    try {
      await deleteCourseFromCart(courseId);

      await loadCart();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClearCart() {
    try {
      await deleteAllCart(cart._id);

      setCart(null);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCheckout() {
    try {
      const response = await checkoutCart();

      console.log(response);

      navigate("/myCourses");
    } catch (err) {
      console.log(err);
    }
  }

  const totalPrice =
    cart?.items?.reduce((total, item) => {
      return total + item.price;
    }, 0) || 0;

  return (
    <div className="cart-page">

      <div className="cart-header">
        <div>
          <h1>My Cart</h1>
          <p>Review your courses before checkout</p>
        </div>

        {cart?.items?.length > 0 && (
          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        )}
      </div>


      {cart?.items?.length > 0 ? (
        <div className="cart-layout">

          <div className="cart-items">

            {cart.items.map((item) => (
              <div
                className="cart-item"
                key={item._id}
              >

                {item.course?.image ? (
                  <img
                    src={item.course.image}
                    alt={item.course.title}
                    className="cart-course-image"
                  />
                ) : (
                  <div className="cart-no-image">
                    No Image
                  </div>
                )}


                <div className="cart-item-info">

                  <span className="cart-category">
                    {item.course?.category?.name}
                  </span>

                  <h2>
                    {item.course?.title}
                  </h2>

                  <p>
                    Instructor:{" "}
                    {item.course?.instructor?.username}
                  </p>

                  <p className="cart-item-price">
                    ${item.price}
                  </p>

                </div>


                <button
                  className="remove-cart-btn"
                  onClick={() =>
                    handleRemove(item.course?._id)
                  }
                >
                  Remove
                </button>

              </div>
            ))}

          </div>


          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Courses</span>

              <span>
                {cart.items.length}
              </span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>

              <strong>
                ${totalPrice.toFixed(2)}
              </strong>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={() =>
                navigate("/coursesList")
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>
      ) : (
        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Browse courses and add them to your cart.
          </p>

          <button
            onClick={() =>
              navigate("/coursesList")
            }
          >
            Browse Courses
          </button>

        </div>
      )}

    </div>
  );
};

export default Cart;