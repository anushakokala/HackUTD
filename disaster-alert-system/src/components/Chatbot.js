import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Check if iframe already exists before appending it
    const existingIframe = document.getElementById('chatbot-container').querySelector('iframe');
    if (existingIframe) return; // Exit if an iframe already exists

    // Create and configure the iframe
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.chatbase.co/chatbot-iframe/QUCGRC90R6kZkn7QNQs0o";
    iframe.width = "100%";
    iframe.style.height = "100%";
    iframe.style.minHeight = "700px";
    iframe.frameBorder = "0";
    
    // Append the iframe to the DOM
    document.getElementById('chatbot-container').appendChild(iframe);
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
     
      <div id="chatbot-container" style={{ width: '850px', height: '100%', minHeight: '200px' }} />
    </div>
  );
};

export default Chatbot;
