import {SET_DATA} from '../../utils/ActionType';
import {AuthModal, ActionType} from '../../utils/Modal';

const AuthReducer = (
  state: AuthModal = new AuthModal(),
  action: ActionType,
) => {
  switch (action.type) {
    case SET_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default AuthReducer;
