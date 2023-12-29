import { ActionTypes } from "../constants/action-types";

const intialState = {
  ticketCount: null,
};

export const ticketStatusCount = (state = intialState, { type, payload } : any) => {
   
  switch (type) {
    case ActionTypes.SET_STATUS_COUNT:
      return { ...state, ticketCount: payload };
    default:
      return state;
  }
};

