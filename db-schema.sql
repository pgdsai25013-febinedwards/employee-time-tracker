-- Teams (Ocean, Rock, etc.)
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Users with roles and teams
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'employee', -- 'employee' or 'manager'
  team_id INTEGER REFERENCES teams(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Task templates per team (the dropdown for tasks)
CREATE TABLE task_templates (
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Time logs (includes idle and productive time)
CREATE TABLE time_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  task_template_id INTEGER NOT NULL REFERENCES task_templates(id) ON DELETE CASCADE,
  work_date DATE NOT NULL, -- the logical work date
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,         -- total = ended_at - started_at
  idle_seconds INTEGER DEFAULT 0,   -- time detected as idle
  productive_seconds INTEGER,       -- duration_seconds - idle_seconds
  volume INTEGER DEFAULT 0,
  notes TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes to speed reports
CREATE INDEX idx_time_logs_user_date ON time_logs(user_id, work_date);
CREATE INDEX idx_time_logs_team_date ON time_logs(team_id, work_date);

-- Lock table for monthly sign-off (one record means that team+month is frozen)
CREATE TABLE month_locks (
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,           -- 1 to 12
  locked_by_user_id INTEGER NOT NULL REFERENCES users(id),
  locked_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id, year, month)
);
