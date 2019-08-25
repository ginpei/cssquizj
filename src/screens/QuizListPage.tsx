import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dummyQuizzes, Quiz } from '../models/Quiz';

const QuizListPage: FC = () => {
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const tm = window.setTimeout(() => {
      setQuizzes(dummyQuizzes);
      setQuizLoaded(true);
    }, 100);
    return () => window.clearTimeout(tm);
  }, [quizzes]);

  return (
    <div id="QuizListPage">
      <h2>クイズ一覧</h2>
      {quizLoaded ? (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.key}>
              <Link to={`/quizzes/${quiz.key}`}>
                {quiz.question}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>…</div>
      )}
    </div>
  );
};

export default QuizListPage;
