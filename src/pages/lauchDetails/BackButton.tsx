import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="absolute top-32 left-6 md:left-48 cursor-pointer flex items-center gap-2 px-4 py-2
      text-white bg-transparent border-0 rounded-lg hover:text-gray-300 transition"
    >
      <ArrowLeft size={20} /> Voltar
    </button>
  );
}