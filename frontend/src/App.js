import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Log } from './pages/Log';
import { Reg } from './pages/Reg';
import { Layout } from './components/Layout';

import { AuthState } from './context/auth/AuthState';
import { GameState } from './context/game/GameState';
import { AlertState } from './context/alert/AlertState';

function App() {
  return (
    <AlertState>
      <GameState>
        <AuthState>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/game" component={Game} />
                <Route path="/reg" component={Reg} />
                <Route path="/log" component={Log} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </AuthState>
      </GameState>
    </AlertState>
  );
}

export default App;
