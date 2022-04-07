import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({
  gradient,
  data,
  type,
  navigateToPage,
  extrabutton,
  CSSclass,
}) => {
  const videoRef = useRef();
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();

  const navigateToSingleVideo = () => {
    if (!navigateToPage) navigate(`/video/${data._id}`, { state: data });
    else navigateToPage();
  };

  useEffect(() => {
    videoRef.current.currentTime = 20;
  }, []);

  const changeVideoFrameOnHover = (e) => {
    if (e.type !== "mouseleave") {
      setPlay(true);
    } else {
      setPlay(false);
    }
  };

  useEffect(() => {
    if (play) videoRef.current.play();
    else videoRef.current.pause();
  }, [play]);

  return (
    <div
      className={`card ${gradient && "card--gradient"} videocard ${
        play && "videocard--hover"
      } ${type === "horizontal" ? "card--horizontal" : ""} ${CSSclass}`}
      onMouseOver={changeVideoFrameOnHover}
      onMouseLeave={changeVideoFrameOnHover}
      onClick={navigateToSingleVideo}
    >
      <div className="card_imggradient">
        <video
          about="random"
          className="card_imggradient_video"
          src={`/videos/${data.src}` ?? "/videos/music.mp4"}
          ref={videoRef}
          muted={play ? "" : "muted"}
        />
      </div>
      <header className="card_header">
        <h3>{data.title ?? "Hello World"}</h3>
        {data.para && type === "horizontal" && <h4>{data.para}</h4>}
      </header>
      <p className="text-fade">
        <i className="fas fa-eye"></i> {data.views ?? 0} Views
      </p>
      {extrabutton && extrabutton}
    </div>
  );
};

export default VideoCard;
