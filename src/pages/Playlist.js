import { PlaylistCard } from "../components";
import { useGlobalContext } from "../context/GlobalContext";

const Playlists = () => {
  const {
    state: { playlist, watchLater },
  } = useGlobalContext();

  return (
    <div className="section playlistPage">
      <div className="container">
        <h3 className="primary">Your Playlists</h3>
        <div className="playlistsContainer">
          {watchLater.length > 0 && (
            <PlaylistCard
              key={"watchLater"}
              playlist={{
                _id: "watchLater",
                videos: watchLater,
                name: "Watch Later",
              }}
            />
          )}
          {playlist.map((entry) => {
            return (
              entry.videos.length > 0 && (
                <PlaylistCard playlist={entry} key={entry._id} />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
