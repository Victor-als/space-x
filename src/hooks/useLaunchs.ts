import { useState, useMemo } from "react";
import { useLaunchStore } from "../context/launchStore";
import { getLaunches, Launch } from "../services/launches";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

export function useLaunches() {
  const { isFavorite } = useLaunchStore();
  const [searchTerm, setSearchTermRaw] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const debouncedSetSearchTerm = useMemo(() => {
    return debounce((value: string) => {
      setSearchTermRaw(value);
      setCurrentPage(1); // resetar página ao buscar
    }, 300);
  }, []);

  const { data: launches = [], error, isLoading } = useQuery<Launch[]>({
    queryKey: ["launches"],
    queryFn: getLaunches,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const filteredLaunches = useMemo(() => {
    return launches.filter((launch) => {
      const matchesName = launch.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "success"
          ? launch.success
          : filterStatus === "fail"
          ? !launch.success
          : true;
      const matchesFavorites = filterStatus !== "favorites" || isFavorite(launch.id);
      return matchesName && matchesStatus && matchesFavorites;
    });
  }, [launches, searchTerm, filterStatus, isFavorite]);

  const totalPages = Math.max(1, Math.ceil(filteredLaunches.length / itemsPerPage));

  const paginatedLaunches = useMemo(() => {
    return filteredLaunches.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredLaunches, currentPage]);

  return {
    paginatedLaunches,
    searchTerm,
    setSearchTerm: debouncedSetSearchTerm,
    filterStatus,
    setFilterStatus,
    currentPage,
    setCurrentPage,
    totalPages,
    error: error ? "Erro ao carregar lançamentos." : "",
    isLoading,
  };
}
