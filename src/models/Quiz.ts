export type Quiz = {
  answer: string;
  candidates: [string, string, string];
  explanation: string;
  key: string;
  ownerId: string;
  question: string;
  type: 'four-choice-question';
};

export type FourChoices = [string, string, string, string];

export const emptyQuiz: Readonly<Quiz> = {
  answer: '',
  candidates: ['', '', ''],
  explanation: '',
  key: '',
  ownerId: '',
  question: '',
  type: 'four-choice-question',
};

export const dummyQuizzes: Quiz[] = [
  {
    answer: 'red',
    candidates: ['blue', '#00f', '#0000ff'],
    explanation: 'RGBだしねー',
    key: 'aaa',
    ownerId: 'aSe7VDZNNnb44haXH94McBrPtVu2',
    question: '青くないのは？',
    type: 'four-choice-question',
  },
  {
    answer: 'font-size',
    candidates: ['font-weight', 'font-style', 'size'],
    explanation: 'fontのsize',
    key: 'bbb',
    ownerId: 'aSe7VDZNNnb44haXH94McBrPtVu2',
    question: '文字の大きさ？',
    type: 'four-choice-question',
  },
];

export function shuffleCandidates(quiz: Quiz): FourChoices {
  // TODO shuffle
  const choices: FourChoices = [
    quiz.answer,
    quiz.candidates[0],
    quiz.candidates[1],
    quiz.candidates[2],
  ];
  return choices
}

export function isQuizOwner(quiz: Quiz, user: firebase.User): boolean {
  return quiz.ownerId === user.uid;
}
