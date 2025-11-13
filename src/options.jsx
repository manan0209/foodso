import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Options() {
  const [enabled, setEnabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(['enabled'], (result) => {
      if (result.enabled !== undefined) setEnabled(result.enabled);
    });
  }, []);

  const handleChange = (key, value) => {
    const update = { [key]: value };
    chrome.storage.sync.set(update, () => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    });
    
    if (key === 'enabled') setEnabled(value);
  };

  return (
    <div>
      <div style={{
        background: enabled ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>foodso Settings</h2>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
          {enabled ? 'Extension is Active' : 'Extension is Disabled'}
        </p>
      </div>

      <div style={{
        background: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '16px'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
          />
          <span style={{ fontSize: '14px', color: '#333' }}>
            Enable foodso Extension
          </span>
        </label>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 30px' }}>
          When enabled, foodso will show healthy recipe alternatives when you visit fast food websites.
        </p>
      </div>

      <div style={{
        background: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#333' }}>
          Supported Fast Food Chains
        </h3>
        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', margin: 0 }}>
          McDonald's, KFC, Wendy's, Burger King, Taco Bell, Chick-fil-A, Popeyes, Pizza Hut, Domino's, Papa Johns, Little Caesars, Dunkin, Subway, Jimmy John's, Chipotle, Qdoba, Panera Bread, Wingstop, Arby's, Sonic, In-N-Out, Five Guys, Shake Shack, WhataB burger, and more.
        </p>
      </div>

      {showNotification && (
        <div style={{
          background: '#4CAF50',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          textAlign: 'center',
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          Settings saved successfully
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Options />);
