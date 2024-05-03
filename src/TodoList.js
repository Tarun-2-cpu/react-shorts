import React, {useState } from 'react';
import './shopping.css';

function TodoList() {

    const [todos,setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    const addTodo = () => {
        if (inputValue.trim() !== ''){
            const newTodo =  {
                id: todos.length+1,
                text: inputValue,
                completed: false               
            };

            setTodos([...todos,newTodo]);
            setInputValue('');
        }
    } 
    
    const removeTodo = (id) => {
        const updatedTodo = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodo);
    }

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo => todo.id === id ? {...todo,completed: !todo.completed}:todo)
        setTodos(updatedTodos);
    };

    return (
        <div>
          <h4>To-Do List</h4> <br/>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter new Task"
            className="input"
          />
          <button className="add" style={{padding:"8px 15px", marginLeft:"10px"}} onClick={addTodo}>Add</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="list" style={{width:"300px", marginLeft:"0px"}}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="check"
                />
                <span
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        textShadow: todo.completed ? "0 0 1px black" : "none"
                    }}
                    className="text"
                >
                  {todo.text}
                </span>
                <button className="remove" onClick={() => removeTodo(todo.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      );
       
}

export default TodoList