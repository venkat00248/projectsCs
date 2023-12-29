import { ActionTypes } from "../constants/action-types";

const initialState = {
    epochDateRange1: null,
    epochDateRange2: null,
  };
  
  export const dateRangeReducer = (state = initialState, { type, payload } : any) => {
    switch (type) {
      case ActionTypes.SET_DATE_RANGE:
        return {
          ...state,
          epochDateRange1:payload.epochDateRange1,
          epochDateRange2:payload.epochDateRange2,
        };
      default:
        return state;
    }
  };
  

