import { createActions, handleActions } from 'redux-actions';
import { handle } from 'redux-pack-fsa';

export interface IState {
  count: number;
}

const initialState: IState = {
  count: 0,
};

export const actions = createActions({
  async incr(step = 1) {
    return step;
  },

  async dec(step = 1) {
    return step;
  },

  async error() {
    throw new Error('Error');
  },
});

export const commonActions = actions;

export default handleActions<IState, any>(
  {
    [actions.incr.toString()](state: IState, action) {
      const { payload } = action;

      return handle(state, action, {
        start: (prevState: IState) => ({
          ...prevState,
          isLoading: true,
        }),
        finish: (prevState: IState) => ({ ...prevState, isLoading: false }),
        success: (prevState: IState) => ({
          ...prevState,
          count: prevState.count + payload,
        }),
      });
    },

    [actions.dec.toString()](state: IState, action) {
      const { payload } = action;

      return handle(state, action, {
        success: (prevState: IState) => ({
          ...prevState,
          count: prevState.count - payload,
        }),
      });
    },

    [actions.error.toString()](state: IState, action) {
      const { payload } = action;
      return handle(state, action, {
        failure: (prevState: IState) => ({ ...prevState, error: payload }),
      });
    },
  },
  initialState,
);
