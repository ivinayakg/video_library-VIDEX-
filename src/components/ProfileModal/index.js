import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "../../utils/useOutsideClick";
import classes from "./ProfileModal.module.css";
import { createPortal } from "react-dom";

const ProfileModal = () => {
  const [show, setShow] = useState();
  const navigate = useNavigate();
  const currentChild = useRef();

  const whenClickOutside = () => {
    setShow(false);
  };

  useOutsideClick(
    currentChild,
    whenClickOutside,
    ["click"],
    "loginModalToggle"
  );

  const logoutHandler = () => {
    localStorage.clear();
    navigate(0);
    setShow(false);
  };

  const historyClickHandler = () => {
    navigate("/user/history");
    setShow(false);
  };
  const LikedClickHanlder = () => {
    navigate("/user/likedVideos");
    setShow(false);
  };
  const PlaylistClickHanlder = () => {
    navigate("/user/playlists");
    setShow(false);
  };

  return (
    <>
      <button
        className={classes.profile}
        onClick={() => setShow((prev) => !prev)}
        id="loginModalToggle"
      >
        <i className="fas fa-user-circle"></i>
      </button>
      {createPortal(
        <div
          ref={currentChild}
          className={
            classes.main +
            " " +
            (show === true && classes.main_active) +
            " " +
            (show === false && classes.main_unactive)
          }
        >
          <button className={classes.btn} onClick={logoutHandler}>
            <i className="fas fa-sign-out-alt"></i>
            <h3>Logout</h3>
          </button>
          <button className={classes.btn} onClick={LikedClickHanlder}>
            <i className="fas fa-thumbs-up"></i>
            <h3>Liked Videos</h3>
          </button>
          <button className={classes.btn} onClick={PlaylistClickHanlder}>
            <i className="fas fa-photo-video"></i>
            <h3>Playlist Videos</h3>
          </button>
          <button className={classes.btn} onClick={historyClickHandler}>
            <i className="fas fa-history"></i>
            <h3>History Videos</h3>
          </button>
        </div>,
        document.querySelector("#root")
      )}
    </>
  );
};

export default ProfileModal;
