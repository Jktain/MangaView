import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axiosInstance";

const AddChapterPage = () => {
  const { id } = useParams(); // id манги
  const [chapterNumber, setChapterNumber] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/chapters", {
        mangaId: parseInt(id),
        chapterNumber: parseFloat(chapterNumber),
        title,
        imageUrl,
      });
      navigate(`/manga/${id}`);
    } catch (err) {
      console.error("Помилка при додаванні глави:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", color: "white", textAlign:"center" }}>
      <h2>Додати главу</h2>
      <form onSubmit={handleSubmit}>

        <label>Номер глави:</label>
        <input
          type="number"
          step="0.1"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
          required
          style={inputStyle}
        />

        <label>Назва глави:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <label>URL зображення:</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={{ marginTop: "20px" }}>Додати главу</button>
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

export default AddChapterPage;
