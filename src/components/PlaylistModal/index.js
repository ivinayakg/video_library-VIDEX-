import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "../../utils/useOutsideClick";
import classes from "./PlaylistModal.module.css";
import { createPortal } from "react-dom";
import { GetData } from "../../API";
import { useGlobalContext } from "../../context/GlobalContext";
import { AddPlaylist, AddVideoPlaylist } from "../../reducers/PlaylistReducer";

const PlaylistModal = ({ btnClass, video }) => {
  const {
    state: { playlist, watchLater },
    dispatch,
  } = useGlobalContext();
  const [show, setShow] = useState();
  const currentChild = useRef();

  useOutsideClick(
    currentChild,
    () => {
      setShow(false);
    },
    ["click"],
    "playlistModalToggle"
  );

  const inWatchLater = watchLater.find((entry) => entry._id === video._id);

  const watchLaterButtonHanlder = () => {
    if (inWatchLater) {
      dispatch({ for: "WATCHLATER", type: "REMOVE", payload: video });
    } else dispatch({ for: "WATCHLATER", type: "ADD", payload: video });
  };

  const createPlaylistHandler = (name) => {
    AddPlaylist(name, dispatch, playlist);
  };

  const AddVideoToPlaylist = (playlistId) => {
    AddVideoPlaylist(video, dispatch, playlist, playlistId);
  };

  return (
    <>
      <button
        className={btnClass}
        onClick={() => setShow((prev) => !prev)}
        id="playlistModalToggle"
      >
        <i className="fas fa-plus" title="add to a playlist"></i> Save To
      </button>
      {show &&
        createPortal(
          <div className={classes.background}>
            <div ref={currentChild} className={classes.main}>
              <h2>Playlist</h2>
              <hr />
              <CheckBoxButton
                show={inWatchLater}
                msg={"Add To WatchLater"}
                onClick={watchLaterButtonHanlder}
              />
              {playlist.map((entry) => {
                return (
                  <CheckBoxButton
                    key={entry._id}
                    show={entry.videos.find((item) => item._id === video._id)}
                    msg={entry.name}
                    onClick={() => AddVideoToPlaylist(entry._id)}
                  />
                );
              })}
              <CreatePlaylistForm
                createPlaylistHandler={createPlaylistHandler}
              />
            </div>
          </div>,
          document.querySelector("#root")
        )}
    </>
  );
};

const CheckBoxButton = ({ show, msg, onClick }) => {
  return (
    <button className={classes.checkBox} onClick={onClick}>
      <i className={`fas fas fa-check ${show && classes.active}`}></i>
      <h3>{msg}</h3>
    </button>
  );
};
const CreatePlaylistForm = ({ createPlaylistHandler }) => {
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPlaylistHandler(input);
        setInput("");
      }}
      className={classes.playlistCreator}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <i className="fas fa-plus-circle"></i>
      </button>
    </form>
  );
};

export default PlaylistModal;
