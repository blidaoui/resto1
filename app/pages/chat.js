// frontend/pages/chat.js
"use client"
import React, { useState } from 'react';

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      };
      const response = await fetch('http://localhost:8000/backend/chatgpt', requestOptions);
      const data = await response.json();
      setResponse(data); // Set the response from the model
      setError(''); // Clear previous errors if request succeeds
    } catch (error) {
      console.error('Error fetching response:', error);
      setError('Error fetching response'); // Set error message
    }
  };

  return (
    <div>
      <h1>Chat with ChatGPT</h1>
      <div style={{ marginBottom: '1rem' }}>
        {/* Display user input */}
        <p>User: {input}</p>
      </div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Send</button>
      <div style={{ marginTop: '1rem' }}>
        {/* Display response from the model */}
        <p>ChatGPT: {response}</p>
      </div>
    </div>
  );
};

export default Chat;
