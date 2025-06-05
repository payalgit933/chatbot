// components/ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ msg }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
        marginBottom: 34,
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
        fontSize: 18,
        maxWidth: '80%',
        boxShadow: msg.role === 'user'
          ? '0 2px 8px rgba(99,102,241,0.10)'
          : '0 2px 8px rgba(60,72,88,0.07)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        position: 'relative'
      }}>
        {msg.role === 'ai' && <span style={{ position: 'absolute', left: -36, top: 8, fontSize: 22, color: '#6366f1' }}>🤖</span>}
        {msg.role === 'user' && <span style={{ position: 'absolute', right: -36, top: 8, fontSize: 22, color: '#0ea5e9' }}>🧑</span>}
        {msg.content}
      </div>
    </div>
  );
};

export default ChatMessage;
