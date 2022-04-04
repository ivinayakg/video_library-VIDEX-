import { DeleteData, PostData } from "../API";
import { notificationHandler } from "../components/Notification";

export const WatchLaterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      let findPayloadInState = state.find((entry) => entry._id === payload._id);
      if (findPayloadInState) {
        return state;
      }
      AddToWatchLater(payload);
      notificationHandler({
        type: "success",
        content: "Added In Watch Later",
      });
      return [...state, payload];
    case "REMOVE":
      RemoveFromWatchLater(payload);
      return state.filter((entry) => entry._id !== payload._id);
    default:
      return state;
  }
};

const AddToWatchLater = async (video) => {
  try {
    const res = await PostData("/user/watchlater", { video });
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};

const RemoveFromWatchLater = async (video) => {
  try {
    const res = await DeleteData(`/user/watchlater/${video._id}`);
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};
