import { useRef } from "react";

const Modal = ({ modalClass, children, setShow }) => {
  const currentChild = useRef();
  const clickHandler = (e) => {
    let pointoncontainer = PointerOnContainer(
      currentChild.current.getBoundingClientRect(),
      e
    );

    console.log(pointoncontainer);
    if (!pointoncontainer) setShow(false);
  };

  return (
    <>
      <div
        className={`modal ${modalClass ? modalClass : ""}`}
        onFocus={clickHandler}
      >
        <div ref={currentChild} style={{ height: "100vh" }}>
          {children}
        </div>
      </div>
    </>
  );
};

const PointerOnContainer = (client, event) => {
  if (client.left > event.clientX || client.right < event.clientX) {
    return false;
  } else if (client.top > event.clientY || client.bottom < event.clientY) {
    return false;
  } else return true;
};

export default Modal;
