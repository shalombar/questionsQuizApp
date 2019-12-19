import React, { Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { loading } from './functions/functions';
import routes from './routes/Routes'

function App() {

  const _renderRoutes = () => {
    return routes.map((route, idx) => <Route exact={route.exact} path={route.path} name={route.name} component={route.component} key={idx} />)
  }

  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={() => loading()}>
          <Switch>
            {_renderRoutes()}
          </Switch>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
