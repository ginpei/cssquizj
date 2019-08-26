import React, { FC } from 'react';
import styled from 'styled-components';
import { Quiz } from '../models/Quiz';
import NiceMarkdown from '../complexes/NiceMarkdown';

const FormLabel = styled.label`
  display: block;
`;

const FormText = styled.textarea`
  resize: none;
  width: 100%;
`;

const PreviewOuter = styled.div`
  font-size: 0.8em;
  margin-left: 3em;
`;

const PreviewBody = styled.div`
  border: solid 1px #ccc;
  padding: 1em;
`;

const Preview: FC<{ children: string }> = (props) => (
  <PreviewOuter>
    <div>プレビュー</div>
    <PreviewBody>
      <NiceMarkdown>{props.children}</NiceMarkdown>
    </PreviewBody>
  </PreviewOuter>
);

type Prop = {
  working?: boolean;
  onChange: (quiz: Quiz) => void;
  onSubmit: (quiz: Quiz) => void;
  quiz: Quiz;
  type?: 'new';
};

const QuizForm: FC<Prop> = (props) => {
  const { working, onChange, quiz } = props;

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
      updatedQuiz.wrongAnswers = value.split('\n');
    } else if (name === 'explanation') {
      updatedQuiz.explanation = value;
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
          disabled={working}
          name="question"
          onChange={onValueChange}
          value={quiz.question}
        ></FormText>
      </p>
      <Preview>{quiz.question}</Preview>
      <p>
        <FormLabel htmlFor="answer">正解</FormLabel>
        <FormText
          disabled={working}
          name="answer"
          onChange={onValueChange}
          value={quiz.answer}
        ></FormText>
      </p>
      <Preview>{quiz.answer}</Preview>
      <p>
        <FormLabel htmlFor="candidates">不正解の選択肢（改行区切り）</FormLabel>
        <FormText
          disabled={working}
          name="candidates"
          onChange={onValueChange}
          value={quiz.wrongAnswers.join('\n')}
        ></FormText>
      </p>
      <Preview>（準備中）</Preview>
      <p>
        <FormLabel htmlFor="explanation">解説</FormLabel>
        <FormText
          disabled={working}
          name="explanation"
          onChange={onValueChange}
          value={quiz.explanation}
        ></FormText>
      </p>
      <Preview>{quiz.explanation}</Preview>
      <p>
        <button
          disabled={working}
          onClick={onSubmit}
          type="submit"
        >
          {props.type === 'new' ? '作成' : '更新'}
        </button>
        {working && (
          <span role="img" aria-label="Saving...">⏳</span>
        )}
      </p>
    </form>
  );
};

export default QuizForm;
