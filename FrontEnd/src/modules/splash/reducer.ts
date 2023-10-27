import {SET_LOADING} from '../../utils/ActionType';
import {SplashModal, ActionType} from '../../utils/Modal';

const SplashReducer = (
  state: SplashModal = new SplashModal(),
  action: ActionType,
) => {
  switch (action.type) {
    case SET_LOADING:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default SplashReducer;
