import { VideoCard } from "../components";
import { useGlobalContext } from "../context/GlobalContext";

const LikedVideos = () => {
  const {
    state: { likedVideos },
  } = useGlobalContext();

  return (
    <div className="section likedPage">
      <div className="container">
        <h3 className="primary">Your Liked Videos</h3>
        <div className="likedVideosContainer">
          {likedVideos.map((entry) => {
            return <VideoCard data={entry} key={entry._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LikedVideos;
