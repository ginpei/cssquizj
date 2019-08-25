export type Quiz = {
  answer: string;
  candidates: [string, string, string];
  question: string;
  type: 'four-choice-question';
};

export const emptyQuiz: Readonly<Quiz> = {
  answer: '',
  candidates: ['', '', ''],
  question: '',
  type: 'four-choice-question',
};
