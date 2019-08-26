import React, { FC, useState } from 'react';
import BasicLayout from '../complexes/BasicLayout';
import QuizForm from '../independents/QuizForm';
import firebase from '../middleware/firebase';
import { appHistory } from '../misc';
import { emptyQuiz, Quiz, saveNewQuiz } from '../models/Quiz';

const QuizCreatePage: FC = () => {
  const auth = firebase.auth();
  const user = auth.currentUser;

  const [quiz, setQuiz] = useState(emptyQuiz);
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div id="QuizCreatePage" className="notLoggedIn">
        <h1>ログインが必要です。</h1>
      </div>
    );
  }

  const onQuizChange = (quiz: Quiz) => {
    setQuiz(quiz);
  };

  const onQuizSubmit = async (quiz: Quiz) => {
    setSaving(true);
    try {
      const savedQuiz = await saveNewQuiz(
        firebase.firestore(),
        user,
        quiz,
      );
      appHistory.push(`/quizzes/${savedQuiz.id}`);
    } catch (error) {
      // TODO render error
      console.error(error);
      setSaving(false);
    }
  };

  return (
    <BasicLayout className="QuizCreatePage">
      <h2>クイズ作成</h2>
      <QuizForm
        onChange={onQuizChange}
        onSubmit={onQuizSubmit}
        quiz={quiz}
        type="new"
        working={saving}
      />
    </BasicLayout>
  );
};

export default QuizCreatePage;
