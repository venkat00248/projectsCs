import { ActionTypes } from "../constants/action-types";

export const setTheme = (theme:any) => {
  return {
    type: ActionTypes.SET_THEME,
    payload: theme,
  };
};
export const setEntity = (entity:any) => {
  return {
    type: ActionTypes.SET_ENTITY,
    payload: entity,
  };
};
export const setTickets = (tickets:any) => {
  return {
    type: ActionTypes.SET_TICKETS,
    payload: tickets,
  };
};
export const setDateRangeAction = (epochDateRange1: any, epochDateRange2: any) => ({
  type: "SET_DATE_RANGE",
  epochDateRange1,
  epochDateRange2,
});
export const setTicketFlag = (flag:any) => {     // Flag for create ticket //
  return {
    type: ActionTypes.SET_TICKET_FLAG,
    payload: flag,
  };
};
export const setUnassignFlag = (flag:any) => {   // Flag for unassigned count //
  console.log(flag);
  return {
    type: ActionTypes.SET_UNASSIGN_FLAG,
    payload: flag,
  }
}
export const setStatusCount = (tickets:any) => {
  return {
    type: ActionTypes.SET_STATUS_COUNT,
    payload: tickets,
  };
};
export const setTileFlg = (flag:any) => {
  return {
    type: ActionTypes.SET_TILE_FLAG,
    payload: flag,
  };
};
export const setCanvasFlag = (flag:any) => {
  return {
    type: ActionTypes.SET_CANVAS_FLAG,
    payload: flag,
  };
};
export const setToogleNotification = (flag:any) => {
  return {
    type: ActionTypes.SET_CANVAS_FLAG,
    payload: flag
  }
}
export const setIsLoading = (flag:any) => {
  return {
    type: ActionTypes.SET_IS_LOADING,
    payload: flag
  }
}
export const setFallbackError = (flag:any) => {
  return {
    type: ActionTypes.SET_FALLBACK_ERRROR,
    payload: flag
  }
}