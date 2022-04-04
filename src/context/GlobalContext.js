import { useReducer, useEffect, useContext, createContext } from "react";
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, {
    playlist: [],
    likedVideos: [],
    history: [],
    user: {
      isAuth: false,
      token: "",
      data: {},
    },
    watchLater: [],
  });

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const GlobalReducer = (state, action) => {
  const { type, payload } = action;
  switch (action.for) {
    default:
      return state;
  }
};

export const useGlobalContext = () => useContext(GlobalContext);
