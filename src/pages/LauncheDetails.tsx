import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaunchById, Launch } from "../services/launches";
import { useLaunchStore } from "../context/launchStore";
import {
  Star,
  Rocket,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Video,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import Loading from "../components/Loading";

export default function LaunchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [rocketName, setRocketName] = useState<string | null>(null);
  const [launchpadName, setLaunchpadName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { isFavorite, toggleFavorite } = useLaunchStore();


  useEffect(() => {
    const fetchLaunch = async () => {
      if (!id) return;
      const data = await getLaunchById(id);
      setLaunch(data);
      setIsLoading(true);

      try {
        const [rocketRes, launchpadRes] = await Promise.all([
          data?.rocket
            ? axios.get(`https://api.spacexdata.com/v4/rockets/${data.rocket}`)
            : Promise.resolve(null),
          data?.launchpad
            ? axios.get(`https://api.spacexdata.com/v4/launchpads/${data.launchpad}`)
            : Promise.resolve(null),
        ]);

        setRocketName(rocketRes?.data?.name || "Desconhecido");
        setLaunchpadName(launchpadRes?.data?.name || "Desconhecido");
      } catch (error) {
        console.error("Erro ao buscar dados adicionais:", error);
        setRocketName("Desconhecido");
        setLaunchpadName("Desconhecido");
      }

      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, 1500);
    };

    fetchLaunch();
  }, [id]);

  if (!launch || isLoading) return <Loading />;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6 pt-44 text-white">
      <button
        onClick={() => navigate("/")}
        className="absolute top-32 left-6 md:left-48 cursor-pointer flex items-center gap-2 px-4 py-2
         text-white bg-transparent border-0 rounded-lg hover:text-gray-300 transition"
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div
        className={`max-w-4xl block p-6 bg-white/15 backdrop-filter backdrop-blur-xs border-b-neutral-700
        rounded-3xl shadow-lg text-white transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-2">{launch.name}</h1>
        <p className="text-gray-400 text-center mb-4 flex items-center justify-center gap-2">
          <Calendar size={18} />{" "}
          {new Date(launch.date_utc).toLocaleDateString()}
        </p>

        <div className="flex justify-center">
          {launch.links.flickr.original.length > 0 ? (
            <img
              src={launch.links.flickr.original[0]}
              alt={launch.name}
              className="w-96 rounded-lg shadow-lg"
            />
          ) : (
            <img
              src={launch.links?.patch?.large || "/placeholder.jpg"}
              alt={launch.name}
              className="w-40"
            />
          )}
        </div>

        <p className="mt-4 text-lg text-gray-300 text-center">
          {launch.details || "Sem detalhes disponíveis."}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-neutral-700 p-3 rounded-lg">
            <Rocket size={20} /> <span>{rocketName || "Carregando..."}</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-700 p-3 rounded-lg">
            <MapPin size={20} /> <span>{launchpadName || "Carregando..."}</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-700 p-3 rounded-lg">
            {launch.success ? (
              <CheckCircle size={20} className="text-green-400" />
            ) : (
              <XCircle size={20} className="text-red-400" />
            )}
            <span>
              <strong>Sucesso:</strong> {launch.success ? "Sim" : "Não"}
            </span>
          </div>
        </div>

        {launch.links?.webcast && (
          <a
            href={launch.links.webcast}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 justify-center px-4 py-2 bg-red-500
             hover:bg-red-400 text-white rounded-lg text-center transition"
          >
            <Video size={20} /> Assistir Lançamento
          </a>
        )}

        <button
          className="mt-6 flex items-center border-0 gap-2 justify-center px-4 py-2 bg-transparent 
          rounded-lg cursor-pointer transition"
          onClick={() => toggleFavorite(id || "")}
        >
          <Star
            className={isFavorite(id || "") ? "text-yellow-500 fill-yellow-500" : "text-white"}
          />
          {isFavorite(id || "") ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </button>
      </div>
    </div>
  );
}
