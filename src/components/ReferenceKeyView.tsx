import React, { useState } from 'react';
import { TF_QUESTIONS, MCQ_QUESTIONS, ESSAY_QUESTIONS, EXAM_METADATA } from '../data/examData';
import { BookOpen, Search, Printer, CheckCircle, HelpCircle, FileText } from 'lucide-react';

export const ReferenceKeyView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState<'all' | 'tf' | 'mcq' | 'essay'>('all');

  const filteredTF = TF_QUESTIONS.filter(q => {
    if (sectionFilter !== 'all' && sectionFilter !== 'tf') return false;
    if (!search) return true;
    const term = search.toLowerCase();
    return q.question.toLowerCase().includes(term) ||
      q.explanation.toLowerCase().includes(term) ||
      q.topic.toLowerCase().includes(term);
  });

  const filteredMCQ = MCQ_QUESTIONS.filter(q => {
    if (sectionFilter !== 'all' && sectionFilter !== 'mcq') return false;
    if (!search) return true;
    const term = search.toLowerCase();
    return q.question.toLowerCase().includes(term) ||
      q.explanation.toLowerCase().includes(term) ||
      q.topic.toLowerCase().includes(term);
  });

  const filteredEssay = ESSAY_QUESTIONS.filter(q => {
    if (sectionFilter !== 'all' && sectionFilter !== 'essay') return false;
    if (!search) return true;
    const term = search.toLowerCase();
    return q.question.toLowerCase().includes(term) ||
      q.modelAnswer.toLowerCase().includes(term) ||
      q.topic.toLowerCase().includes(term);
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Official Lecture Answer Key & Comprehensive Study Guide
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Every question mapped to its corresponding lecture, slide number, verbatim quote, and explanation.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Lectures Summary Card */}
      <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2">
        <div className="text-xs font-bold text-blue-900 dark:text-blue-300">
          Source Material Coverage (AASTMT CCS4505):
        </div>
        <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
          {EXAM_METADATA.lectures.map((lec, i) => (
            <li key={i}><span className="font-medium">{lec}</span></li>
          ))}
        </ul>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 no-print">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keywords (e.g. M-adjacency, 256x256, CCD)..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          {(['all', 'tf', 'mcq', 'essay'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSectionFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors ${
                sectionFilter === s
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {s === 'all' ? 'All (52)' : s === 'tf' ? 'Part I: T/F' : s === 'mcq' ? 'Part II: MCQ' : 'Part III: Essay'}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Display */}
      <div className="space-y-8">
        {/* Section 1: True / False */}
        {(sectionFilter === 'all' || sectionFilter === 'tf') && filteredTF.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Part I: True or False Questions ({filteredTF.length} Questions)</span>
            </h3>

            <div className="space-y-3">
              {filteredTF.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mr-1.5">Q{q.num}.</span>
                      {q.question}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-md font-bold uppercase shrink-0 ${
                      q.correctAnswer
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                    }`}>
                      {q.correctAnswer ? 'TRUE (T)' : 'FALSE (F)'}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Explanation: </strong>
                    {q.explanation}
                  </p>

                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 font-sans">
                      {q.lecture} • Slide {q.slide} ({q.slideTitle})
                    </div>
                    <div className="italic font-sans text-slate-700 dark:text-slate-300 mt-0.5">
                      "{q.quote}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: MCQ */}
        {(sectionFilter === 'all' || sectionFilter === 'mcq') && filteredMCQ.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Part II: Multiple Choice Questions ({filteredMCQ.length} Questions)</span>
            </h3>

            <div className="space-y-3">
              {filteredMCQ.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mr-1.5">Q{q.num}.</span>
                      {q.question}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shrink-0">
                      Option {q.correctOption}: {q.correctText}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
                    {q.options.map((opt) => (
                      <div
                        key={opt.key}
                        className={`p-1.5 rounded-lg border text-center ${
                          opt.key === q.correctOption
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500'
                        }`}
                      >
                        {opt.key}. {opt.text}
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Explanation: </strong>
                    {q.explanation}
                  </p>

                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="font-semibold text-blue-600 dark:text-blue-400 font-sans">
                      {q.lecture} • Slide {q.slide} ({q.slideTitle})
                    </div>
                    <div className="italic font-sans text-slate-700 dark:text-slate-300 mt-0.5">
                      "{q.quote}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Essay */}
        {(sectionFilter === 'all' || sectionFilter === 'essay') && filteredEssay.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Part III: Essay & Problem-Solving Questions ({filteredEssay.length} Questions)</span>
            </h3>

            <div className="space-y-4">
              {filteredEssay.map((q) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      <span className="text-blue-600 dark:text-blue-400 mr-1.5">Q{q.num}.</span>
                      {q.question}
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold">
                      {q.maxPoints} Points
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white mb-2">
                      Official Lecture Solution & Rubric:
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                      {q.modelAnswer}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
