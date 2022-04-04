import { PostData } from "../API";

export const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_INT":
      return payload;
    case "UPDATE":
      return {
        isAuth: localStorage.getItem("isAuth") && true,
        token: localStorage.getItem("token"),
        data: JSON.parse(localStorage.getItem("userData")),
      };
    default:
      return state;
  }
};

//this function does a very interesting thing
//it is called from the useffect of the global context and check wether the token in the localStorage is
//valid or not, if not then delete it
export const checkToken = async () => {
  try {
    const res = await PostData("/auth/check", {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    if (res.statusText === "OK") {
      return {
        isAuth: true,
        token: localStorage.getItem("token"),
        data: JSON.parse(localStorage.getItem("userData")) ?? {},
      };
    } else {
      localStorage.removeItem("token");
      return {
        isAuth: false,
        token: "",
        data: {},
      };
    }
  } catch (error) {
    console.error(error);
    return {
      isAuth: false,
      token: "",
      data: {},
    };
  }
};
