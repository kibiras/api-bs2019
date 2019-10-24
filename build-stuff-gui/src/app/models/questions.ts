export interface Questions {
  quiz: [
    {
      id: number;
      name: string;
      token: string;
      q1: number;
      q2: number;
      q3: number;
      q4: number;
      q5: number;
      ip: string;
    }
  ];
  questions: [
    {
      id: number;
      category: string;
      difficulty: string;
      question: string;
      correct_answer: string;
    }
  ];
}
