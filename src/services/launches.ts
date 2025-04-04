import api from "./api";

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details?: string;
  success?: boolean;
  flight_number: number;
  rocket: string;
  launchpad: string;
  links: {
    patch: {
      small?: string;
      large?: string;
    };
    flickr: {
      original: string[];
    };
    webcast?: string;
    wikipedia?: string;
  };
}

export const getLaunches = async (): Promise<Launch[]> => {
  try {
    const response = await api.get("/launches");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lançamentos:", error);
    return [];
  }
};

export const getLaunchById = async (id: string): Promise<Launch | null> => {
  const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  if (!response.ok) return null;
  return response.json();
};