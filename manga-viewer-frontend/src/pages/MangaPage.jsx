import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const MangaPage = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("chapters");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axiosInstance.get(`/manga/${id}`).then((res) => setManga(res.data));
    axiosInstance.get(`/manga/${id}/chapters`).then((res) => setChapters(res.data));
    axiosInstance.get(`/manga/${id}/comments`).then((res) => setComments(res.data));
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      await axiosInstance.post("/comments", {
        mangaId: parseInt(id),
        content: commentText.trim(),
      });
      const res = await axiosInstance.get(`/manga/${id}/comments`);
      setComments(res.data);
      setCommentText("");
    } catch (err) {
      console.error("Помилка коментаря:", err);
    }
  };

  if (!manga) return <p>Завантаження...</p>;

  return (
    <div style={{ display: "flex", padding: "20px", gap: "40px" }}>
      {/* Обкладинка */}
      <div>
        <img
          src={manga.coverUrl || "https://via.placeholder.com/200x300"}
          alt={manga.title}
          style={{ width: "350px", height: "550px", objectFit: "cover" }}
        />
      </div>

      {/* Контент */}
      <div style={{ flex: 1 }}>
        <h1>{manga.title}</h1>

        {/* Таби */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
          <button onClick={() => setActiveTab("info")}>Про тайтл</button>
          <button onClick={() => setActiveTab("chapters")}>Глави</button>
          <button onClick={() => setActiveTab("comments")}>Коментарі</button>
        </div>

        {/* Вміст вкладок */}
        {activeTab === "info" && (
          <div>
            {manga.genres && (
              <p style={{ marginTop: "15px", fontStyle: "italic" }}>
                Жанри: {manga.genres.join(", ")}
              </p>
            )}
            <p style={{ whiteSpace: "pre-wrap" }}>{manga.description || "Опис відсутній."}</p>
          </div>
        )}

        {activeTab === "chapters" && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {chapters
              .sort((a, b) => b.id - a.id)
              .map((ch) => (
                <li key={ch.id} style={{ marginBottom: "10px" }}>
                  <Link to={`/manga/${manga.id}/chapter/${ch.chapterNumber}`}>
                    Глава {ch.chapterNumber} — {ch.title || "Без назви"}
                  </Link>
                </li>
              ))}
          </ul>
        )}

        {activeTab === "comments" && (
          <div>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Напишіть коментар..."
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button onClick={handleAddComment}>Надіслати</button>

            <div style={{ marginTop: "20px" }}>
              {comments.map((c) => (
                <div key={c.id} style={{ marginBottom: "15px" }}>
                  <strong>{c.username || "Користувач"}</strong>{" "}
                  <span style={{ color: "#888", fontSize: "0.9em" }}>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                  <p style={{ margin: "5px 0" }}>{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MangaPage;