import React, { createContext, useReducer } from 'react';
import Users from '../data/Users';

const initialState = { Users };
const UsersContext = createContext({});

const actions = {
  createUser(state, action) {
    const created = action.payload;
    created.id = Math.random();
    return {
      ...state,
      Users: [...state.Users, created],
    };
  },

  updateUser(state, action) {
    const updated = action.payload;
    return {
      ...state,
      Users: state.Users.map((u) => (u.id === updated.id ? updated : u)),
    };
  },

  deleteUser(state, action) {
    const deleted = action.payload;
    return {
      ...state,
      Users: state.Users.filter((u) => u.id !== deleted.id),
    };
  },
};

export const UsersProvider = (props) => {
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
