import { COINS_RECEIVE, COINS_REQUEST } from "../constants";

const initialState = {
  coins: [1, 2, 3],
  isLoading: false,
  hasData: false,
};

export default function coinsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COINS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case COINS_RECEIVE: {
      return {
        ...state,
        coins: payload,
        isLoading: false,
        hasData: true,
      };
    }

    default:
      return state;
  }
}
