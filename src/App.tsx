import { useState, useEffect } from 'react';
import { 
  TF_QUESTIONS, 
  MCQ_QUESTIONS, 
  ESSAY_QUESTIONS, 
  EXAM_METADATA 
} from './data/examData';
import {
  TF_QUESTIONS_2,
  MCQ_QUESTIONS_2,
  ESSAY_QUESTIONS_2,
  EXAM_METADATA_2
} from './data/mockExam2Data';
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
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ExamProgress {
  tf: Record<string, boolean>;
  mcq: Record<string, 'A' | 'B' | 'C' | 'D'>;
  essay: Record<string, string>;
  essayScores: Record<string, number>;
  bookmarks: Set<string>;
  timeRemaining: number;
  submitted: boolean;
  result: ScoreboardEntry | null;
}

const initialProgress = (timeLimitMinutes: number): ExamProgress => ({
  tf: {},
  mcq: {},
  essay: {},
  essayScores: {},
  bookmarks: new Set(),
  timeRemaining: timeLimitMinutes * 60,
  submitted: false,
  result: null
});

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

  // Active Exam & Navigation
  const [selectedExam, setSelectedExam] = useState<'exam-1' | 'exam-2'>('exam-1');
  const [activeTab, setActiveTab] = useState<'exam' | 'practice' | 'reference' | 'scoreboard'>('exam');
  const [activeExamSection, setActiveExamSection] = useState<'tf' | 'mcq' | 'essay'>('tf');

  // Multi-exam progress state
  const [progressExam1, setProgressExam1] = useState<ExamProgress>(() => initialProgress(EXAM_METADATA.timeLimitMinutes));
  const [progressExam2, setProgressExam2] = useState<ExamProgress>(() => initialProgress(EXAM_METADATA_2.timeLimitMinutes));

  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);

  // Scoreboard entries
  const [scoreboardEntries, setScoreboardEntries] = useState<ScoreboardEntry[]>(() => getScoreboard());

  // Current active exam questions & state
  const currentMetadata = selectedExam === 'exam-1' ? EXAM_METADATA : EXAM_METADATA_2;
  const currentTF = selectedExam === 'exam-1' ? TF_QUESTIONS : TF_QUESTIONS_2;
  const currentMCQ = selectedExam === 'exam-1' ? MCQ_QUESTIONS : MCQ_QUESTIONS_2;
  const currentEssay = selectedExam === 'exam-1' ? ESSAY_QUESTIONS : ESSAY_QUESTIONS_2;

  const currentProgress = selectedExam === 'exam-1' ? progressExam1 : progressExam2;
  const setCurrentProgress = selectedExam === 'exam-1' ? setProgressExam1 : setProgressExam2;

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
    if (currentProgress.submitted || activeTab !== 'exam') return;

    const timer = setInterval(() => {
      setCurrentProgress(prev => {
        if (prev.submitted) return prev;
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentProgress.submitted, activeTab, selectedExam]);

  // Answer handlers
  const handleSelectTF = (id: string, answer: boolean) => {
    setCurrentProgress(prev => ({
      ...prev,
      tf: { ...prev.tf, [id]: answer }
    }));
  };

  const handleSelectMCQ = (id: string, option: 'A' | 'B' | 'C' | 'D') => {
    setCurrentProgress(prev => ({
      ...prev,
      mcq: { ...prev.mcq, [id]: option }
    }));
  };

  const handleUpdateEssay = (id: string, text: string) => {
    setCurrentProgress(prev => ({
      ...prev,
      essay: { ...prev.essay, [id]: text }
    }));
  };

  const handleUpdateEssayScore = (id: string, score: number) => {
    setCurrentProgress(prev => ({
      ...prev,
      essayScores: { ...prev.essayScores, [id]: score }
    }));
  };

  const handleToggleBookmark = (id: string) => {
    setCurrentProgress(prev => {
      const nextBookmarks = new Set(prev.bookmarks);
      if (nextBookmarks.has(id)) nextBookmarks.delete(id);
      else nextBookmarks.add(id);
      return { ...prev, bookmarks: nextBookmarks };
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
    currentTF.forEach(q => {
      if (currentProgress.tf[q.id] === q.correctAnswer) {
        tfScore += 1;
      }
    });

    // 2. Calculate MCQ score
    let mcqScore = 0;
    currentMCQ.forEach(q => {
      if (currentProgress.mcq[q.id] === q.correctOption) {
        mcqScore += 1;
      }
    });

    // 3. Calculate Essay score
    let essayScore = 0;
    currentEssay.forEach(q => {
      const selfScored = currentProgress.essayScores[q.id];
      if (selfScored !== undefined) {
        essayScore += selfScored;
      } else {
        const text = (currentProgress.essay[q.id] || '').toLowerCase();
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
    const timeSpent = (currentMetadata.timeLimitMinutes * 60) - currentProgress.timeRemaining;

    const entry = addScoreEntry({
      userName: currentUser.userName,
      studentId: currentUser.studentId,
      examId: selectedExam,
      mode: activeTab === 'exam' ? 'exam' : 'practice',
      tfScore,
      mcqScore,
      essayScore,
      totalScore,
      timeTakenSeconds: Math.max(30, timeSpent),
    });

    setCurrentProgress(prev => ({
      ...prev,
      submitted: true,
      result: entry
    }));

    setScoreboardEntries(getScoreboard());
    setShowResultsModal(true);
  };

  const handleResetExam = () => {
    if (confirm(`Restart ${currentMetadata.examTitle}? Your answers for this exam will be reset.`)) {
      setCurrentProgress(initialProgress(currentMetadata.timeLimitMinutes));
      setShowResultsModal(false);
    }
  };

  // Progress metrics
  const answeredTF = Object.keys(currentProgress.tf).length;
  const answeredMCQ = Object.keys(currentProgress.mcq).length;
  const answeredEssay = Object.keys(currentProgress.essay).filter(k => (currentProgress.essay[k] || '').trim().length > 0).length;
  const totalAnswered = answeredTF + answeredMCQ + answeredEssay;
  const totalQuestions = currentTF.length + currentMCQ.length + currentEssay.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <ExamHeader
        currentUser={currentUser || { userName: 'Guest Student', studentId: 'N/A' }}
        selectedExam={selectedExam}
        onSelectExam={(exam) => {
          setSelectedExam(exam);
          setActiveExamSection('tf');
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRemainingSeconds={currentProgress.timeRemaining}
        isExamSubmitted={currentProgress.submitted}
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
            <div className={`p-4 sm:p-5 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              selectedExam === 'exam-2'
                ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 shadow-indigo-700/10'
                : 'bg-gradient-to-r from-blue-700 to-indigo-800 shadow-blue-700/10'
            }`}>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-white/20">
                    {activeTab === 'exam' ? 'Exam Simulation' : 'Practice & Study Mode'}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                    {selectedExam === 'exam-1' ? 'Mock 1: Week 04 Practice Sheet' : '⭐ Mock 2: Real Midterm Exam'}
                  </span>
                  <span className="text-xs text-blue-200">
                    {activeTab === 'exam' ? 'Timed 45 Mins • Graded on Submission' : 'Instant Answers & Citations'}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mt-1.5 flex items-center gap-2">
                  <span>{currentMetadata.examTitle}</span>
                  {selectedExam === 'exam-2' && <Sparkles className="w-5 h-5 text-amber-300" />}
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  76 Points Total (30 TF, 16 MCQ, 6 Essay & Calculation) • Verified against Lectures Weeks 01–03.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {currentProgress.submitted && (
                  <button
                    onClick={handleResetExam}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Exam</span>
                  </button>
                )}
                {activeTab === 'exam' && !currentProgress.submitted && (
                  <button
                    onClick={handleSubmitExam}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-md transition-all hover:scale-105"
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
                questions={currentTF}
                userAnswers={currentProgress.tf}
                onSelectAnswer={handleSelectTF}
                showFeedback={activeTab === 'practice' || currentProgress.submitted}
                bookmarkedIds={currentProgress.bookmarks}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {activeExamSection === 'mcq' && (
              <MCQSection
                questions={currentMCQ}
                userAnswers={currentProgress.mcq}
                onSelectOption={handleSelectMCQ}
                showFeedback={activeTab === 'practice' || currentProgress.submitted}
                bookmarkedIds={currentProgress.bookmarks}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {activeExamSection === 'essay' && (
              <EssaySection
                questions={currentEssay}
                userAnswers={currentProgress.essay}
                onUpdateAnswer={handleUpdateEssay}
                essayScores={currentProgress.essayScores}
                onUpdateScore={handleUpdateEssayScore}
                showFeedback={activeTab === 'practice' || currentProgress.submitted}
              />
            )}

            {/* Bottom floating submit trigger */}
            {activeTab === 'exam' && !currentProgress.submitted && (
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
          <ReferenceKeyView 
            selectedExam={selectedExam}
            onSelectExam={setSelectedExam}
          />
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
      {currentProgress.result && (
        <ExamResultsModal
          isOpen={showResultsModal}
          userName={currentProgress.result.userName}
          tfScore={currentProgress.result.tfScore}
          mcqScore={currentProgress.result.mcqScore}
          essayScore={currentProgress.result.essayScore}
          totalScore={currentProgress.result.totalScore}
          percentage={currentProgress.result.percentage}
          timeSpentSeconds={currentProgress.result.timeTakenSeconds}
          gradeBadge={currentProgress.result.gradeBadge}
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
