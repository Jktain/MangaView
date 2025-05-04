import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import MangaCard from "../components/MangaCard";

const HomePage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    axios.get("/manga")
      .then(res => setMangaList(res.data))
      .catch(() => console.error("Помилка завантаження манги"));

    axios.get("/Genres/genres")
      .then(res => setGenres(res.data))
      .catch(() => console.error("Помилка завантаження жанрів"));
  }, []);

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filtered = mangaList.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedGenres.length === 0 || selectedGenres.every(g => m.genres.includes(g)))
  );

  return (
    <div style={{ padding: "40px" }}>
      <input
        type="text"
        placeholder="Пошук за назвою..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto 30px auto",
          display: "block",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #444",
          background: "#111",
          color: "white"
        }}
      />

      <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
        {/* Каталог манги */}
        <div style={{ flex: 1, maxWidth: "1000px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "24px"
            }}
          >
            {filtered.map(manga => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </div>

        {/* Фільтр */}
        <div style={{
          width: "220px",
          padding: "15px",
          border: "1px solid #444",
          borderRadius: "8px",
          background: "#1a1a1a",
          height: "fit-content"
        }}>
          <h3 style={{ marginBottom: "10px" }}>Фільтр за жанрами</h3>
          {genres.map(genre => (
            <label key={genre.id} style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.name)}
                onChange={() => handleGenreToggle(genre.name)}
                style={{ marginRight: "8px" }}
              />
              {genre.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
