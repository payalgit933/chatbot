import React, { useState,useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ErrorBox from './components/ErrorBox';
import FooterNote from './components/FooterNote';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!input.trim() || !apiKey.trim()) return;
    setError('');
    const userMessage = input;
    setChat(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, api_key: apiKey }),
      });
      const data = await res.json();
      if (data.response) {
        setChat(prev => [...prev, { role: 'ai', content: data.response }]);
      } else if (data.error) {
        setError(data.error);
        setChat(prev => [...prev, { role: 'ai', content: "Error: " + data.error }]);
      }
    } catch {
      setError('Failed to connect to server.');
      setChat(prev => [...prev, { role: 'ai', content: "Error: Failed to connect to server." }]);
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) handleSend();
    }
  };
  
  useEffect(() => {
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
      setChat(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chat));
  }, [chat]);

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode
        ? '#0f172a'
        : 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      color: darkMode ? '#f1f5f9' : '#1e293b',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header
        apiKey={apiKey}
        setApiKey={setApiKey}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <ChatWindow
        chat={chat}
        loading={loading}
        setChat={setChat}
        darkMode={darkMode}
      />

      <footer style={{ 
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        background: darkMode ? '#1e293b' : 'rgba(255,255,255,0.97)',
        borderTop: '1px solid #e5e7eb',
        padding: '18px 0 14px 0',
        zIndex: 20,
        boxShadow: '0 -2px 8px rgba(60,72,88,0.04)'
      }}>
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} handleInputKeyDown={handleInputKeyDown} loading={loading} apiKey={apiKey} />
        <ErrorBox error={error} />
        <FooterNote darkMode={darkMode} />
      </footer>
    </div>
  );
}

export default App;
