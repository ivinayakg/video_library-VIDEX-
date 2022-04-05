import { useEffect } from "react";

const useWindowEvents = (listenerFunction, event, callIt) => {
  useEffect(() => {
    window.addEventListener(event, listenerFunction);
    if (callIt) listenerFunction();

    return () => {
      window.removeEventListener(event, listenerFunction);
    };
  }, []);
};

export default useWindowEvents;
