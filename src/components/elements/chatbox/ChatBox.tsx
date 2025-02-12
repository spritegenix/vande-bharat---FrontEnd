"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaChevronDown, FaRegImages } from "react-icons/fa";
import { IoChevronDownOutline, IoClose, IoSend } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Button from "../Button";
import { GoPaperclip } from "react-icons/go";
import { IoIosSend } from "react-icons/io";

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<Boolean>(false);

  const toggleChatBox = () => {
    setIsOpen((pre) => !pre);
  };

  return (
    <>
      {/* Expanded chat box */}
      <div
        className={`fixed bottom-0 right-20 z-50 flex h-[30rem] w-80 transform flex-col rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-[26.5rem]"} `}
      >
        {/* Upper Nav */}
        <div className="flex justify-between border-b border-gray-200 p-2">
          <div className="flex items-center gap-2">
            <Link
              href="#"
              className="flex-center h-10 w-10 rounded-full border-2 border-white bg-bg1"
            >
              P
            </Link>
            <p className="cursor-pointer" onClick={toggleChatBox}>
              Messaging
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TbEdit
              onClick={() => setIsChatBoxOpen((pre) => !pre)}
              className="cursor-pointer text-2xl duration-300 hover:text-bg1"
            />
            <IoChevronDownOutline
              onClick={toggleChatBox}
              className={`cursor-pointer text-2xl duration-300 hover:text-bg1 ${isOpen ? "scale-y-[-1]" : ""}`}
            />
            <IoClose
              onClick={() => setIsChatBoxOpen(false)}
              className={`cursor-pointer text-2xl duration-300 hover:text-red-500`}
            />
          </div>
        </div>

        {/* Chat content container */}
        <div className="flex-1 overflow-y-auto px-4">
          {true ? (
            <ul>
              {[...Array(10)].map((_, i) => (
                <li
                  onClick={() => setIsChatBoxOpen((pre) => !pre)}
                  key={i}
                  className="flex items-center gap-2 border-b border-gray-200 p-2"
                >
                  <div className="flex-center h-10 w-10 rounded-full border-2 border-white bg-bg1">
                    P
                  </div>

                  <div className="flex-1">
                    <p className="cursor-pointer">John Doe</p>
                    <p className="text-sm text-zinc-500">Hello, how are you?</p>
                  </div>

                  <p className="text-sm text-zinc-500">2 min ago</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Chat Found</p>
          )}
        </div>
      </div>
      {/* ChatContentContainer  */}
      {isChatBoxOpen && (
        <ChatContentContainer setIsChatBoxOpen={setIsChatBoxOpen} />
      )}
    </>
  );
};

export default ChatBox;

function ChatContentContainer({ setIsChatBoxOpen }: any) {
  const [isOpen, setIsOpen] = useState<Boolean>(true);
  const [message, setMessage] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isTextAreaExpanded, setIsTextAreaExpanded] = useState(false);

  // Handle input changes and resize textarea dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust height dynamically
    }
  };

  // Handle sending message on Enter key (without Shift)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default new line behavior
      if (message.trim()) {
        sendMessage(); // Function to send the message
      }
    }
  };

  // Send message function
  const sendMessage = () => {
    // console.log("Message sent:", message);
    setMessage(""); // Clear the input field after sending
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
    }
  };
  const toggleChatBox = () => {
    setIsOpen((pre) => !pre);
  };
  return (
    <>
      {/* Expanded chat box */}
      <div
        className={`fixed bottom-0 right-[26rem] z-50 flex h-[30rem] w-96 transform flex-col rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-[26.5rem]"} `}
      >
        {/* Upper Nav */}
        <div className="flex justify-between border-b border-gray-200 p-2">
          <div className="flex items-center gap-2">
            <Link
              href="#"
              className="flex-center h-10 w-10 rounded-full border-2 border-white bg-bg1"
            >
              D
            </Link>
            <p className="cursor-pointer" onClick={toggleChatBox}>
              Divyansh Advocate
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoChevronDownOutline
              onClick={toggleChatBox}
              className={`cursor-pointer text-2xl duration-300 hover:text-bg1 ${isOpen ? "scale-y-[-1]" : ""}`}
            />
            <IoClose
              onClick={() => setIsChatBoxOpen(false)}
              className={`cursor-pointer text-2xl duration-300 hover:text-red-500`}
            />
          </div>
        </div>

        {/* Chat content container */}
        <div className="flex-1 overflow-y-auto p-4">
          <p>No Chat Found</p>
        </div>

        {/* Input box */}
        <div className="border-t border-gray-200 p-2">
          <div className="flex gap-2">
            <textarea
              ref={textAreaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Write your message..."
              rows={isTextAreaExpanded ? 10 : 3}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-200 p-2 text-gray-700 transition duration-300 focus:outline-none"
              style={{ maxHeight: "10rem", overflowY: "auto" }}
            />
            <IoChevronDownOutline
              onClick={() => setIsTextAreaExpanded((pre) => !pre)}
              className={`cursor-pointer text-2xl duration-300 hover:text-bg1 ${isTextAreaExpanded ? "scale-y-[-1]" : ""}`}
            />
          </div>
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex gap-2">
              <FaRegImages
                className={`cursor-pointer text-2xl duration-300 hover:text-bg1`}
              />
              <GoPaperclip
                className={`cursor-pointer text-2xl duration-300 hover:text-bg1`}
              />
            </div>
            <Button
              variant="orange"
              disabled={!message}
              rightIcon={<IoIosSend className="text-2xl text-white" />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
