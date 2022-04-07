import { VideoCard } from "../components";
import { useGlobalContext } from "../context/GlobalContext";

const History = () => {
  const {
    state: { history },
  } = useGlobalContext();

  return (
    <div className="section historyPage">
      <div className="container">
        <h3 className="primary">Your History</h3>
        <div className="historyVideosContainer">
          {history.map((entry) => {
            return (
              <VideoCard data={entry} key={entry._id} type={"horizontal"} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
