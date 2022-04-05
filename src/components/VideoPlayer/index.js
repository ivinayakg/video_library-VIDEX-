import { useRef, useReducer, useEffect, useState } from "react";
import classes from "./VideoPlayer.module.css";

const PlayerStateManager = (state, action) => {
  switch (action.type) {
    case "SETTINGS":
      return { ...state, settings: !state.settings };
    case "PLAYBACK":
      return { ...state, playback: !state.playback };
    case "CONTROLLER":
      return { ...state, controller: !state.controller };
    case "PLAY":
      return { ...state, play: action.payload };
    case "RESET":
      return { ...state, controller: false, settings: false, playback: false };
    default:
      return state;
  }
};

const VideoPlayer = ({ src, autoPlayTrue }) => {
  const videoRef = useRef();
  const progressBar = useRef();
  const [progress, setProgress] = useState(0);

  const [state, dispatch] = useReducer(PlayerStateManager, {
    controller: false,
    settings: false,
    playback: false,
    play: false,
  });

  const forwardVideoBy10 = () => {
    if (videoRef.current.currentTime !== videoRef.current.duration) {
      videoRef.current.currentTime += 10;
      dispatch({ type: "PLAY", payload: true });
    }
  };
  const backwardVideoBy10 = () => {
    if (videoRef.current.currentTime !== 0) {
      videoRef.current.currentTime -= 10;
      dispatch({ type: "PLAY", payload: true });
    }
  };

  const togglePlay = () => {
    dispatch({ type: "PLAY", payload: !state.play });
  };

  const playbackRateHandler = (e) => {
    let playbackRate = Number(e.target.attributes["speed"].value);
    videoRef.current.playbackRate = playbackRate;
    dispatch({ type: "PLAYBACK" });
  };

  const timeUpdateHandler = (e) => {
    const time = e.target.currentTime;
    if (time === 0 || time === e.target.duration) {
      dispatch({ type: "PLAY", payload: false });
    }
    setProgress((e.target.currentTime / e.target.duration) * 100);
  };

  const clickToSkip = (e) => {
    const client = e.target.getBoundingClientRect();
    const progress = (e.clientX - client.x) / progressBar.current.offsetWidth;
    videoRef.current.currentTime = progress * videoRef.current.duration;
    setProgress(progress * 100);
  };

  const fullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      /* Safari */
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      /* IE11 */
      videoRef.current.msRequestFullscreen();
    }
  };

  useEffect(() => {
    if (state.play) videoRef.current.play();
    else videoRef.current.pause();
  }, [state.play]);

  return (
    <div className={classes.videoPlayer}>
      <video
        src={src}
        className={classes.video}
        ref={videoRef}
        onClick={togglePlay}
        onTimeUpdate={timeUpdateHandler}
        muted={state.play ? "" : "muted"}
      ></video>

      <div className={classes.controller}>
        <div
          className={classes.progress}
          ref={progressBar}
          onClick={clickToSkip}
        >
          <div
            className={classes.progress_filled}
            style={{
              width: `${progress}%`,
            }}
          >
            <i className="fas fa-circle"></i>
          </div>
        </div>

        <div className={classes.controller_options}>
          <button className={classes.play} onClick={togglePlay}>
            {state.play ? (
              <i className="fas fa-pause"></i>
            ) : (
              <i className="fas fa-play"></i>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            className={classes.volume}
            defaultValue={0.5}
            onChange={(e) => (videoRef.current.volume = e.target.value)}
          />

          {/* playback for the video starts here */}
          <div className={classes.playback}>
            <i
              onClick={() => dispatch({ type: "PLAYBACK" })}
              className={"fas fa-tachometer-alt" + " " + classes.playback_icon}
            ></i>
            <div
              className={
                state.playback
                  ? classes.playback_dropdown +
                    " " +
                    classes.playback_dropdownActive
                  : classes.playback_dropdown
              }
            >
              <button onClick={playbackRateHandler} speed={0.25}>
                0.25
              </button>
              <button onClick={playbackRateHandler} speed={0.5}>
                0.5
              </button>
              <button onClick={playbackRateHandler} speed={1}>
                Normal
              </button>
              <button onClick={playbackRateHandler} speed={1.25}>
                1.25
              </button>
              <button onClick={playbackRateHandler} speed={1.5}>
                1.5
              </button>
              <button onClick={playbackRateHandler} speed={2}>
                2
              </button>
            </div>
          </div>
          {/* playback for video ends here */}
          <button onClick={fullScreen} className={classes.fullScreen}>
            <i className="fas fa-expand"></i>
          </button>
          <button onClick={backwardVideoBy10} className={classes.backward}>
            <i className="fas fa-backward"></i>
          </button>
          <button onClick={forwardVideoBy10} className={classes.forward}>
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
