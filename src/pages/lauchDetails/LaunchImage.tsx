interface Props {
  name: string;
  imageUrl?: string;
  patchUrl?: string;
}

export default function LaunchImage({ name, imageUrl, patchUrl }: Props) {
  return (
    <div className="flex justify-center">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-96 rounded-lg shadow-lg" />
      ) : (
        <img src={patchUrl || "/placeholder.jpg"} alt={name} className="w-40" />
      )}
    </div>
  );
}