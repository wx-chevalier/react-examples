import { createActions, handleActions } from 'redux-actions';

interface IState {
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

export default handleActions<IState, any>(
  {
    [actions.incr.toString()](state: IState, { error, payload }) {
      return { ...state, count: state.count + payload, error };
    },

    [actions.error.toString()](state: IState, { error, payload }) {
      return { ...state, error };
    }
  },
  initialState
);
