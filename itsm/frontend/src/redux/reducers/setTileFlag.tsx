import { ActionTypes } from "../constants/action-types";

const intialState = {
  flag: true,
};

export const setTileFlag = (state = intialState, { type, payload } : any) => {
  switch (type) {
    case ActionTypes.SET_TILE_FLAG:
      return { ...state, flag: payload };
    default:
      return state;
  }
};
