import { useAtom } from "jotai";
import { groceryAtom } from "./utils/state"; // Adjust the import path according to your project structure
import data from "./data/dummy.json";

type GroceryItem = {
    id: number;
    name: string;
    price: number;
    itemVolume: string;
    imageUrls: string[];
  };

const Root = () => {
  // Read the current state of groceryAtom
  const [groceries, setGroceries] = useAtom(groceryAtom);

  // Function to add an item to the grocery list
  const addToGroceryList = (item: GroceryItem) => {
    setGroceries([...groceries, item]);
  };

  const handlePrint = () => {
    console.log("primt", groceries)
  }

  return (
    <div>
      <h2>Grocery List</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.itemVolume}</p>
            <img src={item.imageUrls[0]} alt={item.name} />
            <button onClick={() => addToGroceryList(item)}>Add to Grocery</button>
            <button onClick={handlePrint}>Print groceries</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Root;
