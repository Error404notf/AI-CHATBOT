import { useState } from 'react';
import Message from './Message';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { text: input, type: 'user' }]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input, task: 'conversation' }),
    });

    const result = await response.json();
    setMessages([...messages, { text: input, type: 'user' }, { text: result.response, type: 'bot' }]);
    setInput('');
  };

  return (
    <div>
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} type={msg.type} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

