import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';

import auth from 'pages/auth/store/AuthSlice';

import { apiStore } from './storeApi';

import common from './common/commonSlice';

const rootReducer = combineReducers({
  [apiStore.reducerPath]: apiStore.reducer,
  common,
  auth
});

const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [...getDefaultMiddleware()];
  return middlewareList;
};
//API slice Will include automatically generated redux reducer And a custom middleware
export const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware).concat(apiStore.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;

setupListeners(rootStore.dispatch);
// export default rootReducer;
