import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { ReducersMapObject, combineReducers } from 'redux';

import commonReducer, { IState as CommonState } from './common';

export interface IState {
  common: CommonState;
}

export const configReducer = (partialReducers: ReducersMapObject = {}) => (
  history: History,
) =>
  combineReducers({
    common: commonReducer,
    router: connectRouter(history),
    ...partialReducers,
  });
