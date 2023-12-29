import { ActionTypes } from "../constants/action-types";

const intialState = {
  tickets:[],
};
const initial = {
  name:""
}

export const ticketReducer = (state = intialState, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_TICKETS:
      return { ...state, tickets: payload };
    default:
      return state;
  }
};

export const workFlowReducer = (state = initial, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_WORKFLOW_NAME:
      return { ...state, name: payload };
    default:
      return state;
  }
};

