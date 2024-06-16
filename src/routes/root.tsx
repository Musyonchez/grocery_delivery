// import React from "react";
import { useAtom } from "jotai";
import { groceryAtom } from "../utils/state"; // Adjust the import path according to your project structure
import data from "../data/dummy.json";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useState } from "react";

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  itemVolume: string;
  imageUrls: string[];
  itemNumber?: number;
};

const Root = () => {
  const [groceries, setGroceries] = useAtom(groceryAtom);
  const [isClicked, setIsClicked] = useState<number[]>([]); // Initialize as an empty array

  const addToGroceryList = (item: GroceryItem) => {
    handleClick(item.id);
    const isItemExist = groceries.some(
      (existingItem) => existingItem.id === item.id
    );
    if (isItemExist) {
      alert("This item already exists in your groceries list.");
      return groceries; // Return the previous state to avoid any updates
    } else {
      const itemWithDefaultNumber = {
        ...item,
        itemNumber: item.itemNumber ?? 1,
      };
      setGroceries((prevGroceries) => [
        ...prevGroceries,
        itemWithDefaultNumber,
      ]);
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
        <h2 className=" w-full justify-center flex text-3xl font-extrabold">
          Grocery List
        </h2>
        <Link className=" flex" to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </Link>
      </div>
      <ul className=" flex w-full flex-wrap mt-5 justify-center">
        {data.map((item) => (
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
            <p className=" text-lg font-semibold">Volume : {item.itemVolume}</p>
            <button
              className={`text-lg font-semibold border-2 my-2 border-black rounded-lg py-0.5 px-1 ${
                isClicked.includes(item.id) ? "bg-green-400" : "bg-transparent"
              }`}
              onClick={() => addToGroceryList(item)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Root;
