import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, ChevronRight, ArrowLeft, CheckCircle2,
  XCircle, Timer, Award, BrainCircuit, GraduationCap
} from 'lucide-react';
import { quizData, Question } from '../constants/quizData';

type QuizState = 'selection' | 'quiz' | 'result';

export default function Quiz() {
  const [state, setState] = useState<QuizState>('selection');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const navigate = useNavigate();

  const subjects = Object.keys(quizData);

  const startQuiz = (subject: string, grade: string) => {
    const questions = [...quizData[subject][grade]].sort(() => Math.random() - 0.5).slice(0, 10);
    setSelectedSubject(subject);
    setSelectedGrade(grade);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(600);
    setState('quiz');
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let finalScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === currentQuestions[index].correctAnswer) {
        finalScore += 1;
      }
    });
    const percentage = (finalScore / currentQuestions.length) * 100;
    setScore(percentage);

    // Update local storage for dashboard
    const savedScores = JSON.parse(localStorage.getItem('studious_scores') || '{}');
    savedScores[selectedSubject] = percentage;
    localStorage.setItem('studious_scores', JSON.stringify(savedScores));

    setState('result');
  };

  useEffect(() => {
    if (state === 'quiz' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && state === 'quiz') {
      finishQuiz();
    }
  }, [state, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {state === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">Quiz Center</h1>
                <p className="text-slate-600">Test your knowledge and improve your cognitive profile.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-brand/5 border border-brand/10">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <GraduationCap className="text-brand w-6 h-6" />
                  Select Your Standard
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {["11th", "12th"].map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                        selectedGrade === grade
                          ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20'
                          : 'bg-white text-slate-600 border-slate-100 hover:border-brand/30'
                      }`}
                    >
                      {grade} Standard
                    </button>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BookOpen className="text-brand w-6 h-6" />
                  Choose a Subject
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      disabled={!selectedGrade}
                      onClick={() => startQuiz(subject, selectedGrade)}
                      className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand/40 hover:bg-white transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800 group-hover:text-brand">{subject}</span>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {state === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-8 rounded-3xl shadow-2xl shadow-brand/10 border border-brand/5"
            >
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedSubject} Quiz</h2>
                  <p className="text-slate-500 font-medium">{selectedGrade} Standard</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl font-bold">
                    <Timer className="w-5 h-5" />
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-slate-400 font-bold">
                    {currentQuestionIndex + 1} / {currentQuestions.length}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">
                  {currentQuestions[currentQuestionIndex].question}
                </h3>
                <div className="grid gap-4">
                  {currentQuestions[currentQuestionIndex].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-5 rounded-2xl text-left font-semibold transition-all border-2 flex justify-between items-center ${
                        userAnswers[currentQuestionIndex] === i
                          ? 'bg-brand/5 border-brand text-brand shadow-sm'
                          : 'bg-white border-slate-100 text-slate-600 hover:border-brand/20 hover:bg-slate-50'
                      }`}
                    >
                      {option}
                      {userAnswers[currentQuestionIndex] === i && <CheckCircle2 className="w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setState('selection')}
                  className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Quit Quiz
                </button>
                <button
                  disabled={userAnswers[currentQuestionIndex] === undefined}
                  onClick={nextQuestion}
                  className="bg-brand text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all disabled:opacity-50"
                >
                  {currentQuestionIndex === currentQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </motion.div>
          )}

          {state === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-brand/10 border border-brand/5 mb-8">
                <div className="w-24 h-24 bg-brand/10 rounded-3xl flex items-center justify-center text-brand mx-auto mb-8">
                  <Award className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Quiz Completed!</h2>
                <p className="text-slate-500 mb-10 font-medium">You've successfully completed the {selectedSubject} challenge.</p>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Your Score</p>
                    <p className="text-5xl font-black text-brand">{score}%</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <p className={`text-2xl font-black ${score >= 40 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {score >= 80 ? 'Excellent!' : score >= 40 ? 'Passed' : 'Try Again'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-brand text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all flex items-center justify-center gap-2"
                  >
                    <BrainCircuit className="w-6 h-6" />
                    View Updated Dashboard
                  </button>
                  <button
                    onClick={() => setState('selection')}
                    className="w-full bg-white text-slate-600 py-5 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Go Back to Selection
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
