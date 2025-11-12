import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';

// Configuration from environment variables with defaults
const DB_DIR = process.env.DATABASE_PATH 
  ? path.dirname(process.env.DATABASE_PATH)
  : path.join(process.cwd(), 'data');
const DB_PATH = process.env.DATABASE_PATH 
  ? process.env.DATABASE_PATH
  : path.join(DB_DIR, 'users.db');
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize database
const db = new Database(DB_PATH);

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    registered_at TEXT NOT NULL
  )
`);

// Create index on email for faster lookups
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_email ON users(email)
`);

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  registered_at: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a new user in the database
 */
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<SafeUser> {
  const id = Date.now().toString();
  const passwordHash = await hashPassword(password);
  const registeredAt = new Date().toISOString();

  try {
    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, registered_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, name, email, passwordHash, registeredAt);

    return {
      id,
      name,
      email,
      registeredAt: registeredAt,
    };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw new Error('User with this email already exists');
    }
    throw error;
  }
}

/**
 * Get all users (without password hashes)
 */
export function getAllUsers(): SafeUser[] {
  const users = db.prepare(`
    SELECT id, name, email, registered_at
    FROM users
    ORDER BY registered_at DESC
  `).all() as any[];

  // Transform registered_at to registeredAt for frontend consistency
  return users.map(({ registered_at, ...user }) => ({
    ...user,
    registeredAt: registered_at,
  }));
}

/**
 * Get a user by email
 */
export function getUserByEmail(email: string): User | undefined {
  return db.prepare(`
    SELECT id, name, email, password_hash, registered_at
    FROM users
    WHERE email = ?
  `).get(email) as User | undefined;
}

/**
 * Get a user by ID
 */
export function getUserById(id: string): SafeUser | undefined {
  const user = db.prepare(`
    SELECT id, name, email, registered_at
    FROM users
    WHERE id = ?
  `).get(id) as any;

  if (!user) return undefined;

  return {
    ...user,
    registeredAt: user.registered_at,
  };
}

/**
 * Close the database connection (useful for cleanup in tests)
 */
export function closeDb() {
  db.close();
}

export default db;

