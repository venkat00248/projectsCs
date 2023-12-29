import { ActionTypes } from "../constants/action-types";

const intialState = {
  flag: false,
};

export const convasFlag = (state = intialState, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_CANVAS_FLAG:
      return { ...state, flag: payload };
    default:
      return state;
  }
};

