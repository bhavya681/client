import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = (props) => {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingItemInCart = localStorage.getItem("cart");
    if (existingItemInCart) setCart(JSON.parse(existingItemInCart));
  }, []);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};

export default CartProvider;
