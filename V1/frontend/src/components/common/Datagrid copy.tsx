import React, { useState } from 'react';

interface DataItem {
  id: number;
  name: string;
}

function DataGrid() {
  const initialData: DataItem[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  const [data, setData] = useState<DataItem[]>(initialData);
  const [formData, setFormData] = useState<DataItem>({ id: 0, name: '' });
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Grid</h1>
      <div className="flex mb-4">
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={formData.name}
          onChange={handleInputChange}
          onKeyPress={(e) => handleEditKeyPress(e, formData.id)}
          className={`flex-grow p-2 border rounded-l ${isEditing ? 'border-blue-500' : ''}`}
          readOnly={!isEditing}
        />
        <button
          onClick={addData}
          className={`${
            isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
          } text-white p-2 rounded-r`}
        >
          {isEditing ? 'Edit' : 'Add'}
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
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
