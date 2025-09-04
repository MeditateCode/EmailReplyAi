"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState(""); // starts empty
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Professional");

  // Mock Gemini call (replace later with actual API)
  const generateReplyWithGemini = async (email: string, tone: string) => {
    return `Here is a ${tone.toLowerCase()} reply to your email:\n\nThank you for reaching out! I'd be happy to assist you further. Please share your availability so we can schedule a call.`;
  };

  const handleGenerateReply = async () => {
    if (!email || email.trim() === "") {
      setReply("⚠️ Please enter or paste an email before generating a reply.");
      return;
    }

    setLoading(true);
    try {
      const generatedReply = await generateReplyWithGemini(email, tone);
      setReply(generatedReply);
    } catch (error) {
      setReply("❌ Failed to generate reply. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (reply) {
      navigator.clipboard.writeText(reply);
      alert("Reply copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full relative">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4 flex items-center justify-center gap-2">
          📧 AI Email Reply Generator
        </h1>

        {/* Email Input */}
        <textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Paste the email you received..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none text-gray-700"
          rows={6}
        />

        {/* Tone Selector */}
        <label className="block mt-4 text-gray-700 font-medium">
          Reply Tone:
        </label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-2 border rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-400"
        >
          <option className="text-blue-600">Professional</option>
          <option className="text-green-600">Friendly</option>
          <option className="text-purple-600">Concise</option>
        </select>

        {/* Generate Button */}
        <button
          onClick={handleGenerateReply}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Reply"}
        </button>

        {/* Reply Box */}
        {reply && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-blue-50 p-4 rounded-xl shadow-inner relative"
          >
            <p className="text-gray-800 whitespace-pre-line leading-relaxed font-medium">
              {reply}
            </p>
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
            >
              <Copy size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
