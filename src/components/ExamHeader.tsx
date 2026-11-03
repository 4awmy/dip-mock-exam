import React from 'react';
import { 
  GraduationCap, 
  Timer, 
  UserCheck, 
  Trophy, 
  BookOpen, 
  CheckCircle, 
  HelpCircle,
  Moon,
  Sun,
  Send
} from 'lucide-react';

interface ExamHeaderProps {
  currentUser: { userName: string; studentId: string };
  selectedExam: 'exam-1' | 'exam-2';
  onSelectExam: (exam: 'exam-1' | 'exam-2') => void;
  activeTab: 'exam' | 'practice' | 'reference' | 'scoreboard';
  setActiveTab: (tab: 'exam' | 'practice' | 'reference' | 'scoreboard') => void;
  timeRemainingSeconds: number;
  isExamSubmitted: boolean;
  onOpenUserModal: () => void;
  onSubmitExam: () => void;
  answeredCount: number;
  totalQuestions: number;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  currentUser,
  selectedExam,
  onSelectExam,
  activeTab,
  setActiveTab,
  timeRemainingSeconds,
  isExamSubmitted,
  onOpenUserModal,
  onSubmitExam,
  answeredCount,
  totalQuestions,
  darkMode,
  setDarkMode,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemainingSeconds <= 300 && timeRemainingSeconds > 0; // <= 5 mins

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Brand & User details */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                  CCS4505
                </span>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Digital Image Processing — Mock Exam & Study Portal
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => onSelectExam('exam-1')}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    selectedExam === 'exam-1'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Mock 1: Practice Sheet
                </button>
                <button
                  type="button"
                  onClick={() => onSelectExam('exam-2')}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                    selectedExam === 'exam-2'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>⭐ Mock 2: Real Midterm Exam</span>
                  <span className="px-1 py-0.2 rounded text-[9px] bg-amber-400/30 text-amber-900 dark:text-amber-200 font-extrabold uppercase">New</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* User chip */}
            <button
              onClick={onOpenUserModal}
              title="Click to switch student profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{currentUser.userName}</span>
              {currentUser.studentId && currentUser.studentId !== 'N/A' && (
                <span className="text-[10px] text-slate-400">({currentUser.studentId})</span>
              )}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Timer if in Exam Mode */}
            {activeTab === 'exam' && !isExamSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-colors ${
                isLowTime 
                  ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-300 dark:border-red-800 animate-pulse' 
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
              }`}>
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>
            )}

            {/* Submit button if in Exam Mode */}
            {activeTab === 'exam' && !isExamSubmitted && (
              <button
                onClick={onSubmitExam}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Exam</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom bar: Navigation tabs */}
        <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'exam'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Exam Simulation</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'practice'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Practice & Study Mode</span>
              <span className="px-1.5 py-0.2 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 rounded text-[10px]">
                Instant Answers
              </span>
            </button>

            <button
              onClick={() => setActiveTab('scoreboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'scoreboard'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Live Scoreboard</span>
            </button>

            <button
              onClick={() => setActiveTab('reference')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'reference'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lecture Answer Key (52 Qs)</span>
            </button>
          </nav>

          {/* Progress counter */}
          {(activeTab === 'exam' || activeTab === 'practice') && (
            <div className="hidden sm:flex items-center gap-2 pl-4 text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <span>Answered: </span>
              <span className="font-bold text-slate-900 dark:text-white">{answeredCount} / {totalQuestions}</span>
              <div className="w-20 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
