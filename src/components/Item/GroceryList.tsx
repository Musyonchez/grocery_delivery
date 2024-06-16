import { useState } from "react";
import GroceryItemCard from "./GroceryItemCard";
import data from "../../data/dummy.json";
import { useAtom } from "jotai";
import { groceryAtom } from "../../utils/state";
import GroceryHeader from "./GroceryHeader";

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  itemVolume: string;
  imageUrls: string[];
  itemNumber?: number;
};

const GroceryList = () => {
  const [groceries, setGroceries] = useAtom(groceryAtom);
  const [isClicked, setIsClicked] = useState<number[]>([]);

  const handleClick = (id: number) => {
    setIsClicked((prevIsClicked) => [...prevIsClicked, id]);
    setTimeout(() => {
      setIsClicked((prevIsClicked) =>
        prevIsClicked.filter((itemId) => itemId !== id)
      );
    }, 2000);
  };

  const addToGroceryList = (item: GroceryItem) => {
    handleClick(item.id);
    const isItemExist = groceries.some(
      (existingItem) => existingItem.id === item.id
    );
    if (isItemExist) {
      alert("This item already exists in your groceries list.");
      return groceries;
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

  return (
    <div className=" flex flex-col w-full min-h-screen">
      <div className=" flex w-full px-4 pt-2">
        <h2 className=" w-full justify-center flex text-3xl font-extrabold">
          Grocery List
        </h2>
        <GroceryHeader />
      </div>
      <ul className="flex w-full flex-wrap mt-5 justify-center">
        {data.map((item) => (
          <GroceryItemCard
            key={item.id}
            item={item}
            isClicked={isClicked.includes(item.id)}
            onAddToCart={addToGroceryList}
          />
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
