export type Quiz = {
  answer: string;
  explanation: string;
  id: string;
  ownerId: string;
  question: string;
  type: 'four-choice-question';
  wrongAnswers: string[];
};


export const emptyQuiz: Readonly<Quiz> = {
  answer: '',
  explanation: '',
  id: '',
  ownerId: '',
  question: '',
  type: 'four-choice-question',
  wrongAnswers: [],
};

export const dummyQuizzes: Quiz[] = [
  {
    answer: 'red',
    explanation: 'RGBだしねー',
    id: 'aaa',
    ownerId: 'aSe7VDZNNnb44haXH94McBrPtVu2',
    question: '青くないのは？',
    type: 'four-choice-question',
    wrongAnswers: ['blue', '#00f', '#0000ff'],
  },
  {
    answer: 'font-size',
    explanation: 'fontのsize',
    id: 'bbb',
    ownerId: 'aSe7VDZNNnb44haXH94McBrPtVu2',
    question: '文字の大きさ？',
    type: 'four-choice-question',
    wrongAnswers: ['font-weight', 'font-style', 'size'],
  },
];

export function shuffleCandidates(quiz: Quiz): string[] {
  const choices = [
    quiz.answer,
    ...quiz.wrongAnswers,
  ];

  const shuffled: string[] = [];
  while (choices.length) {
    const index = Math.floor(Math.random() * choices.length);
    const [option] = choices.splice(index, 1);
    shuffled.push(option);
  }

  return shuffled;
}

export function isQuizOwner(quiz: Quiz, user: firebase.User): boolean {
  return quiz.ownerId === user.uid;
}
