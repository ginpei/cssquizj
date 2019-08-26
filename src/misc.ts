import { createBrowserHistory } from 'history';
import { Quiz } from './models/Quiz';

export const appHistory = createBrowserHistory();

export function moveToRandomQuiz(quizzes: Quiz[], current?: Quiz) {
  const filtered = current
    ? quizzes.filter((v) => v.id !== current.id)
    : quizzes;
  const quiz = filtered[Math.floor(Math.random() * filtered.length)];
  const path = `/quizzes/${quiz.id}`;
  appHistory.push(path);
}
