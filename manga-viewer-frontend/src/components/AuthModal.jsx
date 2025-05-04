const AuthModal = ({ onClose }) => {
    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <p>Щоб виконати цю дію, потрібно авторизуватись.</p>
          <button onClick={onClose} style={buttonStyle}>OK</button>
        </div>
      </div>
    );
  };
  
  const overlayStyle = {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 999,
  };
  
  const modalStyle = {
    background: "#1e1e1e", padding: "20px", borderRadius: "8px",
    color: "#fff", textAlign: "center", minWidth: "300px"
  };
  
  const buttonStyle = {
    marginTop: "15px", padding: "8px 12px", background: "#444",
    border: "none", borderRadius: "5px", color: "#fff", cursor: "pointer"
  };
  
  export default AuthModal;
  