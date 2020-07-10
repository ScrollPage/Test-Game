import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Game } from './pages/Game'
import { Home } from './pages/Home'
import { Log } from './pages/Log'
import { Reg } from './pages/Reg'
import { Layout } from './components/Layout';

function App() {
  return (
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
  );
}

export default App;
