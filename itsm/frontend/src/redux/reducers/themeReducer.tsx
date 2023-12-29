import { ActionTypes } from "../constants/action-types";

const intialState = {
  theme:false,
};

export const themeReducer = (state = intialState, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_THEME:
      return { ...state, theme: payload };
    default:
      return state;
  }
};

