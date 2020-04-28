import React, { useReducer } from "react";
import { TreeNote } from "./utils/types/notes";

const ACTION_TYPES = {
  CHANGE_NOTEBOOK: "CHANGE_NOTEBOOK",
  SET_SIDE_NOTES: "SET_SIDE_NOTES",
  LOGOUT: "LOGOUT",
  TOGGLE_PREIVEW: "TOGGLE_PREIVEW",
  SAVE_NOTE: "SAVE_NOTE",
};

const initialState = {
  notebook: {},
  sidenotes: [],
  setSidenotes: (notes: TreeNote[]) => {},
  preview: false,
  togglePreview: () => {},
  saveNote: () => {}, // Empty Dispatch
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
    case ACTION_TYPES.TOGGLE_PREIVEW:
      return {
        ...state,
        preview: !state.preview,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case ACTION_TYPES.SAVE_NOTE:
      // EMPTY DISPATCH
      return { ...state };
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
  }

  function togglePreview() {
    dispatch({ type: ACTION_TYPES.TOGGLE_PREIVEW });
  }

  function saveNote() {
    dispatch({ type: ACTION_TYPES.SAVE_NOTE });
  }
  return (
    <AppCtxt.Provider
      value={{
        notebook: state.notebook,
        sidenotes: state.sidenotes,
        setNotebook,
        setSidenotes,
        preview: state.preview,
        togglePreview,
        saveNote,
      }}
      {...props}
    />
  );
}

export { AppCtxt, CtxtProvider };
