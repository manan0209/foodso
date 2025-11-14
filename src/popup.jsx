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
    <div style={{ 
      fontFamily: 'Arial Black, Arial, sans-serif', 
      padding: '0',
      width: '350px',
      background: '#FFC72C'
    }}>
      <div style={{
        background: '#DA291C',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '4px solid #000'
      }}>
        <h1 style={{ 
          margin: '0', 
          fontSize: '32px', 
          color: '#FFC72C',
          textShadow: '2px 2px 0 #000',
          letterSpacing: '1px'
        }}>
          FOODSO
        </h1>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '15px',
          marginBottom: '15px',
          border: '4px solid #000',
          boxShadow: '4px 4px 0 #DA291C',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            color: '#DA291C',
            fontWeight: 'bold',
            marginBottom: '8px',
            fontFamily: 'Arial Black, sans-serif'
          }}>
            {stats.resisted}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#333',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }}>
            TEMPTATIONS BLOCKED
          </div>
        </div>

        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          cursor: 'pointer',
          background: '#fff',
          padding: '15px',
          borderRadius: '10px',
          border: '3px solid #000',
          marginBottom: '15px'
        }}>
          <input 
            type="checkbox" 
            checked={enabled} 
            onChange={handleToggle}
            style={{ 
              cursor: 'pointer',
              width: '20px',
              height: '20px'
            }}
          />
          <span style={{ 
            fontSize: '16px', 
            color: '#000',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }}>
            {enabled ? 'Extension Active' : 'Extension Disabled'}
          </span>
        </label>

        <button 
          onClick={() => chrome.runtime.openOptionsPage()}
          style={{
            width: '100%',
            padding: '15px',
            background: '#DA291C',
            color: '#FFC72C',
            border: '4px solid #000',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'Arial Black, sans-serif',
            textTransform: 'uppercase',
            boxShadow: '3px 3px 0 #000',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '4px 4px 0 #000';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '3px 3px 0 #000';
          }}
        >
          Settings
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Popup />);
