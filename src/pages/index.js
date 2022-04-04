import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header, ProfileModal } from "../components";
import { useGlobalContext } from "../context/GlobalContext";
import { useTheme } from "../context/themeContext";
import Explore from "./Explore";
import Homepage from "./Homepage";
import LoginModal from "./Login";
import SingleVideo from "./Single";
import { NotificationParent } from "../components/Notification";
import { useBackButton } from "../utils";
import AuthRoute from "../utils/AuthRoute";
import History from "./History";
import LikedVideos from "./LikedVideos";
import Playlists from "./Playlist";
import SinglePLaylist from "./singlePlaylist";
import Page404 from "./404Page";
import ExploreByCatergory from "./ExploreCatergory";

const Main = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { theme, changeTheme } = useTheme();
  const { state, dispatch } = useGlobalContext();
  const backButton = useBackButton();

  const brand = (
    <h2 className="primary brand" onClick={() => navigate("/")}>
      VIDEX
    </h2>
  );

  const searchHandler = (value) => {
    navigate(`/explore/search=${value}`);
  };

  const links = [
    <Link to={"/"}>Home</Link>,
    <Link to={"/explore"}>Explore</Link>,
    <Link to={"/exploreByCatergory"}>Explore By Catergory</Link>,
    theme === "light" ? (
      <button className="header_themeToggler" onClick={changeTheme}>
        <i className="fas fa-sun"></i>
      </button>
    ) : (
      <button className="header_themeToggler" onClick={changeTheme}>
        <i className="fas fa-moon"></i>
      </button>
    ),
    !state.user.isAuth ? (
      <button className="btn" onClick={() => setShow(true)}>
        Login
      </button>
    ) : (
      <ProfileModal />
    ),
  ];
  console.log(state);

  return (
    <>
      {backButton}
      <LoginModal action={{ show, setShow }} />

      <NotificationParent timeout={2500} />
      <Header brand={brand} links={links} searchHandler={searchHandler} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<Outlet />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/search=:filterByName" element={<Explore />} />
        </Route>
        <Route path="/video/:videoId" element={<SingleVideo />} />
        <Route path="/exploreByCatergory" element={<ExploreByCatergory />} />
        <Route element={<AuthRoute />}>
          <Route path="/user/history" element={<History />} />
          <Route path="/user/likedVideos" element={<LikedVideos />} />
          <Route path="/user/playlists" element={<Playlists />} />
          <Route
            path="/user/playlist/:playlistId"
            element={<SinglePLaylist />}
          />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default Main;
