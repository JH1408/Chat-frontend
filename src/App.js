import React, {Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import Chat from './containers/Chat/Chat';
import Loading from './components/UI/Loading/Loading';

const App = () => {
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route path="/" exact component={LandingPage} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
