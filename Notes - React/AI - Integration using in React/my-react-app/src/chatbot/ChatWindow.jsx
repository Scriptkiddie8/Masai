import React from "react"
import { GoogleGenAI } from "@google/genai";
import { Sparkle, Maximize2, X, Send, LoaderPinwheel } from "lucide-react"; 
import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

const genAI = new GoogleGenAI({
  apiKey: "AIzaSyA_a7a6lRsUKBEG4_I7i8hN8WLQAVqmE9s", 
});

const ChatWindow = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("Guest");
  const [userInitial, setUserInitial] = useState("G");
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const ChatWindowRef = useRef(null);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load user data when opened
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(
        localStorage.getItem("name") || '{"name": "Guest"}'
      );
      setUserName(userDetails?.name || "Guest");
      setUserInitial((userDetails.name || "G").charAt(0).toUpperCase());
      setMessage([
        {
          text: `Hi, ${userDetails.name || "Guest"}! I'm your AI assistant powered by Masai. How can I help you today?`,
          isBot: true,
        },
      ]);
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ChatWindowRef.current &&
        !ChatWindowRef.current.contains(event.target) 
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, [isOpen, onClose]);

  //This will help us to scroll to the message
  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [message]);

  //This will focus to input box when the chatbot is open
  useEffect(()=>{
    if(isOpen && inputRef.current){
      inputRef.current.focus();
    }
  },[isOpen])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessage((prev)=>[...prev, {text: userMessage, isBot: false}]);
    setIsLoading(true);

    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
      })
      
      const reply = result.text;
      setMessage((prev)=>[...prev, {text: reply, isBot: true}]);

    } catch (error) {
      console.log(error);
      setMessage(prev=> [...prev, {text: "I am sorry, I ran into an error", isBot: true}])
    }finally{
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e)=>{
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      handleSubmit(e);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      ref={ChatWindowRef}
      className={`fixed bottom-20 left-4 w-80 bg-gray-900 rounded-2xl shadow-2xl border-gray-200 overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-lg border z-50 ${
        isMinimized ? "h-14" : "h-[500px]"
      }`}
      style={{ boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Sparkle size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-sm">AI Assistant</h3>
            <p className="text-xs">
              Welcome,{" "}
              {userName.length > 15 ? `${userName.slice(0, 15)}...` : userName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={onClose}  className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <X size={16}/>
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
        {/* message */}
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-3 space-y-3 bg-gray-900">
            {message.map((message, index)=>(
              <div key={index} className="flex item-start gap-2 text-white">
                {message.isBot ? (
                  <ChatMessage message={message.text} isBot={true}/>
                ) : (
                  <div className="flex items-start gap-2 justify-end w-full text-white">
                    <div className="flex-1">
                        <ChatMessage message={message.text} isBot={false}/>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 flex items-center justify-between flex items-center justify-center flex-shrink-0 text-xs">
                        {userInitial}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-white p-2">
                <LoaderPinwheel className="w-4 h-4 animate-spin"/>
                <span className="text-xs">AI is Thinking...</span>
              </div>)}
            <div ref={messageEndRef}></div>
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="relative">
              <textarea ref={inputRef} value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyDown} rows={1} style={{maxHeight:"100px"}} placeholder="Type your query" className={`w-full pr-10 pl-3 py-2 rounded-xl border-gray-200 text-white`}></textarea>
              <button type="submit" disabled={isLoading || !input.trim()} className={`absolute left-2 top-1/2 text-white -translate-y-1/2 p-1.5 rounded-full`}>
                  <Send size={14}/>
              </button>
            </div>
          </form>
        </>
      )}
    </div> 
  );
};

export default ChatWindow;
