import { useReducer, useEffect, useContext, createContext } from "react";
import { HistoryReducer } from "../reducers/HistoryReducer";
import { LikeReducer } from "../reducers/LikeReducer";
import {
  GetInitialPlaylists,
  PlaylistReducer,
} from "../reducers/PlaylistReducer";
import { checkToken, UserReducer } from "../reducers/UserReducer";
import { WatchLaterReducer } from "../reducers/WatchLaterReducer";

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
    GetInitialPlaylists(dispatch);
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
    case "LIKE":
      return {
        ...state,
        likedVideos: LikeReducer(state.likedVideos, { type, payload }),
      };
    case "USER":
      return { ...state, user: UserReducer(state.user, { type, payload }) };
    case "HISTORY":
      return {
        ...state,
        history: HistoryReducer(state.history, { type, payload }),
      };
    case "WATCHLATER":
      return {
        ...state,
        watchLater: WatchLaterReducer(state.watchLater, {
          type,
          payload,
        }),
      };
    case "PLAYLIST":
      return {
        ...state,
        playlist: PlaylistReducer(state.playlist, { type, payload }),
      };
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
