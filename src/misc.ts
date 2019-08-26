import { createBrowserHistory } from 'history';
import { Quiz } from './models/Quiz';

export const appHistory = createBrowserHistory();

export function moveToRandomQuiz(quizzes: Quiz[], current?: Quiz) {
  const filtered = current
    ? quizzes.filter((v) => v.key !== current.key)
    : quizzes;
  const quiz = filtered[Math.floor(Math.random() * filtered.length)];
  const path = `/quizzes/${quiz.key}`;
  appHistory.push(path);
}
