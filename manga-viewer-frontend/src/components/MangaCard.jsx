import { Link } from "react-router-dom";

const MangaCard = ({ manga }) => {
  return (
    <Link to={`/manga/${manga.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ background: "#222", borderRadius: "10px", padding: "10px" }}>
        <img
          src={manga.coverUrl || "/no-cover.jpg"}
          alt={manga.title}
          style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }}
        />
        <div style={{ marginTop: "10px", fontWeight: "bold", fontSize: "16px", textAlign: "center" }}>
          {manga.title.length > 35 ? manga.title.slice(0, 35) + "..." : manga.title}
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;