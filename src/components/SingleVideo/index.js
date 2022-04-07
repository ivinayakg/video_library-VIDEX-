import classes from "./SingleVideo.module.css";
import VideoPlayer from "../VideoPlayer";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import PlaylistModal from "../PlaylistModal";

const SingleVideo = ({ data }) => {
  const {
    state: { user, likedVideos },
    dispatch,
  } = useGlobalContext();

  const inLikedVideos =
    likedVideos.find((entry) => entry._id === data._id) ?? null;

  const onLikeButtonClicker = () => {
    if (inLikedVideos) {
      dispatch({ for: "LIKE", type: "REMOVE", payload: data });
    } else {
      dispatch({ for: "LIKE", type: "ADD", payload: data });
    }
  };

  useEffect(() => {
    dispatch({ for: "HISTORY", type: "ADD", payload: data });
  }, [data]);

  return (
    <div className={classes.singleVideoContainer}>
      <VideoPlayer src={`/videos/${data.src}`} />
      <div className={classes.header}>
        <div className={classes.header_heading}>
          <h2>{data.title}</h2>
          <p className="text-fade">
            <i className="fas fa-eye"></i> {data.views ?? 0} Views
          </p>
        </div>
        {user.isAuth && (
          <div className={classes.header_actions}>
            <button
              className={
                classes.likeBtn + " " + (inLikedVideos && classes.active)
              }
              onClick={onLikeButtonClicker}
            >
              <i className="fas fa-thumbs-up" title="like"></i>
            </button>
            <PlaylistModal btnClass={classes.playlistBtn} video={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleVideo;
