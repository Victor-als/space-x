import { Video } from "lucide-react";

interface Props {
  url: string;
}

export default function WebcastButton({ url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 flex items-center gap-2 justify-center px-4 py-2 bg-red-500
      hover:bg-red-400 text-white rounded-lg text-center transition"
    >
      <Video size={20} /> Assistir Lançamento
    </a>
  );
}