// components/ChatInput.jsx
import React from 'react';

const ChatInput = ({ input, setInput, handleSend, handleInputKeyDown, loading, apiKey }) => {
  return (
    <form
      style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}
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
  );
};

export default ChatInput;
