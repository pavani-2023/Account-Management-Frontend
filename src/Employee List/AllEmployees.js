
// import React, { useState } from 'react';

// // Sample data for employees
// const employees = [
//     { id: 1, name: 'John Doe', position: 'Software Engineer', age: 30, imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
//     { id: 2, name: 'Jane Smith', position: 'UX Designer', age: 28, imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
//     { id: 3, name: 'Mike Johnson', position: 'Product Manager', age: 35, imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
//   // Add more employee data as needed
// ];

// const AllEmployees = () => {
//   const [employeeData] = useState(employees);
//   const [showForm, setShowForm] = useState(false); // State to manage form visibility
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const handleViewDetails = (employee) => {
//     // Handle click event to show form
//     setSelectedEmployee(employee);
//     setShowForm(true);
//   };

//   const handleformclose=()=>{
//     setShowForm(false);
//   }

//   return (
//     <div className="Main-Container">
//       <h1>Employee List</h1>
//       <div className="employee-list">
//         {employeeData.map(employee => (
//           <div className="card" key={employee.id}>
//             <img src={employee.imageUrl} alt={employee.name} />
//             <div className="card-body">
//               <h5 className="card-title">{employee.name}</h5>
//               <p className="card-text">{employee.position}</p>
//               <button onClick={() => handleViewDetails(employee)}>View More Details</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {showForm && selectedEmployee&&(
//         <div className="form-container">
//           {/* Your form component goes here */}
//           <form className='modal-forms'>
//           <span className="close" onClick={handleformclose}>&times;</span>
//           <label>
//               Position:
//               <input type="text" value={selectedEmployee.position}  />
//             </label>
//             <label>
//               Age:
//               <input type="text" value={selectedEmployee.age} />
//             </label>
//             {/* Add more form fields as needed */}
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllEmployees;


import React, { useState } from 'react';

// Sample data for employees
const employees = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', age: 30, imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', position: 'UX Designer', age: 28, imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Mike Johnson', position: 'Product Manager', age: 35, imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
  // Add more employee data as needed
];

const AllEmployees = () => {
  const [employeeData] = useState(employees);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});

  const handleViewDetails = (employee) => {
    // Handle click event to show form
    setSelectedEmployee(employee);
    setShowForm(true);
    // Pre-fill form data with selected employee's details
    setFormData({ ...employee });
  };

  const handleformclose = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Optionally, you can update the selected employee's details here if needed
  };

  return (
    <div className="Main-Container">
      <h1>Employee List</h1>
      <div className="employee-list">
        {employeeData.map(employee => (
          <div className="card" key={employee.id}>
            <img src={employee.imageUrl} alt={employee.name} />
            <div className="card-body">
              <h5 className="card-title">{employee.name}</h5>
              <p className="card-text">{employee.position}</p>
              <button onClick={() => handleViewDetails(employee)}>View More Details</button>
            </div>
          </div>
        ))}
      </div>
      {showForm && selectedEmployee && (
        <div className="form-container">
          <form className='modal-forms' onSubmit={handleSubmit}>
            <span className="close" onClick={handleformclose}>&times;</span>
            <label>
              Position:
              <input
                type="text"
                name="position"
                value={formData.position || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={formData.age || selectedEmployee.position}
                onChange={handleChange}
              />
            </label>
            {/* Add more form fields as needed */}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;
