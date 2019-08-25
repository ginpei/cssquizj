import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../middleware/firebase';

const HomePage: FC = () => {
  const auth = firebase.auth();

  const [loggedIn, setLoggedIn] = useState(Boolean(auth.currentUser));

  useEffect(() => auth.onAuthStateChanged((user) => {
    setLoggedIn(Boolean(user));
  }), [auth]);

  const onLogoutClick = async () => {
    await auth.signOut();
  };

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
          <hr/>
          <ul>
            <li>
              <Link to="/quizzes/">一覧</Link>
            </li>
            <li>
              <Link to="/quizzes/new">新規作成</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link to="/login">ログイン</Link>
          <hr/>
          <ul>
            <li>
              <Link to="/quizzes/">一覧</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
