import {combineReducers} from 'redux';
import AuthReducer from '../modules/auth/reducer';
import SplashReducer from '../modules/splash/reducer';

export const RootReducer = combineReducers({
  AuthReducer,
  SplashReducer,
});
