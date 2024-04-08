import React, { useState,useEffect } from 'react';
import './todolist.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  console.log('todo',todos)
  const [completedTodos, setCompletedTodos] = useState([]);
  console.log('completedtodo',completedTodos)
  const [newTodo, setNewTodo] = useState('');
  const { uuid } = useParams();
  const [alltodos,setAllTodos]=useState([])
  console.log('alltods',alltodos)

  const [todoChanges, setTodoChanges] = useState([]); // State to track changes in todo items
console.log('todoChanges',todoChanges)

  const allTodos = [...todos, ...completedTodos];

  
  const [activeDiv, setActiveDiv] = useState(1);

  const displayDiv = (divNumber) => {
      setActiveDiv(divNumber);
  };
  const updateTodoChanges = (_id, changes) => {
    // Find index of todoChanges with the given _id
    const index = todoChanges.findIndex(todo => todo._id === _id);

    if (index !== -1) {
      // If _id exists, update the changes
      const updatedChanges = [...todoChanges];
      updatedChanges[index].changes = changes;
      setTodoChanges(updatedChanges);
    } else {
      // If _id doesn't exist, add a new entry
      setTodoChanges([...todoChanges, { _id, changes }]);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };



  const handleChange = async(e, index) => {
    const { value } = e.target;
    const updatedTodos = [...todos];
    updatedTodos[index].priority = value;
    setTodos(updatedTodos);
    setTodoChanges(updatedTodos[index]._id)
    const response = await axios.put(`http://localhost:5000/todospriority/${updatedTodos[index]._id}`, { priority: value });
  };


  useEffect(() => {
    // Fetch todos when component mounts
    // fetchTodos();
    // saveTodo();
    // updatedata();
    updateTodo();
  }, []);

  useEffect(() => {
    setAllTodos([...todos, ...completedTodos]);
  }, []);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/gettodoItems/${uuid}`);
        const allTodos = response.data.todos || [];
        const incompleteTodos = allTodos.filter(todo => !todo.completed);
        const completedTodos = allTodos.filter(todo => todo.completed);
        setTodos(incompleteTodos);
        setCompletedTodos(completedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
    
  }, [uuid]);
  

  const updateTodo = async (updatedTodo, index, isCompleted) => {
    try {
      // Determine which array to update based on 'isCompleted'
      const todosToUpdate = isCompleted ? completedTodos : todos;
  
      // Check if the index is within bounds
      if (index >= 0 && index < todosToUpdate.length) {
        // Make a copy of the todo array to avoid mutating state directly
        const updatedTodos = [...todosToUpdate];
        // Update the todo at the specified index
        updatedTodos[index] = updatedTodo;
  
        // Update the state based on 'isCompleted'
        isCompleted ? setCompletedTodos(updatedTodos) : setTodos(updatedTodos);
  
        // Send PUT request to update the todo on the server
        await axios.put(`http://localhost:5000/updatetodo/${ updatedTodos[index]._id}`, updatedTodo);
  
        console.log('Todo updated successfully:', updatedTodo);
      } else {
        console.error(`Index ${index} is out of bounds.`);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (newTodo.trim() === '') {
      return;
    }
  
    try {
      const currentDate = new Date().toISOString().slice(0, 10);
      const endDate = new Date().toISOString().slice(0, 10);
  
      const newTodoItem = {
        EmployeeId:uuid,
        text: newTodo,
        startDate: currentDate,
        // endDate: endDate,
        progress: '',
        notes: '',
        completed:'', 
        priority: '', 
      };

       // Send POST request to backend endpoint to save new todo
       const response = await axios.post('http://localhost:5000/todos', newTodoItem);
      
      //  Update state with the newly saved todo
       setTodos([...todos, response.data]);
      // setTodos([...todos, newTodoItem]);
       setNewTodo('');
  
      
      
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  
  
  const handleNoteChange = async(e, index, isCompleted) => {
    const value = e.target.value;
    
    // Determine which array to update based on 'isCompleted'
    const todosToUpdate = isCompleted ? completedTodos : todos;
  
    // Check if the index is within bounds
    if (index >= 0 && index < todosToUpdate.length) {
      // Make a copy of the array to avoid mutating state directly
      const updatedTodos = [...todosToUpdate];
      // Update the 'notes' property of the todo at the specified index
      updatedTodos[index] = {
        ...updatedTodos[index],
        notes: value
      };
  
      // Update the state based on 'isCompleted'
      isCompleted ? setCompletedTodos(updatedTodos) : setTodos(updatedTodos);
      console.log('updated',updatedTodos)

      const response = await axios.put(`http://localhost:5000/todosnotes/${updatedTodos[index]._id}`, { notes:value});
       console.log('response',response)
    } else {
      console.error(`Index ${index} is out of bounds.`);
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
    const endDate = new Date().toISOString().slice(0, 10);
    updatedTodos[index].endDate = updatedTodos[index].completed ? endDate : null; // Add completion date
  
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
      await axios.put(`http://localhost:5000/todos/${updatedTodo._id}`, { completed: updatedTodo.completed ,progress: updatedTodos[index].progress,endDate: updatedTodos[index].endDate});
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
  
  const [startDate, setStartDate] = useState(null); // State variable for start date
  const [endDate, setEndDate] = useState(null);
  
  const filteredTodos = allTodos.filter((todo) => {
    if (startDate && endDate) {
      return todo.startDate >= startDate && todo.endDate <= endDate;
    } else if (startDate && !endDate) {
      return todo.startDate >= startDate;
    } else if (!startDate && endDate) {
      return todo.endDate <= endDate;
    }
    return true;
  });
  
  // Update start date state when input changes
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Update end date state when input changes
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className='Main-Container'>
      <h1>ToDo List</h1>
      <div className='todo-list-container'>
        <div className='todo-menu'>
        <div onClick={() => displayDiv(1)} className={`todo-menu-items ${activeDiv === 1 ? 'active' : ''}`}>Add Task</div>
        <div onClick={() => displayDiv(2)} className={`todo-menu-items ${activeDiv === 2 ? 'active' : ''}`}>Completed Tasks</div>
        <div onClick={() => displayDiv(3)} className={`todo-menu-items ${activeDiv === 3 ? 'active' : ''}`}>Task List</div>
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
                    <td>{todo.startDate}</td>
                    <td>
                      <select style={{ width: 'fit-content', appearance: 'none', }} value={todo.progress} >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td >
                        <textarea  className='slect-todo'  style={{ width: '90%',height:'auto'  }} id={`note-${index}`} placeholder='Add Notes Here...........'
                         value={todo.notes}
                          onChange={(e) => handleNoteChange(e, index, false)}
                        />
                    </td>
                    {/* <td contentEditable id={`note-${index}`} style={{ whiteSpace: 'normal', wordWrap: 'break-word', border: '1px solid #ccc' }}onBlur={(e) => handleNoteChange(e, index, true)}>
                      {todo.notes}  
                    </td> */}
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
            {/* <button onClick={saveTodo}>Save</button> */}
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
                    <td>{todo.startDate}</td>
                    <td>{todo.endDate}</td>
                    <td>
                      <select style={{ width: 'fit-content', appearance: 'none', }} value={todo.progress} >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td style={{ height: 'auto', padding: '0', position: 'relative' }}>
                      <textarea
                        id={`completed-note-${index}`}
                        value={todo.notes}
                        readOnly
                        onChange={(e) => handleNoteChange(e, index, true)}
                        style={{ width: '100%',  height: '100%', border: 'none', boxSizing: 'border-box', position: 'absolute', top: '0', left: '0', resize: 'none' ,overflow:'hidden' }}
                      />
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


        
          {activeDiv === 3 && (
        <div className={`completed-task ${activeDiv === 3 ? 'active' : ''}`}>
          <div className='dates' style={{ display: 'flex' }}>
            <div>
              <label>Start Date</label>
              <br />
              <input
                type='date'
                style={{ width: '150px', height: '30px', marginRight: '50px', borderRadius: '5px' }}
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <div>
              <label>End Date</label>
              <br />
              <input
                type='date'
                style={{ width: '150px', height: '30px', borderRadius: '5px' }}
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>

          <table className='todoist-table' style={{ width: '90%' }}>
            <thead>
              <tr>
                <th></th>
                <th style={{ width: '300px' }}>Task</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Progress</th>
                <th style={{ width: '300px' }}>Notes</th>
                <th style={{ width: '100px' }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo, index) => (
                <tr key={index} style={{ height: 'auto' }}>
                  <td>
                    <input
                      type='checkbox'
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(index)}
                    />
                  </td>
                  <td>{todo.text}</td>
                  <td>{todo.startDate}</td>
                  <td>{todo.endDate}</td>
                  <td>
                    <select style={{ width: 'auto' }} value={todo.progress}>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>
                  <td
                    contentEditable
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word', border: '1px solid #ccc' }}
                    onBlur={(e) => handleNoteChange(e, index, true)}
                  >
                    {todo.notes}
                  </td>

                  <td>{todo.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
