import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router';
import firebase from './middleware/firebase';
import { appHistory } from './misc';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import QuizCreatePage from './screens/QuizCreatePage';

// TODO move to file
const Loading: React.FC = () => (
  <div>...</div>
);

// TODO move to file
const NotFoundPage: React.FC = () => (
  <div>
    <h1>Not found</h1>
  </div>
);

const App: React.FC = () => {
  const auth = firebase.auth();

  const [authDone, setAuthDone] = useState(false);

  useEffect(() => auth.onAuthStateChanged((user) => {
    setAuthDone(true);
  }), [auth]);

  if (!authDone) {
    return <Loading />
  }

  return (
    <Router history={appHistory}>
      <Switch>
        <Route exact={true} path="/" component={HomePage}/>
        <Route exact={true} path="/login" component={LoginPage}/>
        <Route exact={true} path="/quizzes/new" component={QuizCreatePage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default App;
