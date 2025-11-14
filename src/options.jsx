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
    <div style={{
      background: '#FFC72C',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: '#DA291C',
          color: '#FFC72C',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '30px',
          border: '6px solid #000',
          boxShadow: '8px 8px 0 #000',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '56px',
            fontFamily: 'Arial Black, sans-serif',
            textShadow: '3px 3px 0 #000',
            letterSpacing: '2px'
          }}>
            FOODSO
          </h1>
          <p style={{ 
            margin: 0, 
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }}>
            {enabled ? 'PROTECTION ACTIVE' : 'PROTECTION DISABLED'}
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          marginBottom: '20px',
          border: '5px solid #000',
          boxShadow: '6px 6px 0 #DA291C'
        }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => handleChange('enabled', e.target.checked)}
              style={{ 
                cursor: 'pointer', 
                width: '24px', 
                height: '24px',
                accentColor: '#DA291C'
              }}
            />
            <span style={{ color: '#000' }}>
              Enable Fast Food Blocker
            </span>
          </label>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: '15px 0 0 39px',
            lineHeight: '1.6'
          }}>
            When enabled, foodso will intercept fast food websites and show you healthier alternatives you can make at home.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          border: '5px solid #000',
          boxShadow: '6px 6px 0 #DA291C'
        }}>
          <h2 style={{ 
            margin: '0 0 20px 0', 
            fontSize: '28px', 
            color: '#DA291C',
            fontFamily: 'Arial Black, sans-serif'
          }}>
            BLOCKED SITES
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px',
            fontSize: '14px',
            color: '#333',
            fontWeight: 'bold'
          }}>
            {[
              "McDonald's", "Burger King", "KFC", "Wendy's", 
              "Taco Bell", "Pizza Hut", "Domino's", "Subway",
              "Chick-fil-A", "Popeyes", "Arby's", "Sonic",
              "Five Guys", "In-N-Out", "Shake Shack", "Chipotle"
            ].map(site => (
              <div key={site} style={{
                background: '#FFC72C',
                padding: '10px',
                borderRadius: '8px',
                border: '3px solid #000',
                textAlign: 'center'
              }}>
                {site}
              </div>
            ))}
          </div>
          <p style={{ 
            fontSize: '13px', 
            color: '#666', 
            margin: '20px 0 0 0',
            textAlign: 'center'
          }}>
            ...and many more fast food chains
          </p>
        </div>
      </div>

      {showNotification && (
        <div style={{
          background: '#DA291C',
          color: '#FFC72C',
          padding: '20px 30px',
          borderRadius: '15px',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          border: '4px solid #000',
          boxShadow: '4px 4px 0 #000',
          fontFamily: 'Arial Black, sans-serif'
        }}>
          SAVED!
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Options />);
