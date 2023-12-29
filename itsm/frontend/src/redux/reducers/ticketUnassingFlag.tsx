import { ActionTypes } from "../constants/action-types";

const intialState = {
  flag: false,
};

export const ticketUnassingFlag = (state = intialState, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_UNASSIGN_FLAG:
      return { ...state, flag: payload };
    default:
      return state;
  }
};
