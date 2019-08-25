import * as firebaseui from 'firebaseui';
import React, { FC, useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../middleware/firebase';

const Loading: FC = () => (
  <div>...</div>
);

const uiConfig: firebaseui.auth.Config = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE, // disable AccountChooser.com
  // privacyPolicyUrl: () => appHistory.push('/privacy'),
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  // tosUrl: () => appHistory.push('/terms'),
};

const HomePage: FC = () => {
  const auth = firebase.auth();

  const [authDone, setAuthDone] = useState(false);
  const [loggedIn, setLoggedIn] = useState(Boolean(auth.currentUser));

  useEffect(() => auth.onAuthStateChanged((user) => {
    setAuthDone(true);
    setLoggedIn(Boolean(user));
  }), [auth]);

  const onLogoutClick = async () => {
    setAuthDone(false);
    await auth.signOut();
    setAuthDone(true);
  };

  if (!authDone) {
    return (
      <Loading />
    );
  }

  return (
    <div id="HomePage">
      <h1>CSS Quiz J</h1>
      {loggedIn ? (
        <div>
          <p>
            ようこそ
          </p>
          <p>
            <button
              onClick={onLogoutClick}
            >
              ログアウト
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2>ログイン</h2>
          <StyledFirebaseAuth
            firebaseAuth={auth}
            uiConfig={uiConfig}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
