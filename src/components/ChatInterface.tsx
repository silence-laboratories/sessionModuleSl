
import React, { useEffect, useRef } from 'react';
import { Send, UserCircle, Bot, Loader2 } from 'lucide-react';

type ChatMessage = {
  sender: string;
  message: string;
};

type ChatInterfaceProps = {
  chatLog: ChatMessage[];
  chatInput: string;
  isLoading?: boolean;
  setChatInput: (input: string) => void;
  sendChatMessage: () => void;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chatLog,
  chatInput,
  isLoading = false,
  setChatInput,
  sendChatMessage,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  const formatMessage = (message: string): string => {
    try {
      // Check if the message is a JSON string
      const parsed = JSON.parse(message);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      // If not JSON or parsing fails, return the original message
      return message;
    }
  };

  return (
    <div className="session-card">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-blockchain-purple" />
        <h2 className="text-lg font-semibold">Chat with your Personal AI agent</h2>
      </div>
      
      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="border rounded-lg bg-gray-50 h-80 overflow-y-auto mb-4 p-4 space-y-3"
      >
        {chatLog.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Bot className="h-12 w-12 mb-2 opacity-20" />
            <p>Your conversation will appear here.</p>
            <p className="text-sm">Try saying "send 0.00001 to 0x1234..."</p>
          </div>
        ) : (
          chatLog.map((entry, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                entry.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {entry.sender === 'backend' && (
                <div className="flex-shrink-0">
                  <Bot className="h-8 w-8 p-1 bg-blockchain-purple text-white rounded-full" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  entry.sender === 'user'
                    ? 'bg-blockchain-purple text-white rounded-br-none'
                    : 'bg-white border shadow-sm rounded-bl-none'
                }`}
              >
                {entry.sender === 'backend' && entry.message.startsWith('{') ? (
                  <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-all font-mono">
                    {formatMessage(entry.message)}
                  </pre>
                ) : (
                  <p className="break-all whitespace-pre-wrap">{entry.message}</p>
                )}
              </div>
              
              {entry.sender === 'user' && (
                <div className="flex-shrink-0">
                  <UserCircle className="h-8 w-8 p-1 bg-blockchain-blue text-white rounded-full" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Input Area */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder='Type a message, e.g. "send 0.00001 to 0xABC..."'
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field flex-1"
          disabled={isLoading}
        />
        <button
          onClick={sendChatMessage}
          disabled={!chatInput.trim() || isLoading}
          className="primary-button h-full aspect-square flex items-center justify-center p-2"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export { ChatInterface };
