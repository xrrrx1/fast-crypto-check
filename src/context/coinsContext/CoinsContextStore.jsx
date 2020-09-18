/* eslint-disable no-console */
import Axios from "axios";
import PropTypes from "prop-types";
import React, { useReducer } from "react";
import { COINS_API, COINS_RECEIVE, COINS_REQUEST } from "../../constants";
import coinsReducer from "../../reducers/coinsReducer";
import { CoinsContext } from "../context";

const CoinsStore = (props) => {
  const { children } = props;
  const [store, dispatch] = useReducer(coinsReducer, []);

  const fetchData = async () => {
    try {
      const response = await fetch(COINS_API);
      const data = await response.json();
      dispatch({
        type: COINS_REQUEST,
      });
      setTimeout(() => {
        dispatch({
          type: COINS_RECEIVE,
          payload: data.data,
        });
      }, 0);
    } catch (e) {
      console.error(e);
    }
  };

  const getCoinsFromApi = async () => {
    try {
      const coins = await Axios.get(COINS_API);
      console.log("coins", coins);
      dispatch({
        type: COINS_RECEIVE,
      });
      setTimeout(() => {
        dispatch({
          type: COINS_REQUEST,
          payload: coins,
        });
      }, 0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CoinsContext.Provider
      value={{
        store,
        fetchData,
        getCoinsFromApi,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

CoinsStore.propTypes = {
  children: PropTypes.shape({
    type: PropTypes.func.isRequired,
  }).isRequired,
};

export default CoinsStore;
