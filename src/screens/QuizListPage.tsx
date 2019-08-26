import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '../complexes/BasicLayout';
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
    <BasicLayout className="QuizListPage">
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
    </BasicLayout>
  );
};

export default QuizListPage;
