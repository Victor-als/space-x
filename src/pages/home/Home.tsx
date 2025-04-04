import { useEffect, useState } from "react";
import { useLaunches } from "../../hooks/useLaunches";
import Pagination from "./Pagination";
import Filters from "./Filters";
import Loading from "../../components/Loading";
import { Launch } from "../../services/launches";
import MissionList from "./MissionList";

export default function Home() {
  const {
    paginatedLaunches,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    error, 
  } = useLaunches();

  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowContent(true), 200);
    }, 2000);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="relative min-h-screen w-full p-6 flex flex-col items-center">
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {error ? (
        <p className="text-red-500 text-lg mt-4">{error}</p>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl transition-opacity duration-200 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            {paginatedLaunches.length > 0 ? (
              paginatedLaunches.map((launch: Launch) => (
                <MissionList key={launch.id} launch={launch} />
              ))
            ) : (
              <p className="text-white text-lg">Nenhum lançamento encontrado.</p>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
