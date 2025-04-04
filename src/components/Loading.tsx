export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300/10 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg">Carregando...</p>
    </div>
  );
}