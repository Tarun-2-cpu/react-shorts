import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './shopping.css';

export const ShoppingCart = () => {

    const[items,setItems] = useState([]);

    const AddItem = () => {
      const newItem = {
        id: uuidv4(),
        name: `item ${items.length + 1}`,
        quantity: 1,
        price: Math.floor (Math.random() * 100) + 1 
      }
      setItems([...items,newItem]);
    }
  
    const removeItem = (id) => {
        
      const updatedItem = items.filter(item => item.id !== id);
      setItems(updatedItem);
    }
    
    const increaseQuantity = (id) => {
      const updatedItem = items.map( item => item.id === id ? {...item,quantity: item.quantity + 1} : item )
      setItems(updatedItem);
    }
  
    const decreaseQuantity = (id) => {
        const updatedItems = items.map(item => {
          if (item.id === id) {
            // Ensure quantity does not go below 1
            const newQuantity = Math.max(item.quantity - 1, 1);
            return { ...item, quantity: newQuantity };
          } else {
            return item;
          }
        });
        setItems(updatedItems);
    };
      
  
    const calculateTotalCost = () => {
      return items.reduce ((total , item) => total + (item.quantity * item.price), 0 )
    }
  
  
  return (
    <div className="App">
      <h4>Shopping Cart</h4> <br/>

      <button onClick={AddItem} className="add">Add Item</button>

      <ul>
        {items.map(item => (
          <li className = "list" key = {item.id}>
            <span className="item-name">{item.name}</span>  
            <button onClick ={()=>increaseQuantity(item.id)} className="plus"> + </button>
            <span className="item-quantity">{item.quantity}</span>
            <button onClick={() => decreaseQuantity (item.id)} className = "minus"> - </button>
            <button onClick={()=> removeItem (item.id)} className="remove">Remove</button>
          </li>
        ))}
      </ul>
      <div className = "total">
        <p classNmae="items"><b>Total Items: {items.length}</b></p>
        <p classNmae="cost"><b>Total Cost: ${calculateTotalCost()}</b></p>
      </div>  
    </div>
  )
}
