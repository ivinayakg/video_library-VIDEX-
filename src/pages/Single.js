import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetData } from "../API";
import { SingleVideoComponent, VideoCard } from "../components";

const SingleVideo = () => {
  const { state } = useLocation();
  const { videoId } = useParams();
  const [data, setData] = useState(state ?? null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!state || state?._id !== videoId) {
      GetData(`/video/${videoId}`).then((data) => setData(data.video));
    } else {
      setData(state);
    }
    window.scroll(0, 0);
  }, [videoId, state]);

  useEffect(() => {
    GetData("/videos").then((res) => setVideos(res.videos));
  }, []);

  return (
    <div className="section singleVideo">
      <div className="container">
        {data && <SingleVideoComponent data={data} />}
        <div className="videoContainer--recommend">
          {videos.map((entry) => {
            return <VideoCard data={entry} key={entry._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
