import React from "react";

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  itemVolume: string;
  imageUrls: string[];
  itemNumber?: number;
};

type GroceryItemCardProps = {
  item: GroceryItem;
  isClicked: boolean;
  onAddToCart: (item: GroceryItem) => void;
};

const GroceryItemCard: React.FC<GroceryItemCardProps> = ({
  item,
  isClicked,
  onAddToCart,
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
      <button
        className={`text-lg font-semibold border-2 my-2 border-black rounded-lg py-0.5 px-1 ${
          isClicked ? "bg-green-400" : "bg-transparent"
        }`}
        onClick={() => onAddToCart(item)}
      >
        Add to Cart
      </button>
    </li>
  );
};

export default GroceryItemCard;
