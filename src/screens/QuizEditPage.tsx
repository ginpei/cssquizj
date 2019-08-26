import React, { FC, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import firebase from '../middleware/firebase';
import { dummyQuizzes, isQuizOwner, Quiz } from '../models/Quiz';
import QuizForm from '../independents/QuizForm';
import styled from 'styled-components';

const DangerZone = styled.div`
  border: solid 1px tomato;
  border-radius: 0.2rem;
  padding: 1rem;
`;

type PageParams = {
  id: string;
};

type Props = RouteComponentProps<PageParams>;

const QuizEditPage: FC<Props> = (props) => {
  const key = props.match.params.id;
  const user = firebase.auth().currentUser;

  const [quizLoaded, setQuizLoaded] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const isOwner = quiz && user && isQuizOwner(quiz, user);

  // load quiz
  useEffect(() => {
    const tm = window.setTimeout(() => {
      setQuiz(dummyQuizzes.find((v) => v.key === key) || null);
      setQuizLoaded(true);
    }, 100);
    return () => window.clearTimeout(tm);
  }, [key]);

  if (!quizLoaded) {
    return <div>…</div>;
  }

  if (!quiz) {
    // TODO replace with NotFoundPage
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
  }

  if (!isOwner) {
    // TODO replace with PermissionDeniedPage
    return (
      <div>
        <h1>Permission denied</h1>
      </div>
    );
  }

  const onChange = (quiz: Quiz) => {
    setQuiz(quiz);
  };

  const onSubmit = (quiz: Quiz) => {
    console.log('# quiz', quiz);
  };

  return (
    <div id="QuizEditPage">
      <p>
        <Link to={`/quizzes/${quiz.key}`}>← クイズ</Link>
      </p>
      <h2>編集</h2>
      <QuizForm
        onChange={onChange}
        onSubmit={onSubmit}
        quiz={quiz}
      />
      <DangerZone>
        <h2>危険</h2>
        <p>
          <button disabled>削除</button>
        </p>
      </DangerZone>
    </div>
  );
};

export default QuizEditPage;
