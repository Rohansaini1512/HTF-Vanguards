import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Assistant: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: string; message: string }[]>([]);

  const toggleModal = () => setShowDialog(!showDialog);

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Add user message to chat history
    const newMessage = { sender: 'user', message: userMessage };
    setChatHistory((prev) => [...prev, newMessage]);

    // Simulate Gemini response (you can replace this with a real API call)
    const geminiResponse = await getGeminiResponse(userMessage);
    const geminiMessage = { sender: 'gemini', message: geminiResponse };
    setChatHistory((prev) => [...prev, geminiMessage]);

    // Clear the input field
    setUserMessage('');
  };

  // Simulate Gemini API response (replace with actual API call)
  const getGeminiResponse = async (message: string) => {
    // For now, just simulate a response from Gemini
    return `Gemini says: I received your message: "${message}". How can I assist you further?`;
  };

  return (
    <div>
      {/* Circular button */}
      <div
        onClick={toggleModal}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg"
      >
        💬
      </div>

      {/* Modal for chat */}
      <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
        <DialogContent className="bg-white w-[40rem] h-[35rem] rounded-md shadow-lg overflow-hidden">
          <DialogHeader>
            <DialogTitle>Chat with Gemini</DialogTitle>
          </DialogHeader>
          <div className="p-4 flex flex-col space-y-4 overflow-y-auto h-full">
            {/* Chat messages */}
            <div className="space-y-2">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Input field for the user */}
            <div className="flex mt-4">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
                placeholder="Type your message..."
              />
              <Button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-md">
                Send
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assistant;
