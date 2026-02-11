"use client";
import { useState } from "react";

function RoomComponent() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);
  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
      setJoined(true);
    }
  };
  return (
    <div className="">
      {!joined ? (
        <div className="max-w-xl w-full mx-auto mt-10 p-5 border rounded border-gray-300 ">
          <h3 className="text-2xl text-center font-bold pb-4 border-b border-gray-300 mb-4">
            Join The Chat Room
          </h3>
          <div className="space-y-2">
            <label htmlFor="userName" className="block font-semibold">
             User Name
            </label>
            <input
              type="text"
              id="userName"
              className="border border-gray-300 rounded w-full py-3 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="John..."
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="roomName" className="block font-semibold">
              Room ID
            </label>
            <input
              type="text"
              id="roomName"
              className="border border-gray-300 rounded w-full py-3 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoomName(event.target.value);
              }}
            />
          </div>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <h1>
          Welcome {userName} to the room {roomName}
        </h1>
      )}
    </div>
  );
}

export default RoomComponent;
