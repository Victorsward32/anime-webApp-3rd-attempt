import React, { useEffect, useState } from "react";
import AnimeCards from "../../components/cards/animeCard/AnimeCards";
import "../../scss/layouts/animeCardsLayouts.scss";
import Pagination from "../../components/pagination/Pagination";

const AnimeCardsLayout = () => {
  const [page, setPage] = useState(1);
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // 🔹 New states for filters
  const [type, setType] = useState(""); // e.g., tv, movie, ova
  const [filter, setFilter] = useState(""); // e.g., airing, upcoming, popularity, favorites

  useEffect(() => {
    handleAPICall();
  }, [page, type, filter]);

  const handleAPICall = async () => {
    try {
      setIsLoading(true);
      setError(false);

      // 🔹 Construct query params based on filter & type
      let url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
      if (type) url += `&type=${type}`;
      if (filter) url += `&filter=${filter}`;

      const res = await fetch(url);
      const result = await res.json();
      setAnimeData(result?.data || []);
    } catch (error) {
      setError(true);
      console.error("Something went wrong while fetching data: - ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-component="anime-card-layout">
      {/* 🔹 Filters */}
      <div className="filter-bar">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Type</option>
          <option value="tv">TV</option>
          <option value="movie">Movie</option>
          <option value="ova">OVA</option>
          <option value="special">Special</option>
          <option value="ona">ONA</option>
          <option value="music">Music</option>
        </select>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Filter</option>
          <option value="airing">Airing</option>
          <option value="upcoming">Upcoming</option>
          <option value="bypopularity">Popularity</option>
          <option value="favorite">Favorites</option>
        </select>
      </div>

      <div className="anime-card-contianer">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong. Try again!</p>}
        {!isLoading &&
          !error &&
          animeData?.map((item) => (
            <AnimeCards
              key={item.mal_id}
              name={item?.title}
              images={item?.images?.jpg?.image_url}
            />
          ))}
      </div>

      {/* Hook Pagination to page */}
      <Pagination
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default AnimeCardsLayout;
