export interface QuizResult {
  db: [
    {
      id: number;
      category: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      answer: string;
      points: number;
    }
  ];
  speed: [number];
}
