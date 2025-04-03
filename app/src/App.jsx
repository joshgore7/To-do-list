import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather/Weather';
import ToDo from './components/ToDo/ToDo';
import UserTabs from './components/UserTabs/UserTabs';

function App() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  const userUpdate = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  return (
    <div className="app">
      <UserTabs
        users={users}
        activeUser={activeUser}
        onUserSelect={setActiveUser}
        onUserUpdate={userUpdate}
      />
      <div className="content-container">
        <div className="user-content-container">
          <div className="weather-position">
            <Weather userId={activeUser} />
          </div>
          <div className="todo-position">
            <ToDo userId={activeUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
