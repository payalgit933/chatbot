// components/FooterNote.jsx
import React from 'react';

const FooterNote = ({ darkMode }) => (
  <div style={{
    marginTop: 18,
    textAlign: 'center',
    color: darkMode ? '#cbd5e1' : '#94a3b8',
    fontSize: 13
  }}>
    &copy; {new Date().getFullYear()} CHATTERBOT &mdash; Powered by Google Gemini
  </div>
);


export default FooterNote;
