// // import React from 'react';
// import { useAtom } from 'jotai';
// import { groceryAtom } from '../utils/state'; // Adjust the import path according to your project structure

// const Cart = () => {
//   // Read the current state of groceryAtom
//   const [groceries, ] = useAtom(groceryAtom);

//   return (
//     <div>
//       <h2>Your Grocery Cart</h2>
//       <ul>
//         {groceries.map((item) => (
//           <li key={item.id}>
//             <p>{item.name}</p>
//             <p>{item.price}</p>
//             <p>{item.itemVolume}</p>
//             <img src={item.imageUrls[0]} alt={item.name} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Cart;

import { useAtom } from "jotai";
import { groceryAtom } from "../utils/state"; // Adjust the import path according to your project structure
import { useEffect } from "react";

// type GroceryItem = {
//   id: number;
//   name: string;
//   price: number;
//   itemVolume: string;
//   imageUrls: string[];
// };

const Cart = () => {
  const [groceries] = useAtom(groceryAtom);
  const handlePrint = () => {
    console.log("primt", groceries);
  };

  useEffect(() => {
    console.log("Current groceries:", groceries);
  }, [groceries]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={handlePrint}>Print groceries</button>
      {groceries.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {groceries.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.itemVolume}</p>
              <img src={item.imageUrls[0]} alt={item.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
