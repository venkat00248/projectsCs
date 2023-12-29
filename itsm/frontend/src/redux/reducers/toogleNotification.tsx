import { ActionTypes } from "../constants/action-types";

const intialState = {
  flag: true,
};

export const toogleNotification = (state = intialState, { type, payload } : any) => {
   
  switch (type) {
    case ActionTypes.SET_TOOGLE_NOTIFICATION:
      return { ...state, flag: payload.flag };
    default:
      return state;
  }
};
