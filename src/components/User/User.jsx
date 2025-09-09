import React, { useState } from "react";

const User = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || Number(age) < 0) {
      return alert("Ma'lumotlarni to'g'ri kiriting!");
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { id: u.id, name, age } : u
        )
      );
      setEditingUser(null);
    } else {
      setUsers([...users, { id: Date.now(), name, age: Number(age) }]);
    }
    setName("");
    setAge("");
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleUpdate = (user) => {
    setName(user.name);
    setAge(user.age);
    setEditingUser(user);
  };

  const handleCancel = () => {
    setName("");
    setAge("");
    setEditingUser(null);
  };

  return (
    <div className="p-4  mt-6">
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          className="border p-1 rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className="bg-[#0389ff] text-white px-3 py-1 rounded cursor-pointer">
          {editingUser ? "Update" : "Add"}
        </button>

        {editingUser && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-3 py-1 rounded ml-2 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="grid grid-cols-5 gap-4">
        {users.map((u) => (
          <div key={u.id} className="rounded-3xl bg-white shadow-md p-3 mb-2 ">
            <h3 className="font-semibold">{u.name}</h3>
            <p>Age: {u.age}</p>
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-500 text-white px-2 py-1 rounded mr-2 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(u)}
                className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
