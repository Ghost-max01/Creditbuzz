import { Trophy, CheckCircle2, Lock, Zap } from "lucide-react";

interface TaskProgressBarProps {
  completed: number;
  total: number;
  /** compact mode for embedding inside other cards */
  compact?: boolean;
}

const MILESTONES = [10, 20, 30];

export const TaskProgressBar = ({ completed, total, compact = false }: TaskProgressBarProps) => {
  const pct = Math.min((completed / total) * 100, 100);
  const remaining = total - completed;
  const isComplete = completed >= total;

  // colour of the bar fill based on progress
  const barGradient = isComplete
    ? "linear-gradient(90deg, #10b981, #34d399, #6ee7b7)"
    : pct >= 66
    ? "linear-gradient(90deg, #8b5cf6, #10b981)"
    : pct >= 33
    ? "linear-gradient(90deg, #f59e0b, #8b5cf6)"
    : "linear-gradient(90deg, #ef4444, #f59e0b)";

  // glow colour
  const glowColor = isComplete
    ? "rgba(16,185,129,0.5)"
    : pct >= 66
    ? "rgba(139,92,246,0.5)"
    : pct >= 33
    ? "rgba(245,158,11,0.5)"
    : "rgba(239,68,68,0.4)";

  if (compact) {
    return (
      <div className="task-pb-compact">
        <div className="task-pb-compact-row">
          <span className="task-pb-compact-label">
            {isComplete ? "✅ All tasks done!" : `Tasks: ${completed}/${total}`}
          </span>
          <span
            className="task-pb-compact-pct"
            style={{ color: isComplete ? "#10b981" : "#f59e0b" }}
          >
            {Math.round(pct)}%
          </span>
        </div>
        <div className="task-pb-track">
          <div
            className="task-pb-fill"
            style={{
              width: `${pct}%`,
              background: barGradient,
              boxShadow: `0 0 10px ${glowColor}`,
            }}
          />
          {/* milestone markers */}
          {MILESTONES.filter(m => m < total).map(m => (
            <div
              key={m}
              className="task-pb-milestone"
              style={{ left: `${(m / total) * 100}%` }}
              title={`${m} tasks`}
            />
          ))}
        </div>
        <style>{compactStyles}</style>
      </div>
    );
  }

  return (
    <div className="task-pb-root">
      {/* Top row: icon + title + badge */}
      <div className="task-pb-header">
        <div className="task-pb-icon-wrap" style={{ boxShadow: `0 0 20px ${glowColor}` }}>
          {isComplete ? (
            <Trophy className="task-pb-icon" style={{ color: "#10b981" }} />
          ) : (
            <Zap className="task-pb-icon" style={{ color: "#f59e0b" }} />
          )}
        </div>

        <div className="task-pb-title-group">
          <p className="task-pb-title">
            {isComplete ? "All Tasks Completed!" : "Task Progress"}
          </p>
          <p className="task-pb-sub">
            {isComplete
              ? "Withdrawal is now unlocked 🎉"
              : `${remaining} task${remaining !== 1 ? "s" : ""} remaining to unlock withdrawal`}
          </p>
        </div>

        <div
          className="task-pb-pct-badge"
          style={{
            background: isComplete
              ? "rgba(16,185,129,0.15)"
              : "rgba(245,158,11,0.12)",
            border: `1px solid ${isComplete ? "rgba(16,185,129,0.4)" : "rgba(245,158,11,0.3)"}`,
            color: isComplete ? "#10b981" : "#f59e0b",
          }}
        >
          {Math.round(pct)}%
        </div>
      </div>

      {/* Counter row */}
      <div className="task-pb-counter-row">
        <span className="task-pb-done-count" style={{ color: isComplete ? "#10b981" : "#e5e7eb" }}>
          {completed}
        </span>
        <span className="task-pb-sep">/</span>
        <span className="task-pb-total-count">{total}</span>
        <span className="task-pb-tasks-label">tasks completed</span>

        {isComplete && (
          <span className="task-pb-unlock-chip">
            <CheckCircle2 style={{ width: 12, height: 12 }} />
            Withdrawal Unlocked
          </span>
        )}
        {!isComplete && (
          <span className="task-pb-lock-chip">
            <Lock style={{ width: 12, height: 12 }} />
            Locked
          </span>
        )}
      </div>

      {/* Progress bar track */}
      <div className="task-pb-track-wrap">
        <div className="task-pb-track-bg">
          <div
            className="task-pb-track-fill"
            style={{
              width: `${pct}%`,
              background: barGradient,
              boxShadow: `0 0 16px ${glowColor}, 0 0 6px ${glowColor}`,
              transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {/* animated shimmer */}
            <div className="task-pb-shimmer" />
          </div>

          {/* milestone ticks */}
          {MILESTONES.filter(m => m < total).map(m => {
            const reached = completed >= m;
            return (
              <div
                key={m}
                className="task-pb-tick"
                style={{ left: `calc(${(m / total) * 100}% - 1px)` }}
                title={`Milestone: ${m}`}
              />
            );
          })}
        </div>

        {/* milestone labels */}
        <div className="task-pb-milestone-labels">
          {MILESTONES.map(m => {
            const reached = completed >= m;
            return (
              <div
                key={m}
                className="task-pb-milestone-label"
                style={{ left: `${(m / total) * 100}%` }}
              >
                <span
                  style={{
                    color: reached ? "#10b981" : "rgba(255,255,255,0.3)",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {m}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot grid */}
      <div className="task-pb-dots">
        {Array.from({ length: total }).map((_, i) => {
          const done = i < completed;
          const isLast = i === total - 1;
          return (
            <div
              key={i}
              className="task-pb-dot"
              style={{
                background: done
                  ? isLast
                    ? "linear-gradient(135deg, #10b981, #6ee7b7)"
                    : barGradient
                  : "rgba(255,255,255,0.08)",
                boxShadow: done ? `0 0 6px ${glowColor}` : "none",
                border: done ? "none" : "1px solid rgba(255,255,255,0.1)",
                transform: done && isLast ? "scale(1.3)" : done ? "scale(1.05)" : "scale(1)",
              }}
            />
          );
        })}
      </div>

      <style>{fullStyles}</style>
    </div>
  );
};

// ─── compact styles ────────────────────────────────────────────────────────
const compactStyles = `
.task-pb-compact { width: 100%; }
.task-pb-compact-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.task-pb-compact-label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.75); }
.task-pb-compact-pct { font-size: 12px; font-weight: 800; }
.task-pb-track { position: relative; width: 100%; height: 8px; background: rgba(255,255,255,0.07); border-radius: 99px; overflow: visible; }
.task-pb-fill { height: 100%; border-radius: 99px; transition: width 0.6s cubic-bezier(0.34,1.56,0.64,1); }
.task-pb-milestone { position: absolute; top: -2px; width: 3px; height: 12px; background: rgba(255,255,255,0.25); border-radius: 2px; transform: translateX(-50%); }
`;

// ─── full styles ───────────────────────────────────────────────────────────
const fullStyles = `
.task-pb-root {
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 20px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
}

.task-pb-root::before {
  content: '';
  position: absolute;
  top: -40px; right: -40px;
  width: 120px; height: 120px;
  background: radial-gradient(circle, rgba(139,92,246,0.14), transparent);
  border-radius: 50%;
  pointer-events: none;
}

.task-pb-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-pb-icon-wrap {
  width: 42px; height: 42px;
  border-radius: 13px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.task-pb-icon { width: 20px; height: 20px; }

.task-pb-title-group { flex: 1; min-width: 0; }
.task-pb-title { font-size: 14px; font-weight: 800; color: white; margin-bottom: 2px; }
.task-pb-sub { font-size: 11px; color: rgba(255,255,255,0.45); line-height: 1.4; }

.task-pb-pct-badge {
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 900;
  flex-shrink: 0;
  letter-spacing: -0.5px;
}

.task-pb-counter-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-wrap: wrap;
}

.task-pb-done-count { font-size: 28px; font-weight: 900; line-height: 1; letter-spacing: -1px; }
.task-pb-sep { font-size: 18px; font-weight: 400; color: rgba(255,255,255,0.3); }
.task-pb-total-count { font-size: 18px; font-weight: 700; color: rgba(255,255,255,0.5); }
.task-pb-tasks-label { font-size: 11px; color: rgba(255,255,255,0.35); margin-left: 6px; align-self: center; }

.task-pb-unlock-chip {
  margin-left: auto;
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 700;
  color: #10b981;
  background: rgba(16,185,129,0.12);
  border: 1px solid rgba(16,185,129,0.3);
  border-radius: 99px;
  padding: 3px 10px;
  white-space: nowrap;
}

.task-pb-lock-chip {
  margin-left: auto;
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 10px; font-weight: 700;
  color: rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 99px;
  padding: 3px 10px;
  white-space: nowrap;
}

.task-pb-track-wrap { display: flex; flex-direction: column; gap: 6px; }

.task-pb-track-bg {
  position: relative;
  width: 100%;
  height: 10px;
  background: rgba(255,255,255,0.07);
  border-radius: 99px;
  overflow: visible;
}

.task-pb-track-fill {
  height: 100%;
  border-radius: 99px;
  position: relative;
  overflow: hidden;
  min-width: 4px;
}

.task-pb-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: task-pb-shimmer-anim 2s linear infinite;
}

@keyframes task-pb-shimmer-anim {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.task-pb-tick {
  position: absolute;
  top: -3px;
  width: 2px;
  height: 16px;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
}

.task-pb-milestone-labels {
  position: relative;
  height: 14px;
}

.task-pb-milestone-label {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-pb-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.task-pb-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
`;
