-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create problems table
CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  acceptance TEXT DEFAULT '0%',
  submission_count TEXT DEFAULT '0',
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT NOT NULL,
  is_custom BOOLEAN DEFAULT false,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Create examples table
CREATE TABLE IF NOT EXISTS examples (
  id SERIAL PRIMARY KEY,
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  explanation TEXT NOT NULL,
  problem_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

-- Create constraints table
CREATE TABLE IF NOT EXISTS constraints (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  problem_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

-- Create test_cases table
CREATE TABLE IF NOT EXISTS test_cases (
  id SERIAL PRIMARY KEY,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  problem_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  execution_time INTEGER,
  memory_used INTEGER,
  passed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id TEXT NOT NULL,
  problem_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

-- Insert a test user
INSERT INTO users (id, email, username, password) 
VALUES ('test-user-1', 'test@example.com', 'testuser', 'hashedpassword123')
ON CONFLICT (email) DO NOTHING;

-- Insert a test problem
INSERT INTO problems (id, title, description, difficulty, category, acceptance, submission_count, likes, dislikes, created_by, is_custom)
VALUES (
  1,
  'Two Sum',
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  'Easy',
  'Array',
  '85%',
  '2.1M',
  1500,
  50,
  'test-user-1',
  false
) ON CONFLICT (id) DO NOTHING;

-- Insert examples for the test problem
INSERT INTO examples (input, output, explanation, problem_id)
VALUES 
  ('nums = [2,7,11,15], target = 9', '[0,1]', 'Because nums[0] + nums[1] == 9, we return [0, 1].', 1),
  ('nums = [3,2,4], target = 6', '[1,2]', 'Because nums[1] + nums[2] == 6, we return [1, 2].', 1)
ON CONFLICT DO NOTHING;

-- Insert constraints for the test problem
INSERT INTO constraints (text, problem_id)
VALUES 
  ('2 <= nums.length <= 104', 1),
  ('-109 <= nums[i] <= 109', 1),
  ('-109 <= target <= 109', 1)
ON CONFLICT DO NOTHING;

-- Insert test cases for the test problem
INSERT INTO test_cases (input, expected_output, problem_id)
VALUES 
  ('[2,7,11,15]', '[0,1]', 1),
  ('[3,2,4]', '[1,2]', 1),
  ('[3,3]', '[0,1]', 1)
ON CONFLICT DO NOTHING; 