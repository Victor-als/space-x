import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const pagesToShow = 2;
  const startPage = Math.max(1, currentPage - pagesToShow);
  const endPage = Math.min(totalPages, currentPage + pagesToShow);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center items-center mt-6 text-sm sm:text-base">

      <button
        className="p-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full disabled:opacity-50"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        aria-label="Primeira página"
      >
        <ChevronsLeft size={18} />
      </button>


      <button
        className="p-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full disabled:opacity-50"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={18} />
      </button>

      {startPage > 1 && (
        <>
          <button
            className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full"
            onClick={() => goToPage(1)}
          >
            1
          </button>
          {startPage > 2 && <span className="text-white px-1">...</span>}
        </>
      )}


      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-2 py-1 rounded-full ${
            currentPage === page
              ? "bg-indigo-500 text-white"
              : "bg-neutral-700 hover:bg-neutral-600 text-white"
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages - 1 && <span className="text-white px-1">...</span>}
      {endPage < totalPages && (
        <button
          className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full"
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      )}


      <button
        className="p-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full disabled:opacity-50"
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
        aria-label="Próxima página"
      >
        <ChevronRight size={18} />
      </button>


      <button
        className="p-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full disabled:opacity-50"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage >= totalPages}
        aria-label="Última página"
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  );
}
