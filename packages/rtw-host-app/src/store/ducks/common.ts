import { createActions, handleActions } from 'redux-actions';

export interface IState {
  count: number;
}

const initialState: IState = {
  count: 0
};

export const actions = createActions({
  async incr(step = 1) {
    return step;
  },

  async error() {
    throw new Error('Error');
  }
});

export const commonActions = actions;

export default handleActions<IState, any>(
  {
    [actions.incr.toString()](state: IState, { error, payload }) {
      console.log(state.count + payload);
      return { ...state, count: state.count + payload, error };
    },

    [actions.error.toString()](state: IState, { error }) {
      return { ...state, error };
    }
  },
  initialState
);
