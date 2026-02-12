import { useEffect, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");
function Chatting({
  userName,
  roomName,
}: {
  userName: string;
  roomName: string;
}) {
  const [messages, setMessages] = useState(
    [] as Array<{
      id: number;
      username: string;
      content: string;
    }>,
  );
  const [typingUsers, setTypingUsers] = useState("");
  const [isTyping, setIsTyping] = useState("");
  socket.on("connect", () => {
    console.log("Connected to server with ID: " + socket.id);
  });
  useEffect(() => {
    socket.emit("join_room", roomName);
    
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("typing_message", (user) => {
      setTypingUsers(user.username);
      setIsTyping(`${user.username} is typing...`);
      setTimeout(() => {
        setTypingUsers("");
        setIsTyping("");
      }, 2000);
    });

    return () => {
      socket.off("receive_message");
      socket.off("connect");
      socket.off("join_room");
      socket.off("typing_message");
    };
  }, [roomName]);
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = () => {
    // Logic to send message to the server
    const message = {
      id: Date.now(),
      room: roomName,
      username: userName,
      content: newMessage,
    };
    socket.emit("send_message", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };
  const handleTyping = () => {
    socket.emit("typing", { username: userName, room: roomName });
  };

  return (
    <div className="border max-w-7xl! w-full border-green-300 p-6">
      <h1 className="text-2xl text-center dark:text-white font-bold">
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {message.username === userName ? "You" : message.username}
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                {message.content}
              </p>
            </div>

            {message.username === userName && (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {message.username.charAt(0)}
              </div>
            )}
          </div>
        ))}

        {typingUsers && typingUsers !== userName && (
          <p className="text-sm text-red-700 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <p className="w-8 h-8 rounded-full  bg-green-500 text-center leading-8.5 text-white font-bold">
                {typingUsers.charAt(0).toUpperCase()}
              </p>
              <span>{isTyping}</span>
            </div>
          </p>
        )}
      </div>
      <div className="flex gap-2 items-stretch">
        <input
          type="text"
          className="border border-green-300 rounded w-full h-12 px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
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
