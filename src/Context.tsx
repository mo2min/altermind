import React, { useReducer } from "react";
import { TreeNote } from "./utils/types/notes";

const ACTION_TYPES = {
  CHANGE_NOTEBOOK: "CHANGE_NOTEBOOK",
  SET_SIDE_NOTES: "SET_SIDE_NOTES",
  LOGOUT: "LOGOUT",
};

const initialState = {
  notebook: {},
  sidenotes: [],
  setSidenotes: (notes: TreeNote[]) => {},
};

const AppCtxt = React.createContext({ ...initialState });

function appReducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_NOTEBOOK:
      let notebook = {
        name: action.payload.name,
        id: action.payload.id,
      };
      return {
        ...state,
        notebook,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case ACTION_TYPES.SET_SIDE_NOTES:
      let { payload: sidenotes } = action;
      return {
        ...state,
        sidenotes,
      };
    default:
      return state;
  }
}

function CtxtProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });

  function setNotebook(notebook: any) {
    dispatch({ payload: notebook, type: ACTION_TYPES.CHANGE_NOTEBOOK });
  }

  function setSidenotes(sidenotes: TreeNote[]) {
    dispatch({ payload: sidenotes, type: ACTION_TYPES.SET_SIDE_NOTES });
    console.log();
  }

  return (
    <AppCtxt.Provider
      value={{
        notebook: state.notebook,
        sidenotes: state.sidenotes,
        setNotebook,
        setSidenotes,
      }}
      {...props}
    />
  );
}

export { AppCtxt, CtxtProvider };
