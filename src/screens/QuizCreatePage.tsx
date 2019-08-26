import React, { FC, useEffect, useState } from 'react';
import BasicLayout from '../complexes/BasicLayout';
import QuizForm from '../independents/QuizForm';
import firebase from '../middleware/firebase';
import { emptyQuiz, Quiz } from '../models/Quiz';

const QuizCreatePage: FC = () => {
  const auth = firebase.auth();

  const [loggedIn, setLoggedIn] = useState(Boolean(auth.currentUser));
  const [quiz, setQuiz] = useState(emptyQuiz);

  useEffect(() => auth.onAuthStateChanged((user) => {
    setLoggedIn(Boolean(user));
  }), [auth]);

  const onQuizChange = (quiz: Quiz) => {
    setQuiz(quiz);
  };

  const onQuizSubmit = (quiz: Quiz) => {
    // TODO
    console.log('# quiz', quiz);
  };

  if (!loggedIn) {
    return (
      <div id="QuizCreatePage" className="notLoggedIn">
        <h1>ログインが必要です。</h1>
      </div>
    );
  }

  return (
    <BasicLayout className="QuizCreatePage">
      <h2>クイズ作成</h2>
      <QuizForm
        onChange={onQuizChange}
        onSubmit={onQuizSubmit}
        quiz={quiz}
        type="new"
      />
    </BasicLayout>
  );
};

export default QuizCreatePage;
