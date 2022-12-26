// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './msw/server';

// Sets up the default handlers at the beginning of the test run.
beforeAll(() => server.listen());

// Resets back to default handlers after eact test.
afterEach(() => server.resetHandlers());

// Shuts down the server after all tests are completed.
afterAll(() => server.close());
