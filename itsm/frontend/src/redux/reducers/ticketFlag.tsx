import { ActionTypes } from "../constants/action-types";

const intialState = {
  flag: true,
};

export const ticketFlag = (state = intialState, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_TICKET_FLAG:
      return { ...state, flag: payload };
    default:
      return state;
  }
};

