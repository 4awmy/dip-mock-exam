export interface ScoreboardEntry {
  id: string;
  userName: string;
  studentId?: string;
  timestamp: number;
  mode: 'exam' | 'practice';
  tfScore: number;
  mcqScore: number;
  essayScore: number;
  totalScore: number;
  percentage: number;
  timeTakenSeconds: number;
  gradeBadge: string;
}

const STORAGE_KEY = 'dip_mock_exam_scoreboard_v1';
const CURRENT_USER_KEY = 'dip_mock_exam_user_v1';

// Initial preloaded peer cohort from AASTMT DIP class to make the scoreboard lively!
const SEED_ENTRIES: ScoreboardEntry[] = [
  {
    id: "seed-1",
    userName: "Omar Metwally",
    studentId: "20101234",
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    mode: "exam",
    tfScore: 30,
    mcqScore: 16,
    essayScore: 29,
    totalScore: 75,
    percentage: 98.7,
    timeTakenSeconds: 1540,
    gradeBadge: "Distinction (A+)"
  },
  {
    id: "seed-2",
    userName: "Nouran Ahmed",
    studentId: "20101456",
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
    mode: "exam",
    tfScore: 29,
    mcqScore: 15,
    essayScore: 28,
    totalScore: 72,
    percentage: 94.7,
    timeTakenSeconds: 1820,
    gradeBadge: "Distinction (A+)"
  },
  {
    id: "seed-3",
    userName: "Youssef Ibrahim",
    studentId: "20101567",
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    mode: "exam",
    tfScore: 28,
    mcqScore: 15,
    essayScore: 26,
    totalScore: 69,
    percentage: 90.8,
    timeTakenSeconds: 2100,
    gradeBadge: "Excellent (A)"
  },
  {
    id: "seed-4",
    userName: "Mariam Khaled",
    studentId: "20101890",
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    mode: "exam",
    tfScore: 27,
    mcqScore: 14,
    essayScore: 25,
    totalScore: 66,
    percentage: 86.8,
    timeTakenSeconds: 2310,
    gradeBadge: "Very Good (B+)"
  },
  {
    id: "seed-5",
    userName: "Karim Hassan",
    studentId: "20101999",
    timestamp: Date.now() - 1000 * 60 * 60 * 36,
    mode: "exam",
    tfScore: 26,
    mcqScore: 13,
    essayScore: 24,
    totalScore: 63,
    percentage: 82.9,
    timeTakenSeconds: 2450,
    gradeBadge: "Very Good (B)"
  }
];

export function getCurrentUser(): { userName: string; studentId: string } | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read user", e);
  }
  return null;
}

export function setCurrentUser(user: { userName: string; studentId: string }): void {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user", e);
  }
}

export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (e) {
    console.error("Failed to clear user", e);
  }
}

export function getScoreboard(): ScoreboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.sort((a, b) => b.totalScore - a.totalScore || a.timeTakenSeconds - b.timeTakenSeconds);
      }
    }
  } catch (e) {
    console.error("Failed to load scoreboard", e);
  }
  // Initialize with seed entries
  saveScoreboard(SEED_ENTRIES);
  return SEED_ENTRIES;
}

export function saveScoreboard(entries: ScoreboardEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Failed to save scoreboard", e);
  }
}

export function addScoreEntry(entry: Omit<ScoreboardEntry, 'id' | 'timestamp' | 'percentage' | 'gradeBadge'>): ScoreboardEntry {
  const percentage = Math.round((entry.totalScore / 76) * 1000) / 10;
  let gradeBadge = "Needs Review (F)";
  if (percentage >= 95) gradeBadge = "Distinction (A+)";
  else if (percentage >= 90) gradeBadge = "Excellent (A)";
  else if (percentage >= 85) gradeBadge = "Very Good (B+)";
  else if (percentage >= 80) gradeBadge = "Very Good (B)";
  else if (percentage >= 75) gradeBadge = "Good (C+)";
  else if (percentage >= 65) gradeBadge = "Passing (C)";
  else if (percentage >= 60) gradeBadge = "Satisfactory (D)";

  const newEntry: ScoreboardEntry = {
    ...entry,
    id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    percentage,
    gradeBadge
  };

  const existing = getScoreboard();
  const updated = [newEntry, ...existing].sort((a, b) => b.totalScore - a.totalScore || a.timeTakenSeconds - b.timeTakenSeconds);
  saveScoreboard(updated);
  return newEntry;
}

export function resetScoreboard(): void {
  saveScoreboard(SEED_ENTRIES);
}
