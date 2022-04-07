import { useEffect } from "react";

export const useOutsideClick = (reference, eventHandler, events, avoidElId) => {
  useEffect(() => {
    let toggler = document.querySelector(`#${avoidElId}`);
    events.forEach((event) => {
      window.addEventListener(event, (e) => {
        if (
          reference.current &&
          !reference.current.contains(e.target) &&
          !toggler.contains(e.target)
        ) {
          eventHandler();
        }
      });
    });

    return () => {
      let toggler = null;
      events.forEach((event) => {
        window.removeEventListener(event, (e) => {
          if (reference.current && reference.current.contains(e.target)) {
            eventHandler();
          }
        });
      });
    };
  }, []);
};
