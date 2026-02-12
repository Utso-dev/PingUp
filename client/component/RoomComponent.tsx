"use client";
import { useState } from "react";
import Chatting from "./Chatting";

function RoomComponent() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState({
    userName: "",
    roomName: "",
  });
  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
      setJoined(true);
    } else {
      setError({
        userName: userName === "" ? "User Name is required" : "",
        roomName: roomName === "" ? "Room ID is required" : "",
      });
    }
  };
  return (
    <div className="">
      {!joined ? (
        <div className="w-full mx-auto p-5 md:p-6 py-10! border rounded-md shadow-[10px_10px_100000px_20px_rgba(0,0,0,0.1)] shadow-green-400 border-green-200 bg-linear-to-b from-green-50  to-green-100">
          <h3 className="text-2xl text-center font-bold pb-4 border-b  border-gray-300 mb-4">
            Join The Chat Room
          </h3>
          <div className="space-y-2">
            <label htmlFor="userName" className="block font-semibold">
              User Name
            </label>
            <div className="mb-4">
              <input
                type="text"
                id="userName"
                className="border border-green-300 rounded w-full py-3 px-3 focus:outline-none focus:ring-2 mb-2 focus:ring-green-400"
                placeholder="User Name..."
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              {error.userName && (
                <p className="text-red-500 text-sm">{error.userName}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="roomName" className="block font-semibold">
              Room ID
            </label>
            <div className="">
              <input
                type="text"
                id="roomName"
                className="border border-green-300 rounded w-full py-3 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoomName(event.target.value);
                }}
              />
              {error.roomName && (
                <p className="text-red-500 text-sm">{error.roomName}</p>
              )}
            </div>
          </div>
          <button
            className="bg-green-200 mt-6 border border-green-200  cursor-pointer shadow-[0px_0px_8px_2px_rgba(0,0,0,0.1)] font-semibold uppercase hover:tracking-wider transition-all duration-200 text-black/80 shadow-black/10 w-full py-3.5 rounded-md"
            onClick={joinRoom}
          >
            Join A Room
          </button>
        </div>
      ) : (
        <Chatting userName={userName} roomName={roomName} />
      )}
    </div>
  );
}

export default RoomComponent;
