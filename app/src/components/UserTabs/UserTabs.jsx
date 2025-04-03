import React, { useState } from 'react';
import './UserTabs.css';

function UserTabs({ users, activeUser, onUserSelect, onUserUpdate }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `User ${users.length + 1}`
    };
    onUserUpdate([...users, newUser]);
  };

  const handleDeleteUser = (userId) => {
    if (users.length === 1) return; // Don't delete the last user
    onUserUpdate(users.filter(user => user.id !== userId));
  };

  const handleStartEdit = (user) => {
    setEditingUser(user.id);
    setEditName(user.name);
  };

  const handleSaveEdit = (userId) => {
    if (!editName.trim()) return;
    onUserUpdate(users.map(user => 
      user.id === userId ? { ...user, name: editName.trim() } : user
    ));
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(user.id)}
                />
                <div className="edit-user-actions">
                  <button 
                    className="save-edit"
                    onClick={() => handleSaveEdit(user.id)}
                  >
                    ✓
                  </button>
                  <button 
                    className="cancel-edit"
                    onClick={handleCancelEdit}
                  >
                    ✕
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
                    handleStartEdit(user);
                  }}
                >
                  ✎
                </button>
                {users.length > 1 && (
                  <button
                    className="delete-tab"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <button className="add-tab" onClick={handleAddUser}>
        + Add User
      </button>
    </div>
  );
}

export default UserTabs; 