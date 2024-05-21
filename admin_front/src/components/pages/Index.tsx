import React, { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ChatRepository } from "../../infrastructure/repositories/ChatRepository";
import { Header } from "../molecules/Header";

const meta = {
  title: "",
  meta: [],
  link: [],
  style: [],
  script: [],
};

interface ChatMessage {
  prompt: string;
  response: string;
}

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (loading || prompt.trim() === "") return;

    const newMessage: ChatMessage = { prompt, response: "" };
    setChatHistory([...chatHistory, newMessage]);
    setPrompt("");
    setLoading(true);
    setError(null);

    const chatRepo = new ChatRepository();
    try {
      const data = await chatRepo.post(prompt);
      const updatedMessage: ChatMessage = { ...newMessage, response: data.response };
      setChatHistory((prev) => prev.map((msg, index) => index === prev.length - 1 ? updatedMessage : msg));
    } catch (error) {
      console.error("Error:", error);
      setError("メッセージの送信中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <Header />
      <div className="flex flex-col h-screen bg-gray-100 pt-16">
        <div className="flex flex-col flex-grow p-4 overflow-auto">
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-end items-end">
                <div className="bg-green-400 text-white p-3 rounded-xl shadow-md max-w-xs">
                  {chat.prompt}
                </div>
                <img
                  src="/images/shomajirou.png"
                  alt="User"
                  className="w-10 h-10 rounded-full ml-2"
                />
              </div>
              {chat.response && (
                <div className="flex justify-start items-start mt-2">
                  <img
                    src="/images/アウラdot.png"
                    alt="Partner"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div className="bg-gray-300 text-black p-3 rounded-xl shadow-md max-w-xs">
                    {chat.response}
                  </div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center">
              <div className="loader border-t-4 border-green-400 rounded-full w-8 h-8 animate-spin"></div>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center mt-4">
              {error}
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
        <div className="p-4 bg-white flex items-center border-t border-gray-200">
          <textarea
            className="flex-grow p-2 border rounded-lg mr-2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="メッセージを入力してください"
          />
          <button
            className={`bg-green-400 text-white p-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSend}
            disabled={loading}
          >
            送信
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
