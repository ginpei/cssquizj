import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '../complexes/BasicLayout';
import firebase from '../middleware/firebase';
import { moveToRandomQuiz } from '../misc';
import { Quiz, updateAllQuizzes } from '../models/Quiz';

const QuizListPage: FC = () => {
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    setQuizLoaded(false);
    setQuizzes([]);

    updateAllQuizzes(firebase.firestore()).then((newQuizzes) => {
      setQuizLoaded(true);
      setQuizzes(newQuizzes);
    });
  }, []);

  const onRandomClick = () => {
    moveToRandomQuiz(quizzes);
  };

  return (
    <BasicLayout className="QuizListPage">
      <h2>クイズ一覧</h2>
      <div>
        <button onClick={onRandomClick}>ランダム問題</button>
      </div>
      {quizLoaded ? (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`}>
                {quiz.question}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>…</div>
      )}
    </BasicLayout>
  );
};

export default QuizListPage;
