import React, { useState } from 'react';
import type { EssayQuestion } from '../data/examData';
import { BookOpen, CheckSquare, ChevronDown, ChevronUp, Award, PenLine } from 'lucide-react';

interface EssaySectionProps {
  questions: EssayQuestion[];
  userAnswers: Record<string, string>;
  onUpdateAnswer: (id: string, text: string) => void;
  essayScores: Record<string, number>;
  onUpdateScore: (id: string, score: number) => void;
  showFeedback: boolean;
}

export const EssaySection: React.FC<EssaySectionProps> = ({
  questions,
  userAnswers,
  onUpdateAnswer,
  essayScores,
  onUpdateScore,
  showFeedback,
}) => {
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setExpandedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Part III: Essay & Problem-Solving Questions</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
              6 Questions • 30 Points Total
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Answer the following questions thoroughly. You can grade your answers against the official lecture model answers and rubrics.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q) => {
          const currentAnswer = userAnswers[q.id] || '';
          const currentScore = essayScores[q.id] ?? 0;
          const isExpanded = expandedSolutions[q.id] || showFeedback;

          return (
            <div
              key={q.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    Q{q.num}
                  </span>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50">
                    {q.maxPoints} Points
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {q.topic} • {q.lecture}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Self-Score:</span>
                  <select
                    value={currentScore}
                    onChange={(e) => onUpdateScore(q.id, Number(e.target.value))}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white"
                  >
                    {Array.from({ length: q.maxPoints + 1 }, (_, i) => (
                      <option key={i} value={i}>
                        {i} / {q.maxPoints} pts
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
                {q.question}
              </h3>

              {/* Student response textarea */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <PenLine className="w-3.5 h-3.5" /> Your Written Response:
                  </span>
                  <span>{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                </div>
                <textarea
                  value={currentAnswer}
                  onChange={(e) => onUpdateAnswer(q.id, e.target.value)}
                  placeholder="Type your explanation, formulas, and derivations here..."
                  rows={4}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
                />
              </div>

              {/* Toggle Model Answer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleSolution(q.id)}
                  className="flex items-center justify-between w-full py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{isExpanded ? 'Hide Official Lecture Model Solution' : 'Reveal Official Lecture Model Solution & Rubric'}</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-4 animate-in fade-in duration-200">
                    {/* Rubric Breakdown */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                        <Award className="w-4 h-4" />
                        <span>Official Grading Rubric ({q.maxPoints} pts total):</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.rubric.map((r, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                            <CheckSquare className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span>
                              {r.criteria} <strong className="text-amber-700 dark:text-amber-400">({r.points} pt)</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Model Answer */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-2">
                        <span>Lecture Model Answer:</span>
                        <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                          {q.lecture} • Slides {q.slides.join(', ')}
                        </span>
                      </div>
                      <pre className="text-xs font-sans whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                        {q.modelAnswer}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
