"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botMsg = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
  };

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[40rem] w-[30rem] flex-col bg-[#ffffff] shadow-xl rounded-[1rem]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#1B5A96] px-[1.5rem] py-[1rem] text-white shadow rounded-t-[1rem]">
        <div className="h-10 w-10 rounded-full bg-white text-[#1B5A96] flex items-center justify-center font-bold">
          A
        </div>
        <div>
          <p className="font-semibold">Adaired Support</p>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-[1.5rem] py-[1rem]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow ${
                msg.sender === "user"
                  ? "bg-[#1B5A96] text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="overflow-x-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-lg font-bold mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-md font-semibold mb-2" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2 leading-relaxed" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-4 list-disc mb-1" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-semibold" {...props} />
                    ),

                    // ✅ TABLE SUPPORT
                    table: ({ node, ...props }) => (
                      <table
                        className="w-full border border-gray-300 my-2 text-sm"
                        {...props}
                      />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="border px-2 py-1 bg-gray-100 text-left"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="border px-2 py-1" {...props} />
                    ),
                    tr: ({ node, ...props }) => (
                      <tr className="border-b" {...props} />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 border-t border-t-[#000000]/10 bg-white p-3 rounded-b-[1rem]">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:border-[#1B5A96]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="rounded-full bg-[#1B5A96] px-5 py-2 text-white text-sm hover:bg-[#154a7a]"
        >
          Send
        </button>
      </div>
    </div>
  );
}
