import { useRef, useState, useEffect } from "react";
import classes from "./BannerVideo.module.css";

const BannerVideo = ({ data }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef();

  const togglePlay = () => setPlay((prev) => !prev);

  useEffect(() => {
    if (play) videoRef.current.play();
    else videoRef.current.pause();
  }, [play]);

  return (
    <div className={classes.main}>
      <div className={classes.gradient}></div>
      <div className={classes.videoOverlay}>
        <h2>Hot Right Now!</h2>
        <button className={classes.play} onClick={togglePlay}>
          {!play ? (
            <i className="fas fa-play-circle"></i>
          ) : (
            <i className="fas fa-pause-circle"></i>
          )}
        </button>
        <div className={classes.content}>
          <h2>{data.title}</h2>
          <p className="text-fade">
            <i className="fas fa-eye"></i> {data.views ?? 0} Views
          </p>
        </div>
      </div>
      <video
        src={`/videos/${data?.src}`}
        ref={videoRef}
        className={classes.video}
        muted=""
      ></video>
    </div>
  );
};

export default BannerVideo;
