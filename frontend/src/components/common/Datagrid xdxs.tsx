import format from 'date-fns/format';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

interface DataItem {
  id: number;
  name: string;
}

const initialData: DataItem[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Bharath' },
  { id: 5, name: 'Suvetha' }
];

function DataGrid() {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [formData, setFormData] = useState<DataItem>({ id: 0, name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedDate, setSelectedData] = useState<any>(0);

  const [filteredData, setFilteData] = useState(
    data.filter((row) => {
      // Convert the row values to lowercase for case-insensitive search.
      const values = Object.values(row).map((value) => value.toString().toLowerCase());

      // Check if any value contains the search term.
      return values.some((value) => value.includes(searchTerm.toLowerCase()));
    })
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });

    if (sortConfig.key) {
      const sortedData = filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      setFilteData(sortedData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addData = () => {
    if (!formData.name) return;

    if (isEditing) {
      const updatedData = data.map((item) => (item.id === formData.id ? { ...item, name: formData.name } : item));
      setData(updatedData);
    } else {
      const newId = Math.max(...data.map((item) => item.id), 0) + 1;
      const newData = [...data, { id: newId, name: formData.name }];
      setData(newData);
    }

    setFormData({ id: 0, name: '' });
    setIsEditing(false);
  };

  const editData = (id: number) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setFormData(itemToEdit);
      setIsEditing(true);
    }
  };

  const deleteData = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      editData(id);
    }
  };

  const handlePrevMonth = (e) => {
    e.preventDefault();
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
  };

  const handleOpenCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Grid</h1>
      <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div>
        <button
          onClick={(e) => {
            handlePrevMonth(e);
          }}
        >
          {'<'}
        </button>
        <div onClick={handleOpenCalendar}>{format(selectedDate, 'MMM-yyyy')}</div>
        <button
          onClick={(e) => {
            handlePrevMonth(e);
          }}
        >
          {'>'}
        </button>
        {isCalendarOpen && (
          <div className="calendar-container">
            <Calendar
              onChange={(date) => {
                setCalendarOpen(false);
                setSelectedData(date);

                // onChange(date);
              }}
            />
          </div>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">
              <span onClick={(e) => requestSort('id')}>
                ID
                {sortConfig.key === 'id' && <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>}
              </span>
            </th>
            <th className="p-2">
              <span onClick={() => requestSort('name')}>
                Name
                {sortConfig.key === 'name' && <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>}
              </span>
            </th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="p-2">{item.id}</td>
              <td className="p-2">
                {isEditing && item.id === formData.id ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleEditKeyPress(e, item.id)}
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="p-2">
                {isEditing && item.id === formData.id ? (
                  <button
                    onClick={() => editData(item.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded mx-1"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => editData(item.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteData(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded mx-1"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;
