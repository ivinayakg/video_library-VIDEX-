import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useState, useEffect } from "react";
import { SingleVideoComponent, VideoCard } from "../components";

const SinglePLaylist = () => {
  const { playlistId } = useParams();
  const {
    state: { playlist, watchLater },
  } = useGlobalContext();
  const navigate = useNavigate();

  const renderedPlaylist =
    playlistId === "watchLater"
      ? watchLater
      : playlist.find((entry) => entry._id === playlistId)?.videos;
  const renderedPlaylistName =
    playlistId === "watchLater"
      ? "Watch Later"
      : playlist.find((entry) => entry._id === playlistId)?.name;

  const [currentVideo, setCurrentVideo] = useState(renderedPlaylist[0]);

  useEffect(() => {
    if (renderedPlaylist.length <= 0 || !currentVideo) {
      navigate(-1);
    }
  }, []);

  return (
    <div className="section singleVideo">
      <div className="container">
        <SingleVideoComponent data={currentVideo} />
        <div className="videoContainer--recommend">
          <h3 className="primary" style={{ textTransform: "capitalize" }}>
            {renderedPlaylistName}
          </h3>
          {renderedPlaylist.map((entry) => {
            return (
              <VideoCard
                data={entry}
                key={entry._id}
                navigateToPage={() => setCurrentVideo(entry)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SinglePLaylist;
