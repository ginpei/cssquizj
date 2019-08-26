import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../middleware/firebase';
import { moveToRandomQuiz } from '../misc';
import { dummyQuizzes } from '../models/Quiz';

const Hero = styled.div`
  background-color: var(--color-theme-bg);
  border-radius: 0.2rem;
  color: var(--color-theme-fg);
  display: flex;
  font-size: 3rem;
  font-weight: bold;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
`;

const HeroEmoji = styled.span`
  text-shadow:
     1px  1px 0 var(--color-theme-fg),
     1px -1px 0 var(--color-theme-fg),
    -1px -1px 0 var(--color-theme-fg),
    -1px  1px 0 var(--color-theme-fg);
`;

const HomePage: FC = () => {
  const auth = firebase.auth();

  const [loggedIn, setLoggedIn] = useState(Boolean(auth.currentUser));

  useEffect(() => auth.onAuthStateChanged((user) => {
    setLoggedIn(Boolean(user));
  }), [auth]);

  // eslint-disable-next-line jsx-a11y/accessible-emoji
  const emoji = <HeroEmoji role="img" aria-label="">🥳</HeroEmoji>;

  const onRandomClick = () => {
    moveToRandomQuiz(dummyQuizzes);
  };

  const onLogoutClick = async () => {
    await auth.signOut();
  };

  return (
    <div className="HomePage container">
      <Hero>
        <span>CSS Quiz J</span>
        {emoji}
      </Hero>
      <div>
        <button onClick={onRandomClick}>ランダム問題</button>
      </div>
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
