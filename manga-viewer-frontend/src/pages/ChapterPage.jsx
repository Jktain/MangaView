import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ChapterPage = () => {
  const { mangaId, chapterNumber } = useParams();
  const [chapter, setChapter] = useState(null);
  const navButtonStyle = {
    background: "#222",
    color: "white",
    border: "none",
    padding: "8px 14px",
    fontSize: "14px",
    borderRadius: "6px",
    cursor: "pointer"
  };
  
  useEffect(() => {
    axiosInstance
      .get(`/chapters/${mangaId}/number/${chapterNumber}`)
      .then((res) => setChapter(res.data))
      .catch((err) => console.error("Помилка завантаження глави", err));
  }, [mangaId, chapterNumber]);

  if (!chapter) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", textAlign: "center",  justifyContent: "center"}}>
      <h2>
        Глава {chapter.chapterNumber} — {chapter.title || "Без назви"}
      </h2>
      <div>
        <img
          src={chapter.imageUrl}
          alt={`Глава ${chapter.chapterNumber}`}
          style={{ width: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#111",
          padding: "10px 0",
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid #333",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.3)",
          zIndex: 1000
        }}>
          <div style={{ display: "flex", gap: "20px" }}>
            {chapter.chapterNumber > 1 && (
              <Link
                to={`/manga/${chapter.mangaId}/chapter/${chapter.chapterNumber - 1}`}
                style={navButtonStyle}
              >
                ← Попередня
              </Link>
            )}

            <Link
              to={`/manga/${chapter.mangaId}`}
              style={navButtonStyle}
            >
              Назад до тайтлу
            </Link>

            {chapter.nextChapterId && (
              <Link
                to={`/manga/${chapter.mangaId}/chapter/${chapter.chapterNumber + 1}`}
                style={navButtonStyle}
              >
                Наступна →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
