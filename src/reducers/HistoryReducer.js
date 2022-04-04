import { DeleteData, PostData } from "../API";
import { notificationHandler } from "../components/Notification";

export const HistoryReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      let findPayloadInState = state.find((entry) => entry._id === payload._id);
      if (findPayloadInState) {
        return state;
      }
      AddHistory(payload);
      return [...state, payload];
    case "REMOVE":
      RemoveHistory(payload);
      return state.filter((entry) => entry._id !== payload._id);
    default:
      return state;
  }
};

const AddHistory = async (video) => {
  try {
    const res = await PostData("/user/history", { video });
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};

const RemoveHistory = async (video) => {
  try {
    const res = await DeleteData(`/user/history/${video._id}`);
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};
