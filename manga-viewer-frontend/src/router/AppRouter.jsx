import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MangaPage from "../pages/MangaPage";
import ChapterPage from "../pages/ChapterPage";
// import AddMangaPage from "../pages/AddMangaPage";
// import AddChapterPage from "../pages/AddChapterPage";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>  
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/manga/:id" element={<MangaPage />} />
        <Route path="/manga/:mangaId/chapter/:chapterNumber" element={<ChapterPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;

{/* <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/manga/:id" element={<MangaPage />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
        <Route path="/add-manga" element={<AddMangaPage />} />
        <Route path="/manga/:id/add-chapter" element={<AddChapterPage />} /> */}