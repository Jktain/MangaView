import { useState } from "react";

const RatingModal = ({ onClose, onRatingSubmitted, mangaId, userId }) => {
  const [selected, setSelected] = useState();

  const handleClick = (value) => {
    setSelected(value);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <strong>Оцінка тайтла</strong>
          <button onClick={onClose} style={closeStyle}>×</button>
        </div>

        <div style={{ textAlign: "center", fontSize: "24px", margin: "10px 0" }}>
          ⭐ {selected || "?"}
        </div>

        <div style={starsContainer}>
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              style={i < selected ? starSelected : star}
              onClick={() => handleClick(i + 1)}
            >
              ★
            </span>
          ))}
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={button}>Скасувати</button>
          <button onClick={() => {onRatingSubmitted(mangaId, selected, userId); onClose()}} style={buttonPrimary}>Підтвердити</button>
        </div>
      </div>
    </div>
  );
};

// --- Styles
const overlayStyle = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
  alignItems: "center", justifyContent: "center", zIndex: 999,
};

const modalStyle = {
  background: "#1e1e1e", padding: "20px", borderRadius: "8px",
  minWidth: "300px", color: "#fff",
};

const headerStyle = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  borderBottom: "1px solid #333", paddingBottom: "8px",
};

const closeStyle = {
  background: "transparent", border: "none", color: "#fff", fontSize: "20px", cursor: "pointer"
};

const starsContainer = {
  display: "flex", justifyContent: "center", gap: "6px", fontSize: "28px", cursor: "pointer"
};

const star = { color: "#555" };
const starSelected = { color: "#ffca28" };

const button = {
  padding: "8px 12px", borderRadius: "6px", border: "none", background: "#333", color: "#fff", cursor: "pointer"
};

const buttonPrimary = { ...button, background: "#4caf50" };

export default RatingModal;
