// components/ErrorBox.jsx
import React from 'react';

const ErrorBox = ({ error }) => {
  if (!error) return null;
  return (
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
  );
};

export default ErrorBox;
