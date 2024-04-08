

import React, { useState } from 'react';
import './styles.css'


export default function App() {
  const initialData = [
    {
      key: "john",
      value: "John Doe"
    },
    {
      key: "jane",
      value: "Jane Doe"
    },
    {
      key: "mary",
      value: "Mary Phillips"
    },
    {
      key: "robert",
      value: "Robert"
    },
    {
      key: "karius",
      value: "Karius"
    }
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearch = (value) => {
    setSearchValue(value);
    const filtered = initialData.filter(item =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleInputChange = (value) => {
    if (!value) {
      // If the input is empty, show the selected item value
      setSearchValue(selectedItem ? selectedItem.value : '');
    } else {
      handleSearch(value);
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch(searchValue);
  };

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleInputBlur = () => {
    // Delay the hiding of the dropdown to allow click event on dropdown items
    setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  };

  return (
    <div className='Main-Container'>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search for John, Jane or Mary"
          value={searchValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleDropdownClick}
          onBlur={handleInputBlur}
        />
       
        {dropdownVisible && (
          <div className="dropdown">
            {filteredData.map(item => (
              <div
                key={item.key}
                onClick={() => {
                  setSelectedItem(item);
                  setDropdownVisible(false);
                }}
              >
                {item.value}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleSearchButtonClick}>Search</button>

      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.key}>
              <td>{item.key}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

