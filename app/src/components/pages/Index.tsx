import React, { useState, useEffect, useRef } from "react";
import { DomainWatchRepository } from "../../infrastructure/repositories/DomainWatchRepository";
import { Header } from "../molecules/Header";

interface WhoisData {
  domain_name: string;
  registrar: string;
  creation_date: string;
  updated_date: string;
  expiration_date: string;
  status: string;
  registrant: {
    organization: string;
    state: string;
    country: string;
    country_code: string;
  };
  administrative_contact: {
    organization: string;
    state: string;
    country: string;
    country_code: string;
  };
  technical_contact: {
    organization: string;
    state: string;
    country: string;
    country_code: string;
  };
  name_servers: string[];
}

interface ChatMessage {
  prompt: string;
  response: WhoisData | null;
}

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (loading || prompt.trim() === "") return;

    const newMessage: ChatMessage = { prompt, response: null };
    setChatHistory([...chatHistory, newMessage]);
    setPrompt("");
    setLoading(true);
    setError(null);

    const chatRepo = new DomainWatchRepository();
    try {
      const data = await chatRepo.get(prompt);
      const updatedMessage: ChatMessage = { ...newMessage, response: data.whois_data };
      setChatHistory((prev) =>
        prev.map((msg, index) => (index === prev.length - 1 ? updatedMessage : msg))
      );
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
    <>
    <Header />
    <div className="flex flex-col h-screen bg-gray-100 pt-16">
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        {chatHistory.map((chat, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-end items-end">
              <div className="bg-green-400 text-white p-3 rounded-xl shadow-md max-w-xs">
                {chat.prompt}
              </div>
            </div>
            {chat.response && (
              <div className="flex justify-start items-start mt-2">
                <div className="bg-gray-300 text-black p-3 rounded-xl shadow-md max-w-xs">
                  <p><strong>ドメイン名:</strong> {chat.response.domain_name}</p>
                  <p><strong>レジストラ:</strong> {chat.response.registrar}</p>
                  <p><strong>作成日:</strong> {chat.response.creation_date}</p>
                  <p><strong>更新日:</strong> {chat.response.updated_date}</p>
                  <p><strong>有効期限:</strong> {chat.response.expiration_date}</p>
                  <p><strong>ステータス:</strong> {chat.response.status}</p>
                  <p><strong>登録者:</strong> {chat.response.registrant.organization}, {chat.response.registrant.state}, {chat.response.registrant.country} ({chat.response.registrant.country_code})</p>
                  <p><strong>管理連絡先:</strong> {chat.response.administrative_contact.organization}, {chat.response.administrative_contact.state}, {chat.response.administrative_contact.country} ({chat.response.administrative_contact.country_code})</p>
                  <p><strong>技術連絡先:</strong> {chat.response.technical_contact.organization}, {chat.response.technical_contact.state}, {chat.response.technical_contact.country} ({chat.response.technical_contact.country_code})</p>
                  <p><strong>ネームサーバー:</strong> {chat.response.name_servers.join(", ")}</p>
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
          placeholder="ドメイン名を入力してください"
        />
        <button
          className={`bg-green-400 text-white p-2 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSend}
          disabled={loading}
        >
          送信
        </button>
      </div>
    </div>
    </>
  );
}
