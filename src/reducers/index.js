import { combineReducers } from 'redux';
import packageData from './packageDataReducers';
import ui from './uiReducers';

export default combineReducers({
  packageData,
  ui
});
