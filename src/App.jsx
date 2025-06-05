import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]); // {role: 'user'|'ai', content: string}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim() || !apiKey.trim()) return;
    setError('');
    const userMessage = input;
    const predefined_prompt = 'I want some good excuses..'
    setChat(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: predefined_prompt + userMessage, api_key: apiKey }),
      });
      const data = await res.json();
      if (data.response) {
        setChat(prev => [...prev, { role: 'ai', content: data.response }]);
      } else if (data.error) {
        setError(data.error);
        setChat(prev => [...prev, { role: 'ai', content: "Error: " + data.error }]);
      }
    } catch (err) {
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with API Key */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
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
          gap: 16,
          padding: '0 16px'
        }}>
          <img
            src="src\assets\download.png"
            alt="Logo"
            style={{ width: 70, height: 50, marginRight: 8 }}
          />
          <h2 style={{
            fontWeight: 700,
            fontSize: 22,
            margin: 0,
            color: '#1e293b',
            letterSpacing: '-1px',
            flex: 1
          }}>
            CHATTERBOT 🤖ིྀ
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
              background: '#f1f5f9'
            }}
          />
        </div>
      </header>

      {/* Chat Section */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 0 90px 0',
        background: 'transparent'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
          padding: '24px 0 0 0',
          flex: 1,
          overflowY: 'auto',
          minHeight: 0
        }}>
          {chat.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: '#64748b',
              marginTop: 60,
              fontSize: 18
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}></div>
              Start a conversation!
            </div>
          )}
          {chat.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 14,
                paddingLeft: msg.role === 'user' ? 60 : 0,
                paddingRight: msg.role === 'ai' ? 60 : 0,
              }}
            >
              <div style={{
                background: msg.role === 'user'
                  ? 'linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)'
                  : '#f1f5f9',
                color: msg.role === 'user' ? '#fff' : '#334155',
                borderRadius: 16,
                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: msg.role === 'ai' ? 4 : 16,
                padding: '12px 18px',
                fontSize: 16,
                maxWidth: '80%',
                boxShadow: msg.role === 'user'
                  ? '0 2px 8px rgba(99,102,241,0.10)'
                  : '0 2px 8px rgba(60,72,88,0.07)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                position: 'relative'
              }}>
                {msg.role === 'ai' && (
                  <span style={{
                    position: 'relative',
                    left: 0,
                    top: 0,
                    fontSize: 22,
                    color: '#6366f1'
                  }}>🤖</span>
                )}
                {msg.role === 'user' && (
                  <span style={{
                    position: 'absolute',
                    right: -36,
                    top: 8,
                    fontSize: 22,
                    color: '#0ea5e9'
                  }}>🧑</span>
                )}
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Chat Input */}
      <footer style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255,255,255,0.97)',
        borderTop: '1px solid #e5e7eb',
        padding: '18px 0 14px 0',
        zIndex: 20,
        boxShadow: '0 -2px 8px rgba(60,72,88,0.04)'
      }}>
        <form
          style={{
            maxWidth: 600,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 16px'
          }}
          onSubmit={e => {
            e.preventDefault();
            if (!loading) handleSend();
          }}
        >
          <textarea
            rows={1}
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={!apiKey || loading}
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              fontSize: 16,
              resize: 'none',
              outline: 'none',
              background: '#f8fafc',
              minHeight: 44,
              maxHeight: 120,
              boxSizing: 'border-box'
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || !apiKey.trim()}
            style={{
              background: loading || !input.trim() || !apiKey.trim()
                ? '#cbd5e1'
                : 'linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 17,
              padding: '12px 28px',
              border: 'none',
              borderRadius: 8,
              cursor: loading || !input.trim() || !apiKey.trim() ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
        {error && (
          <div style={{
            maxWidth: 600,
            margin: '10px auto 0 auto',
            color: '#ef4444',
            background: '#fef2f2',
            borderRadius: 8,
            padding: 10,
            fontWeight: 500,
            fontSize: 15,
            textAlign: 'center'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        <div style={{
          marginTop: 18,
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: 13
        }}>
          &copy; {new Date().getFullYear()} CHATTERBOT 🤖ིྀ &mdash; Powered by Google Gemini
        </div>
      </footer>
    </div>
  );
}

export default App;
