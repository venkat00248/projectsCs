import { ActionTypes } from "../constants/action-types";

const intialState = {
  flag: true,
};

export const setIsLoading = (state = intialState, { type, payload }: any) => {
  console.log(type, payload)
  switch (type) {
    case ActionTypes.SET_IS_LOADING:
      return { ...state, flag: payload };
    default:
      return state;
  }
};
