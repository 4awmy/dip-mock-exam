import { useState, useEffect } from 'react';
import { 
  TF_QUESTIONS, 
  MCQ_QUESTIONS, 
  ESSAY_QUESTIONS, 
  EXAM_METADATA 
} from './data/examData';
import { 
  getCurrentUser, 
  getScoreboard, 
  addScoreEntry, 
  fetchCloudKVScoreboard,
  subscribeToCloudUpdates,
  type ScoreboardEntry 
} from './utils/scoreboard';
import { ExamHeader } from './components/ExamHeader';
import { UserModal } from './components/UserModal';
import { TFSection } from './components/TFSection';
import { MCQSection } from './components/MCQSection';
import { EssaySection } from './components/EssaySection';
import { ScoreboardView } from './components/ScoreboardView';
import { ReferenceKeyView } from './components/ReferenceKeyView';
import { ExamResultsModal } from './components/ExamResultsModal';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  FileText,
  Send,
  RotateCcw
} from 'lucide-react';

export function App() {
  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // User Management
  const [currentUser, setUserState] = useState<{ userName: string; studentId: string } | null>(() => getCurrentUser());
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(!currentUser);

  // Tabs & Navigation
  const [activeTab, setActiveTab] = useState<'exam' | 'practice' | 'reference' | 'scoreboard'>('exam');
  const [activeExamSection, setActiveExamSection] = useState<'tf' | 'mcq' | 'essay'>('tf');

  // Exam Progress & State
  const [userTFAnswers, setUserTFAnswers] = useState<Record<string, boolean>>({});
  const [userMCQAnswers, setUserMCQAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [userEssayAnswers, setUserEssayAnswers] = useState<Record<string, string>>({});
  const [essayScores, setEssayScores] = useState<Record<string, number>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Timer
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(EXAM_METADATA.timeLimitMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<ScoreboardEntry | null>(null);

  // Scoreboard
  const [scoreboardEntries, setScoreboardEntries] = useState<ScoreboardEntry[]>(() => getScoreboard());

  // Cloud KV synchronization & real-time live events
  useEffect(() => {
    fetchCloudKVScoreboard().then(updated => {
      setScoreboardEntries(updated);
    });

    const unsubscribe = subscribeToCloudUpdates((incoming) => {
      setScoreboardEntries(incoming);
    });

    return () => unsubscribe();
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isTimerRunning || isExamSubmitted || activeTab !== 'exam') return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isExamSubmitted, activeTab]);

  // Answer handlers
  const handleSelectTF = (id: string, answer: boolean) => {
    setUserTFAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const handleSelectMCQ = (id: string, option: 'A' | 'B' | 'C' | 'D') => {
    setUserMCQAnswers(prev => ({ ...prev, [id]: option }));
  };

  const handleUpdateEssay = (id: string, text: string) => {
    setUserEssayAnswers(prev => ({ ...prev, [id]: text }));
  };

  const handleUpdateEssayScore = (id: string, score: number) => {
    setEssayScores(prev => ({ ...prev, [id]: score }));
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Submit Exam Calculation
  const handleSubmitExam = () => {
    if (!currentUser) {
      setIsUserModalOpen(true);
      return;
    }

    // 1. Calculate TF score
    let tfScore = 0;
    TF_QUESTIONS.forEach(q => {
      if (userTFAnswers[q.id] === q.correctAnswer) {
        tfScore += 1;
      }
    });

    // 2. Calculate MCQ score
    let mcqScore = 0;
    MCQ_QUESTIONS.forEach(q => {
      if (userMCQAnswers[q.id] === q.correctOption) {
        mcqScore += 1;
      }
    });

    // 3. Calculate Essay score
    let essayScore = 0;
    ESSAY_QUESTIONS.forEach(q => {
      const selfScored = essayScores[q.id];
      if (selfScored !== undefined) {
        essayScore += selfScored;
      } else {
        // If student wrote something substantial, award proportionate baseline based on keywords
        const text = (userEssayAnswers[q.id] || '').toLowerCase();
        let matches = 0;
        q.keyPoints.forEach(kp => {
          const words = kp.toLowerCase().split(/\s+/).filter(w => w.length > 4);
          if (words.some(w => text.includes(w))) matches++;
        });
        const autoScore = Math.min(q.maxPoints, Math.round((matches / Math.max(1, q.keyPoints.length)) * q.maxPoints));
        essayScore += autoScore;
      }
    });

    const totalScore = tfScore + mcqScore + essayScore;
    const timeSpent = (EXAM_METADATA.timeLimitMinutes * 60) - timeRemainingSeconds;

    const entry = addScoreEntry({
      userName: currentUser.userName,
      studentId: currentUser.studentId,
      mode: activeTab === 'exam' ? 'exam' : 'practice',
      tfScore,
      mcqScore,
      essayScore,
      totalScore,
      timeTakenSeconds: Math.max(30, timeSpent),
    });

    setSubmissionResult(entry);
    setScoreboardEntries(getScoreboard());
    setIsExamSubmitted(true);
    setIsTimerRunning(false);
    setShowResultsModal(true);
  };

  const handleResetExam = () => {
    if (confirm('Are you sure you want to restart the exam? Your current progress will be reset.')) {
      setUserTFAnswers({});
      setUserMCQAnswers({});
      setUserEssayAnswers({});
      setEssayScores({});
      setBookmarkedIds(new Set());
      setTimeRemainingSeconds(EXAM_METADATA.timeLimitMinutes * 60);
      setIsExamSubmitted(false);
      setIsTimerRunning(true);
      setShowResultsModal(false);
      setSubmissionResult(null);
    }
  };

  // Progress metrics
  const answeredTF = Object.keys(userTFAnswers).length;
  const answeredMCQ = Object.keys(userMCQAnswers).length;
  const answeredEssay = Object.keys(userEssayAnswers).filter(k => (userEssayAnswers[k] || '').trim().length > 0).length;
  const totalAnswered = answeredTF + answeredMCQ + answeredEssay;
  const totalQuestions = TF_QUESTIONS.length + MCQ_QUESTIONS.length + ESSAY_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <ExamHeader
        currentUser={currentUser || { userName: 'Guest Student', studentId: 'N/A' }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRemainingSeconds={timeRemainingSeconds}
        isExamSubmitted={isExamSubmitted}
        onOpenUserModal={() => setIsUserModalOpen(true)}
        onSubmitExam={handleSubmitExam}
        answeredCount={totalAnswered}
        totalQuestions={totalQuestions}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: EXAM SIMULATION OR PRACTICE MODE */}
        {(activeTab === 'exam' || activeTab === 'practice') && (
          <div className="space-y-6">
            {/* Context Notice / Instructions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg shadow-blue-700/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-white/20">
                    {activeTab === 'exam' ? 'Official Simulation Mode' : 'Practice & Study Mode'}
                  </span>
                  <span className="text-xs text-blue-200">
                    {activeTab === 'exam' ? 'Timed 45 Mins • Final Submission Grading' : 'Instant Answer Feedback & Lecture Citations'}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mt-1">
                  Digital Image Processing Comprehensive Mock Exam
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Questions are extracted and verified against course lectures (Weeks 01–03).
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isExamSubmitted && (
                  <button
                    onClick={handleResetExam}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Exam</span>
                  </button>
                )}
                {activeTab === 'exam' && !isExamSubmitted && (
                  <button
                    onClick={handleSubmitExam}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-blue-800 hover:bg-blue-50 font-bold text-xs shadow-md transition-all hover:scale-105"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Score</span>
                  </button>
                )}
              </div>
            </div>

            {/* Exam Section Nav Pills */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveExamSection('tf')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeExamSection === 'tf'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Part I: True / False</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                    {answeredTF} / 30
                  </span>
                </button>

                <button
                  onClick={() => setActiveExamSection('mcq')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeExamSection === 'mcq'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Part II: Multiple Choice</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                    {answeredMCQ} / 16
                  </span>
                </button>

                <button
                  onClick={() => setActiveExamSection('essay')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeExamSection === 'essay'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Part III: Essay & Calculation</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                    {answeredEssay} / 6
                  </span>
                </button>
              </div>

              {/* Status banner */}
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>
                  {activeTab === 'practice'
                    ? 'Practice mode: immediate answers & explanations enabled'
                    : 'Simulation mode: answers scored upon submission'}
                </span>
              </div>
            </div>

            {/* Active Section Content */}
            {activeExamSection === 'tf' && (
              <TFSection
                questions={TF_QUESTIONS}
                userAnswers={userTFAnswers}
                onSelectAnswer={handleSelectTF}
                showFeedback={activeTab === 'practice' || isExamSubmitted}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {activeExamSection === 'mcq' && (
              <MCQSection
                questions={MCQ_QUESTIONS}
                userAnswers={userMCQAnswers}
                onSelectOption={handleSelectMCQ}
                showFeedback={activeTab === 'practice' || isExamSubmitted}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {activeExamSection === 'essay' && (
              <EssaySection
                questions={ESSAY_QUESTIONS}
                userAnswers={userEssayAnswers}
                onUpdateAnswer={handleUpdateEssay}
                essayScores={essayScores}
                onUpdateScore={handleUpdateEssayScore}
                showFeedback={activeTab === 'practice' || isExamSubmitted}
              />
            )}

            {/* Bottom floating submit trigger */}
            {activeTab === 'exam' && !isExamSubmitted && (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Total answered: <strong className="text-slate-900 dark:text-white">{totalAnswered} / {totalQuestions}</strong> questions.
                  {totalAnswered < totalQuestions && (
                    <span className="text-amber-500 ml-1.5">
                      ({totalQuestions - totalAnswered} questions remaining)
                    </span>
                  )}
                </div>

                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Exam Now</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE SCOREBOARD */}
        {activeTab === 'scoreboard' && (
          <ScoreboardView
            entries={scoreboardEntries}
            onTakeExam={() => {
              setActiveTab('exam');
              setActiveExamSection('tf');
            }}
            onRefresh={() => setScoreboardEntries(getScoreboard())}
          />
        )}

        {/* TAB 3: LECTURE REFERENCE & SOLUTION KEY */}
        {activeTab === 'reference' && (
          <ReferenceKeyView />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 text-center no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              CC4505 Digital Image Processing Portal
            </span>
            <span>•</span>
            <span>AASTMT Academic Year 2026/2027</span>
          </div>
          <div>
            Built with React, Vite & Tailwind CSS • Deployed for CC4505 Students
          </div>
        </div>
      </footer>

      {/* User Login/Name Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        currentUser={currentUser}
        onClose={(user) => {
          setUserState(user);
          setIsUserModalOpen(false);
        }}
      />

      {/* Exam Results Modal */}
      {submissionResult && (
        <ExamResultsModal
          isOpen={showResultsModal}
          userName={submissionResult.userName}
          tfScore={submissionResult.tfScore}
          mcqScore={submissionResult.mcqScore}
          essayScore={submissionResult.essayScore}
          totalScore={submissionResult.totalScore}
          percentage={submissionResult.percentage}
          timeSpentSeconds={submissionResult.timeTakenSeconds}
          gradeBadge={submissionResult.gradeBadge}
          onReviewAnswers={() => {
            setShowResultsModal(false);
            setActiveTab('practice');
            setActiveExamSection('tf');
          }}
          onViewScoreboard={() => {
            setShowResultsModal(false);
            setActiveTab('scoreboard');
          }}
          onRetakeExam={handleResetExam}
        />
      )}
    </div>
  );
}

export default App;
