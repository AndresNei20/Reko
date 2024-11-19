import { useState } from 'react';
import { User } from './User';
import { useNavigate } from 'react-router-dom';

export const UserList = () => {
  const [users, setUsers] = useState([{ id: 1 }]); // Usuario inicial
  const navigate = useNavigate();

  const addUser = () => {
    setUsers([...users, { id: users.length + 1 }]);
  };

  const selectUser = (userId) => {
    // Navega al cuestionario para el usuario seleccionado
    navigate(`/questionnaire/${userId}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Select a User</h1>
      
      <div className="flex space-x-4 mb-6">
        {users.map((user) => (
          <User key={user.id} user={user} onSelect={selectUser} />
        ))}

        {/* Botón para agregar usuarios */}
        <div
          className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gray-300 cursor-pointer"
          onClick={addUser}
        >
          <span className="text-3xl font-bold">+</span>
        </div>
      </div>
    </div>
  );
};