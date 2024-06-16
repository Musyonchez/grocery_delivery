import { useAtom } from "jotai";
import { groceryAtom } from "../utils/state";
import { Link } from "react-router-dom";
import { useState } from "react";

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  itemVolume: string;
  imageUrls: string[];
  itemNumber?: number;
};

const Cart = () => {
  const [groceries, setGroceries] = useAtom(groceryAtom);
  const [isClicked, setIsClicked] = useState<number[]>([]); // Initialize as an empty array

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
    setIsClicked((prevIsClicked) => [...prevIsClicked, id]); // Add the clicked ID to the array
    setTimeout(() => {
      setIsClicked((prevIsClicked) =>
        prevIsClicked.filter((itemId) => itemId !== id)
      ); // Remove the ID after 2 seconds
    }, 2000); // Duration of 2000 milliseconds (2 seconds)
  };

  return (
    <div className=" flex flex-col w-full min-h-screen">
      <div className=" flex w-full px-4 pt-2">
        <Link className=" flex" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
        <h2 className=" w-full justify-center flex text-3xl font-extrabold">
          Shopping Cart
        </h2>
      </div>
      {groceries.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className=" flex w-full flex-wrap mt-5 justify-center">
          {groceries.map((item) => (
            <li
              key={item.id}
              className=" flex flex-col ml-5 mb-5 bg-blue-200 px-5 pt-5"
            >
              <img
                src={item.imageUrls[0]}
                alt={item.name}
                style={{ width: "150px", height: "150px" }} // Inline styles for exact size
              />
              <p className=" text-lg font-semibold">Name : {item.name}</p>
              <p className=" text-lg font-semibold">Price : {item.price}</p>
              <p className=" text-lg font-semibold">
                Volume : {item.itemVolume}
              </p>
              <div className=" flex w-full justify-between items-center">
                <button
                  className=" text-lg font-semibold border-2 my-2 border-black rounded-full py-0.5 w-8 justify-center flex bg-red-400"
                  onClick={() => handleDecrement(item.id)}
                  disabled={(item.itemNumber ?? 0) <= 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <p>{item.itemNumber ?? 0}</p>
                <button
                  className=" text-lg font-semibold border-2 my-2 border-black rounded-full py-0.5 w-8 justify-center flex bg-green-400"
                  onClick={() => handleIncrement(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <button
              className={`text-lg font-semibold border-2 my-2 border-black rounded-lg py-0.5 px-1 ${
                isClicked.includes(item.id) ? "bg-green-400" : "bg-transparent"
              }`}
              onClick={() => removeFromCartList(item)}
            >
              Remove from Cart
            </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
