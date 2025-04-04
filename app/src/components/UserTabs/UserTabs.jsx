import React, { useState } from 'react';
import './UserTabs.css';

function UserTabs({ users, activeUser, onUserSelect, onUserUpdate }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `User ${users.length + 1}`
    };
    onUserUpdate([...users, newUser]);
  };

  const deleteUser = (userId) => {
    if (users.length === 1) return; 
    onUserUpdate(users.filter(user => user.id !== userId));
  };

  const editStart = (user) => {
    setEditingUser(user.id);
    setEditName(user.name);
  };

  const editSave = (userId) => {
    if (!editName.trim()) return;
    onUserUpdate(users.map(user => 
      user.id === userId ? { ...user, name: editName.trim() } : user
    ));
    setEditingUser(null);
  };

  const editCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {users.map(user => (
          <div
            key={user.id}
            className={`tab ${activeUser === user.id ? 'active' : ''}`}
            onClick={() => onUserSelect(user.id)}
          >
            {editingUser === user.id ? (
              <div className="edit-user-container" onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="edit-user-input"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && editSave(user.id)}
                />
                <div className="edit-user-actions">
                  <button 
                    className="save-edit"
                    onClick={() => editSave(user.id)}
                  >
                    ✓
                  </button>
                  <button 
                    className="cancel-edit"
                    onClick={editCancel}
                  >
                    x
                  </button>
                </div>
              </div>
            ) : (
              <>
                {user.name}
                <button
                  className="edit-tab"
                  onClick={(e) => {
                    e.stopPropagation();
                    editStart(user);
                  }}
                >
                  ✎
                </button>
                {users.length > 1 && (
                  <button
                    className="delete-tab"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUser(user.id);
                    }}
                  >
                    x
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <button className="add-tab" onClick={addUser}>
        + Add User
      </button>
    </div>
  );
}

export default UserTabs; 