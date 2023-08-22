import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";

const loggerMiddleware = createLogger();
const persistedState = loadFromLocalStorage();

const initialState = {
  isAuthenticated: false, // Set this to true when user is authenticated
  // ...other states
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState || initialState,
  middleware: [thunkMiddleware],
});

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("state")) {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return initialState;
        return JSON.parse(serializedState);
      } else {
        return [];
      }
    }
  } catch (err) {
    console.log(err);
    return initialState;
  }
}

store.subscribe(() => saveToLocalStorage(store.getState()));
