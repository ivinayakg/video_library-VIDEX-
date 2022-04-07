import { useEffect, useState, useRef } from "react";
import { useWindowEvents } from "../../utils";
import classes from "./CarouselRow.module.css";

const CarouselRow = ({ Component, dataArray, step }) => {
  const [index, setIndex] = useState(0);
  const [showButtons, setShowButtons] = useState({
    left: false,
    right: false,
    verified: false,
  });
  const row = useRef();

  const resizeHandler = (e) => {
    if (row.current.offsetWidth < window.screen.width) {
      setShowButtons({ left: true, right: true, verified: true });
    } else {
      setShowButtons({ left: false, right: false, verified: true });
    }
  };

  useWindowEvents(resizeHandler, "resize");

  const rightClick = () => {
    if (!showButtons.verified) {
      resizeHandler();
    } else {
      let length = row.current.offsetWidth;
      let client = row.current.getBoundingClientRect();
      if (client.x > -(length / 3)) setIndex((prev) => prev + 1);
      else setIndex(0);
    }
  };
  const leftClick = () => {
    if (!showButtons.verified) {
      resizeHandler();
    } else {
      let length = row.current.offsetWidth;
      let client = row.current.getBoundingClientRect();
      if (client.x < length / 2) setIndex((prev) => prev - 1);
      else setIndex(0);
    }
  };

  return (
    <div className={classes.main}>
      <button
        className={classes.left}
        onClick={leftClick}
        disabled={showButtons.left}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <div
        className={classes.row}
        id="hellnow"
        ref={row}
        style={{ transform: `translate3d(-${index * step}%, 0, 0)` }}
      >
        {dataArray.map((entry) => {
          return (
            <Component
              key={entry._id}
              data={entry}
              CSSclassName={classes.component}
            />
          );
        })}
      </div>
      <button
        className={classes.right}
        disabled={showButtons.right}
        onClick={rightClick}
      >
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default CarouselRow;
