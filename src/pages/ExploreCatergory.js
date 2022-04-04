import { useEffect, useState } from "react";
import { GetData } from "../API";
import { CarouselRow, VideoCard } from "../components";

const ExploreByCatergory = () => {
  const [catergories, setCatergories] = useState([{ catergoryName: "movies" }]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    GetData("/categories").then((res) => setCatergories(res.categories));
    GetData("/videos").then((res) => setVideos(res.videos));
  }, []);

  return (
    <div className="section catergoryPage">
      <div className="container">
        {catergories.map((entry) => {
          let catergoryVideos = videos.reduce(
            (prev, curr) =>
              entry.catergoryName === curr.catergoryName
                ? [...prev, curr]
                : prev,
            []
          );
          return (
            <div key={entry._id} className="catergoryContainer">
              <h3 className="primary">{entry.catergoryName}</h3>
              <CarouselRow
                step={12}
                Component={VideoCard}
                dataArray={catergoryVideos}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreByCatergory;
