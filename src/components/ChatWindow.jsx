// components/ChatWindow.jsx
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './Typing.css'; // You should have this file for typing dots animation

const ChatWindow = ({ chat, loading, setChat, darkMode }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, loading]);

  return (
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
        overflowY: 'visible',
        minHeight: 0
      }}>
        <button
          onClick={() => setChat([])}
          style={{
            background: darkMode ? '#dc2626' : '#f87171',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 6,
            margin: '10px auto',
            border: 'none',
            display: 'block',
            fontSize: 14,
            cursor: 'pointer'
          }}
          aria-label="Clear chat"
          title="Clear chat"
        >
          🗑️ Clear Chat
        </button>

        {chat.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#64748b',
            marginTop: 60,
            fontSize: 22
          }}>
            <div style={{ fontSize: 80, marginBottom: 12 }}></div>
            Start a conversation!
          </div>
        )}

        {chat.map((msg, idx) => (
          <ChatMessage key={idx} msg={msg} />
        ))}

        {loading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 8,
            fontStyle: 'italic',
            color: '#94a3b8'
          }}>
            🤖 Typing<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </main>
  );
};

export default ChatWindow;
