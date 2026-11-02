import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, ArrowRight, RotateCcw } from 'lucide-react';

interface ExamResultsModalProps {
  isOpen: boolean;
  userName: string;
  tfScore: number;
  mcqScore: number;
  essayScore: number;
  totalScore: number;
  percentage: number;
  timeSpentSeconds: number;
  gradeBadge: string;
  onReviewAnswers: () => void;
  onViewScoreboard: () => void;
  onRetakeExam: () => void;
}

export const ExamResultsModal: React.FC<ExamResultsModalProps> = ({
  isOpen,
  userName,
  tfScore,
  mcqScore,
  essayScore,
  totalScore,
  percentage,
  timeSpentSeconds,
  gradeBadge,
  onReviewAnswers,
  onViewScoreboard,
  onRetakeExam,
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const isPass = percentage >= 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden text-center">
        {/* Badge icon */}
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 mb-4">
          <Trophy className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Exam Completed!
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Great job, <strong className="text-slate-900 dark:text-white">{userName}</strong>! Your result is posted to the class scoreboard.
        </p>

        {/* Big Score Box */}
        <div className="my-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {totalScore} <span className="text-xl font-bold text-slate-400">/ 76</span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {percentage}%
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              isPass
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
            }`}>
              {gradeBadge}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-3 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Taken: {formatTime(timeSpentSeconds)}</span>
          </div>
        </div>

        {/* Section Breakdown Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-left">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Part I (T/F)</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
              {tfScore} <span className="text-xs font-normal text-slate-400">/ 30</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${Math.round((tfScore / 30) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Part II (MCQ)</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
              {mcqScore} <span className="text-xs font-normal text-slate-400">/ 16</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full"
                style={{ width: `${Math.round((mcqScore / 16) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Part III (Essay)</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
              {essayScore} <span className="text-xs font-normal text-slate-400">/ 30</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-amber-600 h-1.5 rounded-full"
                style={{ width: `${Math.round((essayScore / 30) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onReviewAnswers}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <span>Review Full Answer Key & Lecture Citations</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewScoreboard}
              className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>View Leaderboard</span>
            </button>

            <button
              onClick={onRetakeExam}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              title="Retake Exam"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
