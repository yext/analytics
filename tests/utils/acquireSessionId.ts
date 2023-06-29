import { SESSION_ID_KEY, acquireSessionId } from '../../src/utils/acquireSessionId';
import * as ulidLib from 'ulid';

it('returns generated ulid as expected', () => {
  const mockedUlidFn = jest.spyOn(ulidLib, 'ulid').mockReturnValue('mocked-ulid-value');
  const id = acquireSessionId();

  expect(mockedUlidFn).toBeCalledTimes(1);
  expect(id).toEqual('mocked-ulid-value');
});

it('fetches existing ulid from session storage', () => {
  const windowSpy = jest.spyOn(window, 'window', 'get').mockImplementation(() => ({
    sessionStorage: {
      getItem: (key: string) => key === SESSION_ID_KEY ? 'ulid-id-in-session' : null
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any));
  const mockedUlidFn = jest.spyOn(ulidLib, 'ulid').mockReturnValue('mocked-ulid-value');
  const id = acquireSessionId();

  expect(mockedUlidFn).not.toBeCalled();
  expect(id).toEqual('ulid-id-in-session');
  windowSpy.mockRestore();
});

it('returns without error when window is undefined', () => {
  const mockedUlidFn = jest.spyOn(ulidLib, 'ulid').mockReturnValue('mocked-ulid-value');
  // Simulate a node environment where the window is undefined
  const windowSpy = jest.spyOn(window, 'window', 'get');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  windowSpy.mockImplementationOnce(() => undefined as any);
  const id = acquireSessionId();

  expect(mockedUlidFn).not.toBeCalled();
  expect(id).toBeNull();
  windowSpy.mockRestore();
});

it('logs a warning in console when sessionStorage is not accessible', () => {
  const mockedUlidFn = jest.spyOn(ulidLib, 'ulid').mockReturnValue('mocked-ulid-value');
  const windowSpy = jest.spyOn(window, 'window', 'get').mockImplementation(() => ({
    sessionStorage: undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any));
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  const id = acquireSessionId();

  expect(mockedUlidFn).not.toBeCalled();
  expect(id).toBeNull();
  expect(consoleWarnSpy).toBeCalledTimes(1);
  expect(consoleWarnSpy).toBeCalledWith(
    'Unable to use browser sessionStorage for sessionId.\n', expect.anything());
  windowSpy.mockRestore();
});