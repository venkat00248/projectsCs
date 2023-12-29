import { ActionTypes } from "../constants/action-types";

const intialState = {
  entity:"cloud4c",
};

export const entityReducer = (state = intialState, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_ENTITY:
      return { ...state, entity: payload };
    default:
      return state;
  }
};

