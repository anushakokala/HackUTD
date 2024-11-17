import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    const result = await fetch('/dialogflow-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await result.json();
    setResponse(data.fulfillmentText);
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <InputGroup className="mb-3">
        <FormControl
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </InputGroup>
      {response && <p>{response}</p>}
    </div>
  );
}

export default Chatbot;
