import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import RatingModal from "../components/RatingModal";
import { jwtDecode } from "jwt-decode";
import AuthModal from "../components/AuthModal";
import { AuthContext } from "../context/AuthContext";

const refreshManga = async (id, value, usId) => {
  try {
    await axiosInstance.post(`/ratings`, {
      userId: usId,
      mangaId: parseInt(id),
      score: value,
    });
    const res = await axiosInstance.get(`/manga/${id}`);
  } catch (err) {
    console.error("Помилка оцінювання:", err);
  }
};

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if(token){
    const decoded = jwtDecode(token);
    return Number(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
  } 
  else return null;
}

const MangaPage = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("chapters");
  const [commentText, setCommentText] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [similarManga, setSimilarManga] = useState([]);
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  useEffect(() => {
    axiosInstance.get(`/manga/${id}`).then((res) => setManga(res.data));
    axiosInstance.get(`/manga/${id}/chapters`).then((res) => setChapters(res.data));
    axiosInstance.get(`/manga/${id}/comments`).then((res) => setComments(res.data));
    axiosInstance.get(`/manga/${id}/rating`).then((res) => setAverageRating(res.data));
    axiosInstance.get(`/manga/${id}/similar`).then(res => setSimilarManga(res.data));
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
      <div style={{ width: "350px"}}>
        <img
          src={manga.coverUrl || "https://via.placeholder.com/200x300"}
          alt={manga.title}
          style={{ width: "300px", height: "500px", objectFit: "cover" }}
        />
        <button
          onClick={() => {
            if (!isAuthenticated) setShowAuthModal(true);
            else navigate(`/manga/${id}/add-chapter`);
          }}
          style={{ marginTop: "20px", width: "300px", padding: "10px" }}
        >
          ➕ Додати главу
        </button>
        <button
          onClick={() => {
            if (!isAuthenticated) setShowAuthModal(true);
            else setShowRatingModal(true)
          }}
          style={{ width: "300px", padding: "8px 12px", marginTop: "10px" }}
        >
          {averageRating.averageRating.toFixed(1) || "Оцінити"}⭐
        </button>
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
            {similarManga.length > 0 && (
              <div style={{ marginTop: "40px" }}>
                <h2>Схоже за жанрами</h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "20px",
                  marginTop: "20px"
                }}>
                  {similarManga.map(similar => (
                    <Link to={`/manga/${similar.id}`} key={similar.id} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ background: "#222", borderRadius: "8px", padding: "10px" }}>
                        <img
                          src={similar.coverUrl || "/no-cover.jpg"}
                          alt={similar.title}
                          style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "6px" }}
                        />
                        <div style={{ marginTop: "8px", fontWeight: "bold", fontSize: "14px" }}>
                          {similar.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
            <button onClick={() => {
              if (!isAuthenticated) setShowAuthModal(true);
              handleAddComment
              }}
            >Надіслати</button>
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
      

      {showRatingModal && (
        <RatingModal
          onClose={() => setShowRatingModal(false)}
          onRatingSubmitted={refreshManga}
          mangaId={id}
          userId={userId}
        />
      )}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default MangaPage;