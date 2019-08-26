import { createBrowserHistory } from 'history';
import { Quiz } from './models/Quiz';

export const appHistory = createBrowserHistory();

export function moveToRandomQuiz(quizzes: Quiz[], current?: Quiz) {
  const filtered = current
    ? quizzes.filter((v) => v.id !== current.id)
    : quizzes;
  if (filtered.length < 1) {
    throw new Error('No enough quizzes. Failed to fetch?');
  }
  const quiz = filtered[Math.floor(Math.random() * filtered.length)];
  const path = `/quizzes/${quiz.id}`;
  appHistory.push(path);
}
