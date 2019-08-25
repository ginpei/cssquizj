export type Quiz = {
  answer: string;
  candidates: [string, string, string];
  key: string;
  question: string;
  type: 'four-choice-question';
};

export const emptyQuiz: Readonly<Quiz> = {
  answer: '',
  candidates: ['', '', ''],
  key: '',
  question: '',
  type: 'four-choice-question',
};

export const dummyQuizzes: Quiz[] = [
  {
    answer: 'red',
    candidates: ['blue', '#00f', '#0000ff'],
    key: 'aaa',
    question: '青くないのは？',
    type: 'four-choice-question',
  },
  {
    answer: 'font-size',
    candidates: ['font-weight', 'font-style', 'size'],
    key: 'bbb',
    question: '文字の大きさ？',
    type: 'four-choice-question',
  },
];
