import React from 'react';
import type { TrueFalseQuestion } from '../data/examData';
import { CheckCircle2, XCircle, BookOpen, Bookmark, Lightbulb } from 'lucide-react';

interface TFSectionProps {
  questions: TrueFalseQuestion[];
  userAnswers: Record<string, boolean>;
  onSelectAnswer: (id: string, answer: boolean) => void;
  showFeedback: boolean; // true in Practice Mode or after Exam Submission
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
}

export const TFSection: React.FC<TFSectionProps> = ({
  questions,
  userAnswers,
  onSelectAnswer,
  showFeedback,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Part I: True or False Questions</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
              30 Questions • 30 Points
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mark whether each of the following statements is True (T) or False (F).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {questions.map((q) => {
          const selected = userAnswers[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctAnswer;
          const isBookmarked = bookmarkedIds.has(q.id);

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                showFeedback && hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                    Q{q.num}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {q.topic}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {q.lecture}
                  </span>
                </div>

                <button
                  onClick={() => onToggleBookmark(q.id)}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark for review"}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed mb-4">
                {q.question}
              </p>

              {/* Selection Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectAnswer(q.id, true)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selected === true
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>TRUE (T)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectAnswer(q.id, false)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selected === false
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>FALSE (F)</span>
                </button>

                {showFeedback && hasAnswered && (
                  <div className="ml-auto flex items-center gap-1.5 text-xs font-bold">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Correct (+1)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                        <XCircle className="w-4 h-4" /> Incorrect (Key: {q.correctAnswer ? 'TRUE' : 'FALSE'})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Explanations & Lecture Citations */}
              {showFeedback && (hasAnswered || selected !== undefined) && (
                <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 font-mono text-[11px]">
                    <BookOpen className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-blue-600 dark:text-blue-400 font-sans text-xs">
                        {q.lecture} • Slide {q.slide} ({q.slideTitle})
                      </div>
                      <p className="mt-1 italic font-sans text-xs text-slate-700 dark:text-slate-300">
                        "{q.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
