import React, { useState,useEffect } from 'react';
import './todolist.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Employee from '../Employee/Employee';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  console.log('todo',todos)
  const [completedTodos, setCompletedTodos] = useState([]);
  console.log('todo',completedTodos)
  const [newTodo, setNewTodo] = useState('');
  const { uuid } = useParams();

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };
  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedTodos = [...todos];
    updatedTodos[index].priority = value;
    setTodos(updatedTodos);
  };
  

 

  const handleAddTodo = async () => {
    try {
      if (newTodo.trim() === '') {
        return;
      }
  
      const currentDate = new Date().toISOString().slice(0, 10);
  
      const enddate = new Date().toISOString().slice(0, 10);
  
      const newTodoItem = {
        EmployeeID:uuid,
        text: newTodo,
        startdate: currentDate,
        enddate: enddate,
        progress: '',
        notes: '',
        completed: '',
        priority: '',
      };
  
      // Send POST request to backend endpoint to save new todo
      const response = await axios.post('http://localhost:5000/todos', newTodoItem);
      
      // Update state with the newly saved todo
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async(index) => {
    // Check if index is valid
    if (index < 0 || index >= todos.length) {
      console.error('Invalid index:', index);
      return;
    }
  
    // Create a copy of todos
    const updatedTodos = [...todos];
  
    // Toggle completed status
    updatedTodos[index].completed = !updatedTodos[index].completed;
  
    // Update progress
    updatedTodos[index].progress = updatedTodos[index].completed ? 'Completed' : 'In Progress';
  
    // Separate completed and uncompleted todos
    const updatedTodo = updatedTodos[index];
    const completedTodo = updatedTodo.completed ? updatedTodo : null;
    const uncompletedTodo = updatedTodo.completed ? null : updatedTodo;
  
    // Update todos and completedTodos state
    setTodos(updatedTodos.filter(todo => todo !== updatedTodo));
    if (completedTodo) {
      setCompletedTodos([...completedTodos, completedTodo]);
    } else if (uncompletedTodo) {
      setCompletedTodos(completedTodos.filter(todo => todo !== uncompletedTodo));
      setTodos([...todos, uncompletedTodo]);
    }
  
    try {
      // Send PUT request to update the completion status of the todo
      await axios.put(`http://localhost:5000/todos/${updatedTodo._id}`, { completed: updatedTodo.completed });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  
  
  const handleRemoveTodo = (index, isCompleted) => {
    if (isCompleted) {
      setCompletedTodos(completedTodos.filter((_, i) => i !== index));
    } else {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };
  const allTodos = [...todos, ...completedTodos];

  
  const [activeDiv, setActiveDiv] = useState(1);

  const displayDiv = (divNumber) => {
      setActiveDiv(divNumber);
  };

  // const handleNoteChange = async (e, index, isCompleted) => {
  //   try {
  //     console.log("Event:", e); // Log the event to see if it's being properly passed
  //     console.log("Event target:", e.target); // Log the target to see if it's undefined
  //     const value = e.target.value;
      
  //     // Determine which array to update based on 'isCompleted'
  //     const todosToUpdate = isCompleted ? completedTodos : todos;
      
    
  //     // Check if the index is within bounds
  //     if (index >= 0 && index < todosToUpdate.length) {
  //       // Make a copy of the array to avoid mutating state directly
  //       const updatedTodos = [...todosToUpdate];
  //       // Update the 'notes' property of the todo at the specified index
  //       updatedTodos[index] = {
  //         ...updatedTodos[index],
  //         notes: value
  //       };
  
  //       console.log("Updated Todos:", updatedTodos); // Log the updatedTodos array
  
  //       // Update the state based on 'isCompleted'
  //       if (isCompleted) {
  //         setCompletedTodos(updatedTodos);
  //       } else {
  //         setTodos(updatedTodos);
  //       }
       
  //       // Send PUT request to update the todo
  //       const response = await axios.put(`http://localhost:5000/todosnotes/${updatedTodos[index]._id}`, { notes: value });
  //       console.log('notes',notes)
  //       console.log("PUT Response:", response); // Log the response from the PUT request
        
  //     } else {
  //       console.error(`Index ${index} is out of bounds.`);
  //     }
  //   } catch (error) {
  //     console.error('Error in handleNoteChange:', error);
  //   }
  // };
  
  const handleNoteChange = async (e, index, isCompleted) => {
    try {
      console.log("Event:", e); // Log the event to see if it's being properly passed
      console.log("Event target:", e.target); // Log the target to see if it's undefined
      const value = e.target.value;
      
      // Determine which array to update based on 'isCompleted'
      // const todosToUpdate = isCompleted ? completedTodos : todos;
      
      const updatedTodos = isCompleted ? [...completedTodos] : [...todos];
        updatedTodos[index].notes = value;
        isCompleted ? setCompletedTodos(updatedTodos) : setTodos(updatedTodos);
        const response = await axios.put(`http://localhost:5000/todosnotes/${updatedTodos[index]._id}`, { notes: updatedTodos.completed });
       
        console.log("PUT Response:", response);
     
        
       
    } catch (error) {
      console.error('Error in handleNoteChange:', error);
    }
  };

 
  return (
    <div className='Main-Container'>
      <h1>ToDo List</h1>
      <div className='todo-list-container'>
        <div className='todo-menu'>
        <div onClick={() => displayDiv(1)} className={`todo-menu-items ${activeDiv === 1 ? 'active' : ''}`}>Add Task</div>
        <div onClick={() => displayDiv(2)} className={`todo-menu-items ${activeDiv === 1 ? 'active' : ''}`}>Completed Tasks</div>
        <div onClick={() => displayDiv(3)} className={`todo-menu-items ${activeDiv === 1 ? 'active' : ''}`}>Task List</div>
        </div>


        <div className="todo-sub" style={{ marginLeft: '40px' }}>

          {activeDiv===1 && <div className={`add-task ${activeDiv===1?'active':''}`}>

          <div>
            <input
              style={{ width: "90%", height: '30px', paddingLeft: '10px' }}
              type="text"
              placeholder="Add ToDo"
              value={newTodo}
              onChange={handleInputChange}
            />
            <button onClick={handleAddTodo} style={{backgroundColor:'#2e3532'}}>Add</button>
          </div>
          <div>
            
            <table className='todoist-table' style={{width:'100%'}}>
              <thead>
                <tr>
                  <th></th>
                  <th style={{width:'500px'}}>Task</th>
                  <th  style={{width:'150px'}}>Start Date</th>
                  <th style={{width:'150px'}}>Progress</th>
                  <th style={{width:'600px'}}>Notes</th>
                  <th style={{width:'150px'}}>Priority</th>
                  <th >Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={index} style={{ height: 'auto' }}>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(index)}
                      />
                    </td>
                    <td>{todo.text}</td>
                    <td>{todo.startdate}</td>
                    <td>
                      <select style={{ width: 'fit-content', appearance: 'none', }} value={todo.progress} >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    {/* <td >
                        <textarea   id={`note-${index}`} placeholder='Add Notes Here...........'
                         value={todo.notes}
                          onChange={(e) => handleNoteChange(e, index, false)}
                        />
                    </td> */}
                    <td contentEditable id={`note-${index}`} style={{ whiteSpace: 'normal', wordWrap: 'break-word', border: '1px solid #ccc' }}onBlur={(e) => handleNoteChange(e, index, true)}>
                      {todo.notes}  
                    </td>
                    <td>
                      <select value={todo.priority} style={{ width: 'fit-content',  }} onChange={(e)=>handleChange(e,index)}>
                        <option>Select Priority</option>
                        <option style={{color:'red'}}>High priority</option>
                        <option style={{color:'orange'}}>Medium priority</option>
                        <option style={{color:'Green'}}>Low priority</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleRemoveTodo(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          </div>}
          


          {activeDiv===2 && <div className={`incomplete-task ${activeDiv===2?'active':''}`}>
            <h2>Completed Todo List </h2>
            <table className='todoist-table' style={{width:'100%'}}>
              <thead>
                <tr>
                  <th style={{width:'300px'}}>Task</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th >Progress</th>
                  <th style={{width:'300px'}}>Notes</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {completedTodos.map((todo, index) => (
                  <tr key={index} style={{ height: 'auto' }}>
                    <td>{todo.text}</td>
                    <td>{todo.startdate}</td>
                    <td>{todo.enddate}</td>
                    <td>
                      <select style={{ width: 'fit-content', appearance: 'none', }} value={todo.progress} >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    {/* <td style={{ height: 'auto', padding: '0', position: 'relative' }}>
                      <textarea
                        id={`completed-note-${index}`}
                        value={todo.notes}
                        readOnly
                        onChange={(e) => handleNoteChange(e, index, true)}
                        style={{ width: '100%',  height: '100%', border: 'none', boxSizing: 'border-box', position: 'absolute', top: '0', left: '0', resize: 'none' ,overflow:'hidden' }}
                      />
                    </td> */}
                    <td contentEditable id={`completed-note-${index}`} style={{ whiteSpace: 'normal', wordWrap: 'break-word', border: '1px solid #ccc' }}onBlur={(e) => handleNoteChange(e, index, true)} readOnly>
                      {todo.notes}  
                    </td>
                    <td>
                       {todo.priority}
                    </td>
                    
                    {/* <td>
                      <button onClick={() => handleRemoveTodo(index, true)}>Remove</button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}


          {activeDiv===3 && <div className={`completed-task ${activeDiv===3?'active':''}`}>

           <div className='dates' style={{display:'flex'}}>
              <div>
                <label>Start Date</label><br/>
                  <input type='date' style={{width:'150px',height:'30px',marginRight:'50px',borderRadius:'5px'}}/>
                </div>
                
                <div>
                  <label>End Date</label><br/>
                  <input type='date'style={{width:'150px',height:'30px',borderRadius:'5px'}}/>
                </div>
           </div>
            

            <table className='todoist-table' style={{width:'90%'}}>
              <thead>
                <tr>
                  <th></th>
                  <th style={{width:'300px'}}>Task</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Progress</th>
                  <th style={{width:'300px'}}>Notes</th>
                  <th style={{width:'100px'}}>Priority</th>  
                </tr>
              </thead>
              <tbody>
                {allTodos.map((todo, index) => (
                  <tr key={index} style={{ height: 'auto' }}>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(index)}
                      />
                    </td>
                    <td>{todo.text}</td>
                    <td>{todo.startdate}</td>
                    <td>{todo.completed ? todo.enddate : ''}</td>
                    <td>
                      <select style={{width:'auto'}} value={todo.progress} >
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </td>
                    {/* <td style={{ height: 'auto', padding: '0', position: 'relative' }}>
                        <textarea    placeholder='Add Notes Here...........'
                          readOnly
                          value={todo.notes}
                          onChange={(e) => handleNoteChange(e, index, true)}
                        />
                    </td> */}
                    <td contentEditable style={{ whiteSpace: 'normal', wordWrap: 'break-word', border: '1px solid #ccc' }}onBlur={(e) => handleNoteChange(e, index, true)}>
                      {todo.notes}  
                    </td>

                    <td>
                      {todo.priority}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
              <table className='todoist-table' style={{width:'90%'}}>
              <thead>
                <tr>
                  <th></th>
                  <th style={{width:'300px'}}>Task</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Progress</th>
                  <th style={{width:'300px'}}>Notes</th>
                  <th style={{width:'100px'}}>Priority</th>  
                </tr>
              </thead>
              <tbody>
                {allTodos.map((todo, index) => (
                  <tr key={index} style={{ height: 'auto' }}>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(index)}
                      />
                    </td>
                    <td>{todo.text}</td>
                    <td>{todo.startDate}</td>
                    {/* <td>{todo.completed ? todo.endDate : ''}</td> */}
                    <td>{todo.endDate}</td>
                    <td>
                      <select style={{width:'auto'}} value={todo.progress} >
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </td>
                    {/* <td style={{ height: 'auto', padding: '0', position: 'relative' }}>
                        <textarea    placeholder='Add Notes Here...........'
                          readOnly
                          value={todo.notes}
                          onChange={(e) => handleNoteChange(e, index, true)}
                        />
                    </td> */}
                    <td contentEditable style={{ whiteSpace: 'normal', wordWrap: 'break-word', border: '1px solid #ccc' }}onBlur={(e) => handleNoteChange(e, index, true)}>
                      {todo.notes}  
                    </td>

                    <td>
                      {todo.priority}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            </table>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default TodoList;