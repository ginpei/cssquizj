import React, { FC } from 'react';
import styled from 'styled-components';
import { Quiz } from '../models/Quiz';

const FormLabel = styled.label`
  display: block;
`;

const FormText = styled.textarea`
  resize: none;
  width: 100%;
`;

type Prop = {
  onChange: (quiz: Quiz) => void;
  onSubmit: (quiz: Quiz) => void;
  quiz: Quiz;
  type?: 'new';
};

const QuizForm: FC<Prop> = (props) => {
  const { onChange, quiz } = props;

  const onValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    const updatedQuiz = { ...quiz };
    if (name === 'question') {
      updatedQuiz.question = value;
    } else if (name === 'answer') {
      updatedQuiz.answer = value;
    } else if (name === 'candidates') {
      const candidates = value.split('\n');
      updatedQuiz.candidates = [
        candidates[0] || '',
        candidates[1] || '',
        candidates[2] || '',
      ];
    } else {
      throw new Error(`Unknown name "${name}"`);
    }
    onChange(updatedQuiz);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit(quiz);
  };

  return (
    <form id="QuizForm">
      <p>
        <FormLabel htmlFor="question">質問</FormLabel>
        <FormText
          name="question"
          onChange={onValueChange}
          value={quiz.question}
        ></FormText>
      </p>
      <p>
        <FormLabel htmlFor="answer">正解</FormLabel>
        <FormText
          name="answer"
          onChange={onValueChange}
          value={quiz.answer}
        ></FormText>
      </p>
      <p>
        <FormLabel htmlFor="candidates">不正解の選択肢（改行区切り）</FormLabel>
        <FormText
          name="candidates"
          onChange={onValueChange}
          value={quiz.candidates}
        ></FormText>
      </p>
      <p>
        <button
          onClick={onSubmit}
          type="submit"
        >
          {props.type === 'new' ? '作成' : '更新'}
        </button>
      </p>
    </form>
  );
};

export default QuizForm;
