export type Quiz = {
  answer: string;
  explanation: string;
  id: string;
  question: string;
  type: 'four-choice-question';
  userId: string;
  wrongAnswers: string[];
};

export const emptyQuiz: Readonly<Quiz> = {
  answer: '',
  explanation: '',
  id: '',
  question: '',
  type: 'four-choice-question',
  userId: '',
  wrongAnswers: [],
};

export const allQuizzes: Quiz[] = [];

export async function updateAllQuizzes(firestore: firebase.firestore.Firestore) {
  const coll = firestore.collection('/quizzes');
  try {
    const snapshot = await coll.get();
    allQuizzes.length = 0;
    snapshot.forEach((ds) => allQuizzes.push(createQuizFromSnapshot(ds)));
  } catch (error) {
    // TODO render error
    console.error('Hey', error);
  }

  return allQuizzes;
}

export async function fetchQuiz(
  firestore: firebase.firestore.Firestore,
  id: string,
): Promise<Quiz> {
  const refQuiz = firestore.collection('/quizzes').doc(id);
  const ssQuiz = await refQuiz.get();
  const quiz = createQuizFromSnapshot(ssQuiz);
  return quiz;
}

function createQuizFromSnapshot(ds: firebase.firestore.DocumentSnapshot) {
  const data = ds.data();
  if (!data) {
    throw new Error('Document does not found');
  }

  const quiz: Quiz = {
    answer: data.answer,
    explanation: data.explanation,
    id: ds.id,
    question: data.question,
    type: data.type,
    userId: data.userId,
    wrongAnswers: [
      data.wrongAnswer1,
      data.wrongAnswer2,
      data.wrongAnswer3,
    ],
  };

  // TODO validate here

  return quiz;
}

export async function saveNewQuiz(
  firestore: firebase.firestore.Firestore,
  user: firebase.User,
  quiz: Quiz,
) {
  const { id } = quiz;
  if (id) {
    throw new Error('New quiz must not have ID');
  }

  const data = createDataFromQuiz(user, quiz);
  (window as any).firestore = firestore;
  const refQuiz = await firestore.collection('/quizzes').add(data);
  const updatedQuiz = { ...quiz, id: refQuiz.id };
  return updatedQuiz;
}

export async function updateQuiz(
  firestore: firebase.firestore.Firestore,
  user: firebase.User,
  quiz: Quiz,
) {
  const { id } = quiz;
  if (!id) {
    throw new Error('Quiz must have ID');
  }

  const refQuiz = firestore.collection('/quizzes').doc(id);
  const data = createDataFromQuiz(user, quiz);
  await refQuiz.set(data);
}

function createDataFromQuiz(user: firebase.User, quiz: Quiz) {
  const data = {
    answer: quiz.answer,
    explanation: quiz.explanation,
    question: quiz.question,
    type: quiz.type,
    userId: user.uid,
    wrongAnswer1: quiz.wrongAnswers[0] || '',
    wrongAnswer2: quiz.wrongAnswers[1] || '',
    wrongAnswer3: quiz.wrongAnswers[2] || '',
  };
  return data;
}

export function validateQuiz(quiz: Quiz): string[] {
  const errors: (keyof Quiz)[] = [];

  if (!quiz.question) {
    errors.push('question');
  }

  if (!quiz.answer) {
    errors.push('answer');
  }

  if (
    (new Set(quiz.wrongAnswers)).size !== 3
    || quiz.wrongAnswers.some((v) => !v)
  ) {
    errors.push('wrongAnswers');
  }

  if (!quiz.explanation) {
    errors.push('explanation');
  }

  return errors;
}

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
  return quiz.userId === user.uid;
}
