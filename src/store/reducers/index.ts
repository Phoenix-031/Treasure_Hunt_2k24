import { combineReducers } from '@reduxjs/toolkit';
import { userReducers, userSliceLabel } from '../slices/user.slice';

export const rootReducer = combineReducers({
  [userSliceLabel]: userReducers,
});
