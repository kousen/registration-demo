This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## User Registration Demo

A simple user registration application built with Next.js, React, TypeScript, and Tailwind CSS. Features include:

- User registration form with validation
- Real-time form validation (email format, password matching, required fields)
- User list display
- **SQLite database** for persistent storage
- **Password hashing** with bcrypt for security
- Responsive design

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Running Tests

This project includes comprehensive Playwright UI tests. To run the tests:

```bash
# Run all tests
npm test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

### Test Coverage

The test suite includes:

- ✅ Form display and layout verification
- ✅ Empty form validation
- ✅ Email format validation
- ✅ Password length validation
- ✅ Password confirmation matching
- ✅ Successful user registration
- ✅ Duplicate email prevention
- ✅ Form field clearing after submission
- ✅ User list updates after registration
- ✅ Responsive design testing
- ✅ Error message display and clearing

### Installing Playwright Browsers

If you need to install Playwright browsers for the first time:

```bash
npx playwright install
```

Or install only Chromium:

```bash
npx playwright install chromium
```

## Database

This application uses **SQLite** for data storage. The database file (`users.db`) is automatically created in the `/data` directory when the application first runs.

### Database Schema

- **users** table:
  - `id` (TEXT, PRIMARY KEY)
  - `name` (TEXT, NOT NULL)
  - `email` (TEXT, UNIQUE, NOT NULL)
  - `password_hash` (TEXT, NOT NULL) - Passwords are hashed using bcrypt
  - `registered_at` (TEXT, NOT NULL) - ISO 8601 timestamp

### Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds before storage
- **Email Uniqueness**: Database enforces unique email addresses
- **Input Validation**: Server-side validation for all user inputs
- **No Plain Text Passwords**: Passwords are never stored in plain text

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (better-sqlite3)
- **Password Security**: bcrypt
- **Testing**: Playwright

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
