import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Popup() {
  const [enabled, setEnabled] = useState(true);
  const [stats, setStats] = useState({ resisted: 0 });

  useEffect(() => {
    chrome.storage.sync.get(['enabled', 'resistedCount'], (result) => {
      if (result.enabled !== undefined) setEnabled(result.enabled);
      if (result.resistedCount) setStats({ resisted: result.resistedCount });
    });
  }, []);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    chrome.storage.sync.set({ enabled: newState });
  };

  return (
    <div style={{ fontFamily: 'system-ui', padding: '16px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#333' }}>
        foodso
      </h2>
      
      <div style={{ 
        background: '#f0f8f0', 
        padding: '12px', 
        borderRadius: '6px', 
        marginBottom: '16px',
        fontSize: '14px',
        color: '#2c5f2d'
      }}>
        <strong>Temptations Resisted:</strong> {stats.resisted}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <input 
          type="checkbox" 
          checked={enabled} 
          onChange={handleToggle}
          style={{ cursor: 'pointer' }}
        />
        <span style={{ fontSize: '14px', color: '#333' }}>
          Enable foodso
        </span>
      </label>

      <p style={{ fontSize: '12px', color: '#666', marginTop: '12px', lineHeight: '1.5' }}>
        foodso helps you avoid fast food cravings by suggesting healthy home recipes instead.
      </p>

      <button 
        onClick={() => chrome.runtime.openOptionsPage()}
        style={{
          width: '100%',
          marginTop: '12px',
          padding: '8px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Settings
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Popup />);
