import { Link } from "react-router-dom";
import { Launch } from "../../services/launches";
import { Calendar } from "lucide-react";

interface MissionListProps {
  launch: Launch;
}

const MissionList: React.FC<MissionListProps> = ({ launch }) => {
  return (
    <Link 
      to={`/launches/${launch.id}`} 
      className="block p-6 bg-white/15 backdrop-filter backdrop-blur-xs border-b-neutral-700
      rounded-3xl shadow-lg hover:bg-indigo-600 transition">

    <img 
     src={launch.links?.patch?.small || "/placeholder.jpg"} 
     alt={launch.name} 
     className="w-24 h-24 object-contain mx-auto rounded-md" 
    />

    <h2 className="text-lg text-gray-300 font-bold mt-4">
      Nome da missão: {launch.name}
    </h2>
    <p className="text-sm flex gap-1 font-medium text-gray-400">
    <Calendar size={18} />  {new Date(launch.date_utc).toLocaleDateString()}
    </p>
  </Link>
);
};

export default MissionList;