import { ActionTypes } from "../constants/action-types";

const intialState = {
  flag: true,
};

export const setFallbackError = (state = intialState, { type, flag } : any) => {
   
  switch (type) {
    case ActionTypes.SET_FALLBACK_ERRROR:
      return { ...state, flag: flag };
    default:
      return state;
  }
};
