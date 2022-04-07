import { DeleteData, PostData } from "../API";
import { notificationHandler } from "../components/Notification";

export const LikeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      let findPayloadInState = state.find((entry) => entry._id === payload._id);
      if (findPayloadInState) {
        return state;
      }
      AddToLike(payload);
      notificationHandler({
        type: "success",
        content: "Added In Your Liked Videos",
      });
      return [...state, payload];
    case "REMOVE":
      RemoveFromLike(payload);
      return state.filter((entry) => entry._id !== payload._id);
    default:
      return state;
  }
};

const AddToLike = async (video) => {
  try {
    const res = await PostData("/user/likes", { video });
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};

const RemoveFromLike = async (video) => {
  try {
    const res = await DeleteData(`/user/likes/${video._id}`);
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};
