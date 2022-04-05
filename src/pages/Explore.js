import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetData } from "../API";
import { VideoCard } from "../components";

const Explore = () => {
  const [videos, setVideos] = useState([]);
  const { filterByName } = useParams();

  useEffect(() => {
    GetData("/videos").then((res) => setVideos(res.videos));
  }, []);

  let filteredData = videos.filter((entry) => {
    return filterByName !== "none" && filterByName
      ? entry.title.toLowerCase().includes(filterByName)
      : true;
  });

  return (
    <div className="section explore">
      <div className="container">
        <h3 className="primary">Explore</h3>
        <div
          className={
            "videcardContainer" +
            (filterByName ? " videocardContainer--horizontal" : "")
          }
        >
          {filteredData.map((entry) => {
            return (
              <VideoCard
                data={entry}
                key={entry._id}
                type={filterByName && "horizontal"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
