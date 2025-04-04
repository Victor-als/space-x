import { useState, useEffect } from "react";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export default function Filters({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }: FiltersProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(debouncedSearch);
    }, 600); 

    return () => clearTimeout(handler);
  }, [debouncedSearch, setSearchTerm]);

  return (
    <div className="relative flex flex-wrap justify-center mt-24 gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar missões..."
        className="py-2 w-[18rem] pl-4 rounded-full bg-neutral-700 text-white 2xl:w-[50rem] lg:w-[30rem] xl:w-[50rem]"
        value={debouncedSearch}
        onChange={(e) => setDebouncedSearch(e.target.value)}
      />
      <select
        className="p-2 w-[18rem] rounded-full bg-neutral-700 text-white 2xl:w-40"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">Todos os status</option>
        <option value="success">Sucesso</option>
        <option value="fail">Falha</option>
        <option value="favorites">Favoritos</option>
      </select>
    </div>
  );
}
