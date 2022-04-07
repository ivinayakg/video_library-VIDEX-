import { useMemo, useEffect, useState } from "react";
import { BannerVideo, VideoCard } from "../components";
import { GetData } from "../API";

const Homepage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    GetData("/videos").then((res) => setVideos(res.videos));
  }, []);

  const bannerVideoData = useMemo(
    () =>
      videos.length > 1 && videos[Math.floor(Math.random() * videos.length)],
    [videos]
  );

  return (
    <>
      <BannerVideo data={bannerVideoData} />
      <div className="section home">
        <div className="container">
          <h3 className="primary">Trending Now</h3>
          <div className="videcardContainer">
            {videos.map((entry) => {
              return <VideoCard data={entry} key={entry._id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
