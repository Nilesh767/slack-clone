import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import { auth } from "./firebase";

import Login from "./Components/Login";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";

import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
          <img
            src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg"
            alt="Loading"
          />
          <Loader
            type="Circles"
            color="rgba(74, 21, 75)"
            height={50}
            width={50}
          />
        </AppLoadingContainer>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route exact path="/">
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  background-color: rgba(74, 21, 75, 0.8);
`;

const AppLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  text-align: center;
  align-items: center;
  justify-content: center;

  > img {
    height: 100px;
    padding: 20px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
