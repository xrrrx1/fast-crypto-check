import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import LinkButton from "../../components/LinkButton/LinkButton";
import MainPage from "../../components/MainPage/MainPage";
import PageNotFound from "../../components/PageNotFound/PageNotFound";
import AltsPage from "../AltsPage/AltsPage";
import BnbPage from "../BnbPage/BnbPage";
import BtcPage from "../BtcPage/BtcPage";
import TestWSpage from "../TestWSpage/TestWSpage";
import UsdPage from "../UsdPage/UsdPage";

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  background-color: #f5f5f5;
`;

const ButtonsContainer = styled.div`
  height: 100%;
  display: flex;
`;

const Content = styled.div``;

function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <HeaderContainer>
          <header>
            <ButtonsContainer>
              <LinkButton to="/btc" label="BTC" />
              <LinkButton to="/bnb" label="BNB" />
              <LinkButton to="/alts" label="ALTS" />
              <LinkButton to="/usd" label="USD" />
              <LinkButton to="/testws" label="WS" />
            </ButtonsContainer>
          </header>
        </HeaderContainer>
        <Content>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/btc" component={BtcPage} />
            <Route path="/bnb" component={BnbPage} />
            <Route path="/alts" component={AltsPage} />
            <Route path="/usd" component={UsdPage} />
            <Route path="/testws" component={TestWSpage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Content>
      </React.Fragment>
    </HashRouter>
  );
}

export default App;
