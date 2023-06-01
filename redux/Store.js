import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";

const loggerMiddleware = createLogger();
const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
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
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
      } else {
        return [];
      }
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

store.subscribe(() => saveToLocalStorage(store.getState()));
