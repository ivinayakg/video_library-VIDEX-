import { useReducer, useEffect, useContext, createContext } from "react";
import { checkToken } from "../reducers/UserReducer";
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

  useEffect(() => {
    (async () => {
      try {
        let res = await checkToken();
        dispatch({ for: "USER", type: "UPDATE_INT", payload: res });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const GlobalReducer = (state, action) => {
  const { type, payload } = action;
  switch (action.for) {
    case "USER":
      return { ...state, user: UserReducer(state.user, { type, payload }) };
    case "RESET":
      localStorage.clear();
      return {
        playlist: [],
        likedVideos: [],
        history: [],
        user: {
          isAuth: false,
          token: "",
          data: {},
        },
      };
    default:
      return state;
  }
};

export const useGlobalContext = () => useContext(GlobalContext);
