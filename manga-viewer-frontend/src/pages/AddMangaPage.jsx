import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddMangaPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/Genres/genres")
      .then(res => setGenres(res.data))
      .catch(() => console.error("Не вдалося завантажити жанри"));
  }, []);

  const toggleGenre = (id) => {
    setSelectedGenres(prev =>
      prev.includes(id)
        ? prev.filter(g => g !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/manga", {
        title,
        description,
        coverUrl,
        genreIds: selectedGenres
      });
      navigate("/"); // або показати сповіщення
    } catch (err) {
      console.error("Помилка при додаванні:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", color: "white", textAlign: "center" }}>
      <h2>Додати нову мангу</h2>
      <form onSubmit={handleSubmit}>
        <label>Назва:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Опис:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <label>Посилання на обкладинку:</label>
        <input
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          style={inputStyle}
        />

        <label style={{ marginTop: "10px" }}>Жанри:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {genres.map(g => (
            <label key={g.id}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(g.id)}
                onChange={() => toggleGenre(g.id)}
              />
              {g.name}
            </label>
          ))}
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>Додати мангу</button>
      </form>
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "15px",
  padding: "10px",
  fontSize: "16px",
  background: "#111",
  border: "1px solid #555",
  borderRadius: "6px",
  color: "white"
};

export default AddMangaPage;
