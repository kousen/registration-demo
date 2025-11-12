# Contributing

Thank you for your interest in contributing to this project! This document provides guidelines for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/registration-demo.git`
3. Install dependencies: `npm install`
4. Install Playwright browsers: `npx playwright install chromium`
5. Create a branch: `git checkout -b feature/your-feature-name`

## Development

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

**Important:** All tests must pass before submitting a pull request.

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Run `npm run lint` to check for linting errors
- Ensure all new features have corresponding tests

## Submitting Changes

1. Ensure all tests pass: `npm test`
2. Ensure the build succeeds: `npm run build`
3. Commit your changes with clear, descriptive messages
4. Push to your fork: `git push origin feature/your-feature-name`
5. Create a Pull Request on GitHub

## Pull Request Guidelines

- Provide a clear description of what the PR does
- Reference any related issues
- Ensure all CI checks pass
- Keep PRs focused on a single feature or fix

## Questions?

Feel free to open an issue if you have questions or need clarification.

