import { useState } from "react";
import { useAtom } from "jotai";
import { groceryAtom } from "../../utils/state";
import CartItem from "./CartItem";
import CartHeader from "./CartHeader";
import { useNavigate } from "react-router-dom";

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  itemVolume: string;
  imageUrls: string[];
  itemNumber?: number;
};

const CartList = () => {
  const [groceries, setGroceries] = useAtom(groceryAtom);
  const [isClicked, setIsClicked] = useState<number[]>([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleIncrement = (itemId: number) => {
    setGroceries((prevGroceries) =>
      prevGroceries.map((item) =>
        item.id === itemId
          ? { ...item, itemNumber: (item.itemNumber ?? 0) + 1 }
          : item
      )
    );
  };

  const handleDecrement = (itemId: number) => {
    setGroceries((prevGroceries) =>
      prevGroceries.map((item) =>
        item.id === itemId && (item.itemNumber ?? 0) > 1
          ? { ...item, itemNumber: (item.itemNumber ?? 0) - 1 }
          : item
      )
    );
  };

  const removeFromCartList = (item: GroceryItem) => {
    handleClick(item.id);
    const isItemExist = groceries.some(
      (existingItem) => existingItem.id === item.id
    );
    if (isItemExist) {
      setGroceries((prevGroceries) =>
        prevGroceries.filter((existingItem) => existingItem.id !== item.id)
      );
      alert("This item has been removed from your cart list.");
    } else {
      alert("This item no longer exists in your cart list.");
    }
  };

  const handleClick = (id: number) => {
    setIsClicked((prevIsClicked) => [...prevIsClicked, id]);
    setTimeout(() => {
      setIsClicked((prevIsClicked) =>
        prevIsClicked.filter((itemId) => itemId !== id)
      );
    }, 2000);
  };

  const handleCheckout = () => {
    console.log("Checkout button clicked");
    setShowPopup(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <CartHeader handleCheckout={handleCheckout} />
      {groceries.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="flex w-full flex-wrap mt-5 justify-center">
          {groceries.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              isClicked={isClicked.includes(item.id)}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={removeFromCartList}
            />
          ))}
        </ul>
      )}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 100,
            borderColor: "black",
            borderWidth: "5px",
          }}
        >
          Thank you, for choosing us. Your Cart will arrive in 2 days.
        </div>
      )}
    </div>
  );
};

export default CartList;
