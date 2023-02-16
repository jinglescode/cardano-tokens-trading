import {
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Card from "./Card";

export default function Chat({ activites, sendChatMessage }) {
  const [messageText, setMessageText] = useState("");
  // const [activites, setActivites] = useState([
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "message 4",
  //   },

  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "message 4",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "message 4",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "message 4",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "message 4",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 3",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "hello world",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message: "message 2",
  //   },
  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "hey",
  //   },
  //   {
  //     type: "chat",
  //     from: "jingles",
  //     message:
  //       "message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 message 3 ",
  //   },

  //   {
  //     type: "chat",
  //     from: "abdel",
  //     message: "latest",
  //   },
  // ]);

  function sendMessage() {
    sendChatMessage(messageText);
    setMessageText("");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="h-full p-2">
      <Card className="h-full flex flex-col">
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 gap-4">
            {[...activites].reverse().map((activity, i) => {
              return (
                <div key={i}>
                  {activity.type == "chat" && (
                    <p>
                      <p className="w-48 text-ellipsis overflow-hidden">
                        <b>{activity.from}</b>
                      </p>
                      {activity.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Chat"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => sendMessage()}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <PaperAirplaneIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
