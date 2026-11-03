export interface ScoreboardEntry {
  id: string;
  userName: string;
  studentId?: string;
  examId?: 'exam-1' | 'exam-2' | string;
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
const CLOUD_KV_TOPIC = 'ccs4505-dip-scoreboard-2026';
const CLOUD_KV_URL = `https://ntfy.sh/${CLOUD_KV_TOPIC}`;

// Baseline peer cohort from CC4505 class
const SEED_ENTRIES: ScoreboardEntry[] = [
  {
    id: "seed-1",
    userName: "Omar Metwally",
    studentId: "20101234",
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
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

function mergeEntries(local: ScoreboardEntry[], incoming: ScoreboardEntry[]): ScoreboardEntry[] {
  const map = new Map<string, ScoreboardEntry>();
  
  // Add seed and local first
  local.forEach(e => map.set(e.id, e));
  
  // Add/overwrite incoming by ID or by same user & timestamp
  incoming.forEach(e => {
    if (!e || !e.userName || e.totalScore === undefined) return;
    map.set(e.id, e);
  });

  return Array.from(map.values()).sort(
    (a, b) => b.totalScore - a.totalScore || a.timeTakenSeconds - b.timeTakenSeconds
  );
}

export function getScoreboard(): ScoreboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return mergeEntries(SEED_ENTRIES, parsed);
      }
    }
  } catch (e) {
    console.error("Failed to load scoreboard from storage", e);
  }
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

/**
 * Broadcast an exam attempt to the Serverless Cloud KV Topic
 */
async function syncToCloudKV(entry: ScoreboardEntry): Promise<void> {
  try {
    await fetch(CLOUD_KV_URL, {
      method: 'POST',
      headers: {
        'Title': 'New Exam Submission',
        'Tags': 'graduation_cap,trophy'
      },
      body: JSON.stringify(entry)
    });
    console.log('✅ Synchronized score to Serverless Cloud KV:', entry.userName);
  } catch (err) {
    console.warn('Could not reach Serverless Cloud KV, score saved locally:', err);
  }
}

/**
 * Fetch all shared student attempts from Serverless Cloud KV
 */
export async function fetchCloudKVScoreboard(): Promise<ScoreboardEntry[]> {
  try {
    const response = await fetch(`${CLOUD_KV_URL}/json?poll=1&since=all`, {
      method: 'GET',
    });
    if (!response.ok) return getScoreboard();

    const text = await response.text();
    const lines = text.trim().split('\n');
    const cloudEntries: ScoreboardEntry[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const payload = JSON.parse(line);
        if (payload.event === 'message' && payload.message) {
          const entry: ScoreboardEntry = typeof payload.message === 'string'
            ? JSON.parse(payload.message)
            : payload.message;
          if (entry && entry.id && entry.userName) {
            cloudEntries.push(entry);
          }
        }
      } catch (parseErr) {
        // Skip unparseable line
      }
    }

    if (cloudEntries.length > 0) {
      const merged = mergeEntries(getScoreboard(), cloudEntries);
      saveScoreboard(merged);
      return merged;
    }
  } catch (err) {
    console.warn('Serverless Cloud KV fetch error:', err);
  }
  return getScoreboard();
}

/**
 * Listen to live real-time score updates via Server-Sent Events (SSE)
 */
export function subscribeToCloudUpdates(onUpdate: (updated: ScoreboardEntry[]) => void): () => void {
  try {
    const eventSource = new EventSource(`${CLOUD_KV_URL}/sse`);
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'message' && data.message) {
          const newEntry: ScoreboardEntry = typeof data.message === 'string'
            ? JSON.parse(data.message)
            : data.message;
          if (newEntry && newEntry.userName && newEntry.totalScore !== undefined) {
            const current = getScoreboard();
            const merged = mergeEntries(current, [newEntry]);
            saveScoreboard(merged);
            onUpdate(merged);
          }
        }
      } catch (e) {
        console.error("Error handling SSE event", e);
      }
    };

    return () => {
      eventSource.close();
    };
  } catch (err) {
    console.warn("SSE not supported or failed to connect", err);
    return () => {};
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
    examId: entry.examId || 'exam-1',
    id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    percentage,
    gradeBadge
  };

  const existing = getScoreboard();
  const updated = mergeEntries(existing, [newEntry]);
  saveScoreboard(updated);

  // Sync to Serverless Cloud KV in the background
  syncToCloudKV(newEntry);

  return newEntry;
}

export function resetScoreboard(): void {
  saveScoreboard(SEED_ENTRIES);
}
