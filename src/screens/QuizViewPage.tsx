import React, { FC, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import BasicLayout from '../complexes/BasicLayout';
import firebase from '../middleware/firebase';
import { fetchQuiz, isQuizOwner, Quiz, shuffleCandidates } from '../models/Quiz';

type AnswerOptionProps = {
  onClick: (option: string) => void;
  option: string;
  selected: boolean | null;
};

const AnswerOptionOuter = styled.span.attrs({
  tabIndex: 0,
})`
  align-items: center;
  border-color: #ccc;
  border-radius: 0.2rem;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  display: inline-flex;
  height: 100px;
  justify-content: center;
  margin: 0.5rem;
  width: 100px;
  background-color: #f9f9f9;
`;

const AnswerOption: FC<AnswerOptionProps> = (props) => {
  const onClick = () => {
    props.onClick(props.option);
  };

  return (
    <AnswerOptionOuter
      onClick={onClick}
      style={{
        borderColor: props.selected ? '#09f' : '',
        boxShadow: props.selected ? '0 0 0.2em #09f' : '',
      }}
    >
      {props.option}
    </AnswerOptionOuter>
  );
};

type PageParams = {
  id: string;
};

type Props = RouteComponentProps<PageParams>;

const QuizViewPage: FC<Props> = (props) => {
  const key = props.match.params.id;
  const user = firebase.auth().currentUser;

  const [quizLoaded, setQuizLoaded] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const correct = (quiz && selected !== null)
    ? selected === quiz.answer
    : false;

  const isOwner = quiz && user && isQuizOwner(quiz, user);

  useEffect(() => {
    setQuizLoaded(false);
    setQuiz(null);
    setSelected(null);

    fetchQuiz(firebase.firestore(), key).then((quiz) => {
      setQuizLoaded(true);
      setQuiz(quiz);
    });
  }, [key]);

  useEffect(() => {
    if (quiz) {
      setOptions(shuffleCandidates(quiz));
    } else {
      setOptions([]);
    }
  }, [quiz])

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

  const onAnswerClick = (option: string) => {
    if (!selected) {
      setSelected(option);
    }
  };

  const onRandomClick = () => {
    // moveToRandomQuiz(dummyQuizzes, quiz);
  };

  return (
    <BasicLayout className="QuizViewPage">
      <p>
        <Link to="/quizzes/">← 一覧</Link>
        {isOwner && (
          <>
            {' | '}
            <Link to={`/quizzes/${quiz.id}/edit`}>編集</Link>
          </>
        )}
      </p>
      <h2>{quiz.question}</h2>
      <div>
        {options.map((option) => (
          <AnswerOption
            key={option}
            onClick={onAnswerClick}
            option={option}
            selected={selected === null ? false : selected === option}
          />
        ))}
      </div>
      {selected !== null && (
        <>
          {correct ? (
            <div>
              <h2>せいかい</h2>
              <p>
                <span
                  style={{ fontSize: '5rem' }}
                  role="img"
                  aria-label="やったね！"
                >
                  🥳
                </span>
              </p>
              <p>{quiz.explanation}</p>
            </div>
          ) : (
            <div>
              <h2>まちがい</h2>
              <p>正解は：</p>
              <p>{quiz.answer}</p>
              <p>{quiz.explanation}</p>
            </div>
          )}
          <div>
            <button onClick={onRandomClick}>ランダム問題</button>
          </div>
        </>
      )}
    </BasicLayout>
  );
};

export default QuizViewPage;
