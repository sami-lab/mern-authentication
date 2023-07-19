import React, { createContext, useReducer } from "react";

import * as actionTypes from "./actions";
import reducer from "./reducer";

const initialState = {
  user: null,
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setAuth(user) {
    dispatch({
      type: actionTypes.SET_USER,
      payload: user,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        setAuth,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
