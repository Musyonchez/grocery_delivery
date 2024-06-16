import React from "react";

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  itemVolume: string;
  imageUrls: string[];
  itemNumber?: number;
};

type CartItemProps = {
  item: GroceryItem;
  isClicked: boolean;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (item: GroceryItem) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  isClicked,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <li className="flex flex-col ml-5 mb-5 bg-blue-200 px-5 pt-5">
      <img
        src={item.imageUrls[0]}
        alt={item.name}
        style={{ width: "150px", height: "150px" }}
      />
      <p className="text-lg font-semibold">Name: {item.name}</p>
      <p className="text-lg font-semibold">Price: {item.price}</p>
      <p className="text-lg font-semibold">Volume: {item.itemVolume}</p>
      <div className="flex w-full justify-between items-center">
        <button
          className="text-lg font-semibold border-2 my-2 border-black rounded-full py-0.5 w-8 justify-center flex bg-red-400"
          onClick={() => onDecrement(item.id)}
          disabled={(item.itemNumber ?? 0) <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <p>{item.itemNumber ?? 0}</p>
        <button
          className="text-lg font-semibold border-2 my-2 border-black rounded-full py-0.5 w-8 justify-center flex bg-green-400"
          onClick={() => onIncrement(item.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <button
        className={`text-lg font-semibold border-2 my-2 border-black rounded-lg py-0.5 px-1 ${
          isClicked ? "bg-green-400" : "bg-transparent"
        }`}
        onClick={() => onRemove(item)}
      >
        Remove from Cart
      </button>
    </li>
  );
};

export default CartItem;
