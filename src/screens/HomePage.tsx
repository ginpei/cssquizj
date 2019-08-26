import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../middleware/firebase';

const Hero = styled.div`
  background-color: var(--color-theme-bg);
  border-radius: 0.2rem;
  color: var(--color-theme-fg);
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  font-size: 3rem;
  font-weight: bold;
`;

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
    <div className="HomePage container">
      <Hero>
        <span>CSS Quiz J</span>
        <span role="img" aria-label="">🥳</span>
      </Hero>
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
