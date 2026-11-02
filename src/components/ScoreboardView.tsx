import React, { useState } from 'react';
import type { ScoreboardEntry } from '../utils/scoreboard';
import { resetScoreboard } from '../utils/scoreboard';
import { Trophy, Search, RefreshCw, Play, Clock } from 'lucide-react';

interface ScoreboardViewProps {
  entries: ScoreboardEntry[];
  onTakeExam: () => void;
  onRefresh: () => void;
}

export const ScoreboardView: React.FC<ScoreboardViewProps> = ({
  entries,
  onTakeExam,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'exam' | 'practice'>('all');

  const filtered = entries.filter((entry) => {
    const matchName = entry.userName.toLowerCase().includes(search.toLowerCase()) ||
      (entry.studentId && entry.studentId.includes(search));
    const matchMode = filterMode === 'all' || entry.mode === filterMode;
    return matchName && matchMode;
  });

  const avgScore = entries.length > 0 
    ? Math.round(entries.reduce((acc, cur) => acc + cur.totalScore, 0) / entries.length) 
    : 0;
  const highScore = entries.length > 0 
    ? Math.max(...entries.map(e => e.totalScore)) 
    : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const handleReset = () => {
    if (confirm('Reset scoreboard back to default cohort baseline?')) {
      resetScoreboard();
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              DIP Class Scoreboard & Rankings
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time rankings for CC4505 Digital Image Processing students based on 76 total points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTakeExam}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Take Exam Now</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset to cohort baseline"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-900/50">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Total Attempts</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {entries.length} Submissions
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-900/50">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Class High Score</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {highScore} <span className="text-xs font-normal text-slate-500">/ 76 ({Math.round((highScore / 76) * 100)}%)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-900/50">
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">Average Score</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {avgScore} <span className="text-xs font-normal text-slate-500">/ 76 ({Math.round((avgScore / 76) * 100)}%)</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or ID..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          {(['all', 'exam', 'practice'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setFilterMode(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterMode === m
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-[11px] text-slate-500 dark:text-slate-400">
            <tr>
              <th className="py-3.5 px-4 w-16">Rank</th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-3">Mode</th>
              <th className="py-3.5 px-3">TF (30)</th>
              <th className="py-3.5 px-3">MCQ (16)</th>
              <th className="py-3.5 px-3">Essay (30)</th>
              <th className="py-3.5 px-4">Total Score</th>
              <th className="py-3.5 px-3">Time</th>
              <th className="py-3.5 px-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.map((entry, idx) => {
              const isTop3 = idx < 3;
              let rankBadge = `${idx + 1}`;
              if (idx === 0) rankBadge = '🥇 #1';
              else if (idx === 1) rankBadge = '🥈 #2';
              else if (idx === 2) rankBadge = '🥉 #3';

              return (
                <tr
                  key={entry.id}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                    isTop3 ? 'font-medium' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs ${
                      idx === 0
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                        : idx === 1
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : idx === 2
                        ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {rankBadge}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{entry.userName}</span>
                      {idx === 0 && <span title="Top Scorer">👑</span>}
                    </div>
                    {entry.studentId && entry.studentId !== 'N/A' && (
                      <div className="text-[10px] text-slate-400">ID: {entry.studentId}</div>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      entry.mode === 'exam'
                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                        : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                    }`}>
                      {entry.mode}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-medium">{entry.tfScore}</td>
                  <td className="py-3.5 px-3 font-mono font-medium">{entry.mcqScore}</td>
                  <td className="py-3.5 px-3 font-mono font-medium">{entry.essayScore}</td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {entry.totalScore} <span className="text-xs text-slate-400">/ 76</span>
                      </span>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        ({entry.percentage}%)
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {entry.gradeBadge}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-3">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{formatTime(entry.timeTakenSeconds)}</span>
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-slate-400">
                    {new Date(entry.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            No entries found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
