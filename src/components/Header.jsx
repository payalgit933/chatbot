import React from 'react';
import logo from '../assets/download.jpeg';

const Header = ({ apiKey, setApiKey, darkMode, setDarkMode }) => {
  return (
    <header style={{
      background: darkMode ? '#1e293b' : '#fff',
      padding: '18px 0 12px 0',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: '0 2px 8px rgba(60,72,88,0.04)'
    }}>
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '0 16px'
      }}>
        <img src={logo} alt="Logo" style={{ width: 38, marginRight: 8 }} />
        <h2 style={{
          fontWeight: 700,
          fontSize: 22,
          margin: 0,
          color: darkMode ? '#f1f5f9' : '#1e283b',
          letterSpacing: '-1px',
          flex: 1
        }}>
          CHATTERBOT
        </h2>
        <input
          type="password"
          placeholder="Enter Gemini API Key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          style={{
            width: 220,
            padding: '8px 10px',
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            fontSize: 15,
            outline: 'none',
            background: darkMode ? '#334155' : '#f1f5f9',
            color: darkMode ? '#f1f5f9' : '#1e293b'
          }}
        />
        {/* 🌙 DARK MODE TOGGLE BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            background: darkMode ? '#facc15' : '#334155',
            color: darkMode ? '#1e293b' : '#f1f5f9',
            border: 'none',
            fontSize: 14,
            cursor: 'pointer'
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
};

export default Header;
