import { Rocket, MapPin, CheckCircle, XCircle } from "lucide-react";

interface Props {
  rocketName: string;
  launchpadName: string;
  success: boolean | null;
}

export default function LaunchExtraInfo({ rocketName, launchpadName, success }: Props) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex items-center gap-2 bg-neutral-700 p-3 rounded-lg">
        <Rocket size={20} /> <span>{rocketName}</span>
      </div>
      <div className="flex items-center gap-2 bg-neutral-700 p-3 rounded-lg">
        <MapPin size={20} /> <span>{launchpadName}</span>
      </div>
      <div className="flex items-center gap-2 bg-neutral-700 p-3 rounded-lg">
        {success ? (
          <CheckCircle size={20} className="text-green-400" />
        ) : (
          <XCircle size={20} className="text-red-400" />
        )}
        <span>
          <strong>Sucesso:</strong> {success ? "Sim" : "Não"}
        </span>
      </div>
    </div>
  );
}