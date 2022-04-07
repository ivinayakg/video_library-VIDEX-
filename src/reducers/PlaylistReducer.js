import { DeleteData, GetData, PostData } from "../API";
import { notificationHandler } from "../components/Notification";

export const PlaylistReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE":
      return payload;
    default:
      return state;
  }
};

export const AddPlaylist = async (name, dispatch, state) => {
  const PlaylistInState = state.find(
    (entry) => entry.name === name && !entry.name.includes("watch later")
  );
  if (!PlaylistInState) {
    try {
      const res = await PostData("user/playlists", {
        playlist: { name },
      });
      dispatch({ for: "PLAYLIST", type: "UPDATE", payload: res.playlists });
      notificationHandler({
        type: "success",
        content: "Playlist Successfully Created",
      });
    } catch (error) {
      notificationHandler({
        type: "warning",
        content: "Server Is Not Responding",
      });
      console.error(error);
    }
  } else
    notificationHandler({ type: "alert", content: "PLaylist Already Exist" });
};
export const RemovePlaylist = async (playlistId, dispatch) => {
  try {
    const res = await DeleteData(`user/playlists/${playlistId}`);
    dispatch({ for: "PLAYLIST", type: "UPDATE", payload: res.playlists });
    notificationHandler({
      type: "success",
      content: "Playlist Successfully Deleted",
    });
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};

export const GetInitialPlaylists = async (dispatch) => {
  try {
    const res = await GetData(`user/playlists`);
    dispatch({ for: "PLAYLIST", type: "UPDATE", payload: res.playlists });
  } catch (error) {
    console.error(error);
  }
};

export const RemoveVideoPlaylist = async (dispatch, playlistId, videoId) => {
  try {
    const res = await DeleteData(`user/playlists/${playlistId}/${videoId}`);
    dispatch({ for: "PLAYLIST", type: "UPDATE", payload: res.playlists });
  } catch (error) {
    notificationHandler({
      type: "warning",
      content: "Server Is Not Responding",
    });
    console.error(error);
  }
};

export const AddVideoPlaylist = async (video, dispatch, state, playlistId) => {
  const Playlist = state.find((entry) => entry._id === playlistId);
  const videoInPlaylist = Playlist.videos.find(
    (entry) => entry._id === video._id
  );
  if (!videoInPlaylist) {
    try {
      const res = await PostData(`user/playlists/${playlistId}`, { video });
      dispatch({ for: "PLAYLIST", type: "UPDATE", payload: res.playlists });
      notificationHandler({
        type: "success",
        content: "Video Successfully Added",
      });
    } catch (error) {
      notificationHandler({
        type: "warning",
        content: "Server Is Not Responding",
      });
      console.error(error);
    }
  } else RemoveVideoPlaylist(dispatch, playlistId, video._id);
};
