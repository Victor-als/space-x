import { Star } from "lucide-react";
import { useLaunchStore } from "../../context/launchStore";

interface Props {
  id: string;
}

export default function FavoriteButton({ id }: Props) {
  const { isFavorite, toggleFavorite } = useLaunchStore();
  const favorite = isFavorite(id);

  return (
    <button
      className="mt-6 flex items-center border-0 gap-2 justify-center px-4 py-2 bg-transparent 
      rounded-lg cursor-pointer transition"
      onClick={() => toggleFavorite(id)}
    >
      <Star className={favorite ? "text-yellow-500 fill-yellow-500" : "text-white"} />
      {favorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    </button>
  );
}