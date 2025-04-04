import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLaunchById, Launch } from "../../services/launches";
import axios from "axios";
import Loading from "../../components/Loading";
import BackButton from "./BackButton";
import LaunchImage from "./LaunchImage";
import LaunchExtraInfo from "./LaunchExtraInfo";
import WebcastButton from "./WebcastButton";
import FavoriteButton from "./FavoriteButton";
import EditDetails from "./EditDetails";
import { Pencil } from "lucide-react";

export default function LaunchDetails() {
  const { id } = useParams();
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [rocketName, setRocketName] = useState("Carregando...");
  const [launchpadName, setLaunchpadName] = useState("Carregando...");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  useEffect(() => {
    const fetchLaunch = async () => {
      if (!id) return;
      const data = await getLaunchById(id);
      if (!data) return; 

      const savedDetails = localStorage.getItem(`details-${id}`);
      if (savedDetails) {
        data.details = savedDetails;
      }
  
      setLaunch(data);
      setIsLoading(true);
  
      try {
        const [rocketRes, launchpadRes] = await Promise.all([
          data.rocket ? axios.get(`https://api.spacexdata.com/v4/rockets/${data.rocket}`) : Promise.resolve(null),
          data.launchpad ? axios.get(`https://api.spacexdata.com/v4/launchpads/${data.launchpad}`) : Promise.resolve(null),
        ]);
  
        setRocketName(rocketRes?.data?.name || "Desconhecido");
        setLaunchpadName(launchpadRes?.data?.name || "Desconhecido");
      } catch {
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

  const handleSaveDetails = (newDetails: string) => {
    if (!id || !launch) return;

    setLaunch({ ...launch, details: newDetails });

    localStorage.setItem(`details-${id}`, newDetails);
    setIsEditingDetails(false);
  };

  if (!launch || isLoading) return <Loading />;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center p-6 pt-44 text-white">
      <BackButton />

      <div
        className={`max-w-4xl block p-6 bg-white/15 backdrop-filter backdrop-blur-xs border-b-neutral-700
        rounded-3xl shadow-lg text-white transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-2">{launch.name}</h1>

        <p className="text-gray-400 text-center mb-4">
          {new Date(launch.date_utc).toLocaleDateString()}
        </p>

        <LaunchImage
          name={launch.name}
          imageUrl={launch.links.flickr.original[0]}
          patchUrl={launch.links?.patch?.large}
        />

        <div className="mt-4 text-lg text-gray-300 text-center">
          {isEditingDetails ? (
            <EditDetails
              details={launch.details || ""}
              onSave={handleSaveDetails}
              onCancel={() => setIsEditingDetails(false)}
            />
          ) : (
            <div className="flex flex-col  gap-2">
              <p>{launch.details || "Sem detalhes disponíveis."}</p>
              <button
                onClick={() => setIsEditingDetails(true)}
                className="cursor-pointer text-sm hover:text-gray-300 flex items-center gap-2 rounded text-white"
              >
                <Pencil size={16}/>
                Editar Detalhes
              </button>
            </div>
          )}
        </div>

        <LaunchExtraInfo
          rocketName={rocketName}
          launchpadName={launchpadName}
          success={launch.success ?? null}
        />

        {launch.links?.webcast && <WebcastButton url={launch.links.webcast} />}
        {id && <FavoriteButton id={id} />}
      </div>
    </div>
  );
}
