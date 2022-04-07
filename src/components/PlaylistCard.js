import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { RemovePlaylist } from "../reducers/PlaylistReducer";
import classes from "./css/PlaylistCard.module.css";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  return (
    <div className={classes.playlistCard}>
      <div className={classes.playlistCard_back}></div>
      <video
        src={`/videos/${playlist.videos[0].src}`}
        className={classes.playlistCard_video}
        muted="muted"
        onClick={() => navigate(`/user/playlist/${playlist._id}`)}
      ></video>
      <i
        className={`fas fa-play ${classes.playlistCard_button}`}
        onClick={() => navigate(`/user/playlist/${playlist._id}`)}
      ></i>
      <h3>{playlist.name}</h3>
      {playlist._id !== "watchLater" && (
        <button
          className={"btn " + classes.btn}
          onClick={() => RemovePlaylist(playlist._id, dispatch)}
        >
          Delete Playlist
        </button>
      )}
    </div>
  );
};

export default PlaylistCard;
