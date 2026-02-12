import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

function Chatting({
  userName,
  roomName,
}: {
  userName: string;
  roomName: string;
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: "Alice",
      content: "Hello everyone!",
    },
    {
      id: 2,
      username: "Bob",
      content: "Hi Alice! How are you?",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = () => {
    // Logic to send message to the server
    const message = {
      id: messages.length + 1,
      username: userName,
      content: newMessage,
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };
  return (
    <div className="border max-w-7xl! w-full border-green-300 p-6">
      <h1 className="text-2xl text-center font-bold">
        Welcome <span className="text-green-500 capitalize">{userName}</span> to
        the room <span className="text-green-500">{roomName}</span>
      </h1>
      <div className="h-126 border  mt-4 mb-4 border-green-300 rounded-md p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.username === userName ? "justify-end" : "justify-start"} items-start space-x-4 mb-4`}
          >
            {message.username !== userName && (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {message.username.charAt(0)}
              </div>
            )}
            <div
              className={
                message.username === userName ? "text-right" : "text-left"
              }
            >
              <p className="text-sm text-gray-500">{message.username === userName ? "You" : message.username}</p>
              <p className="text-gray-800">{message.content}</p>
            </div>
            {message.username === userName && (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {message.username.charAt(0)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-stretch">
        <input
          type="text"
          className="border border-green-300 rounded w-full h-12 px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 border border-green-200 cursor-pointer font-semibold uppercase transition-all duration-200 text-white h-12 px-5 rounded-md flex items-center justify-center"
        >
          <LuSendHorizontal />
        </button>
      </div>
    </div>
  );
}

export default Chatting;
