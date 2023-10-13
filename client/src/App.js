import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { BiUserCircle } from "react-icons/bi";

function App() {
  const [message, setMessage] = useState("");
  const [messageDb, setMessageDb] = useState([]);
  const [name, setName] = useState("");
  const socket = io("http://localhost:8080/");

  useEffect(() => {
    // Register the event listener for "public_channel" only once.
    socket.on("public_channel", (data) => {
      setMessageDb((messageDb) => [
        ...messageDb,
        { text: data.text, name: data.gname },
      ]);
      setMessage("");
      console.log("hihd", data);
      console.log(data.text);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  function sendMessage() {
    socket.emit("public_channel", { text: message, gname: name });

    // setMessage("");
  }

  return (
    <div className="text-2xl flex flex-col">
      <h1 className="text-5xl underline underline-offset-2 mx-auto">
        {" "}
        Chat Room
      </h1>
      {/* display message */}
      <form>
        <div>
          <h1>Enter Name</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" border-solid border-4 border-black"
          />
        </div>
        <div className="flex flex-col w-[50%] mx-auto border-solid border-4 border-black p-4 rounded-xl">
          <div className="h-[800px] flex flex-col overflow-y-scroll  gap-y-2">
            {messageDb.map((item, index) => (
              <div key={index} className=" ">
                {console.log(item.text)}
                {name === item.name ? (
                  <div className="w-fit ml-auto flex">
                    <div className="flex flex-col bg-blue-500 rounded-2xl rounded-br-none  px-4 py-2">
                      <h1 className="font-bold text-lg">{`${item.name}`}</h1>
                      <p className="left-0 text-2xl w-fit ml-auto mt-1">
                        {item.text}
                      </p>
                    </div>
                    <BiUserCircle className="mt-auto text-5xl" />
                  </div>
                ) : (
                  <div className="w-fit mr-auto flex">
                    <BiUserCircle className="mt-auto text-5xl" />
                    <div className="flex flex-col bg-gray-500 rounded-2xl rounded-bl-none  px-4 py-2">
                      <h1 className="font-bold text-lg">{`${item.name}`}</h1>
                      <p className="left-0 text-2xl w-fit ml-auto mt-1">
                        {item.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* display message */}
          </div>
          <div className=" border-solid border-4  border-black  p-2 rounded-xl  w-full  flex mt-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                sendMessage();
                // setMessage("");
              }}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded shadow right-0 "
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
