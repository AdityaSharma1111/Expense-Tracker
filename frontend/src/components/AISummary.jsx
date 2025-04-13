import { useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/ApiPaths.js"
import Modal from "./layouts/Modal.jsx";

export default function AISummary() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSummaryGenerate = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_SUMMARY);
      setSummary(res.data.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("❌ Failed to generate AI summary.");
    } finally {
      setLoading(false);
      setOpenModal(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-1rounded-2xl shadow-md">
      <button
        onClick={handleSummaryGenerate}
        className="  text-white font-semibold px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l"
      >
        {loading ? "Generating..." : "Generate AI Summary"}
      </button>

      {summary && (
        <Modal
        children={summary}
        isOpen={openModal}
        title={"💡 AI Insight"}
        onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
