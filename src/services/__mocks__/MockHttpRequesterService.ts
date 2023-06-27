import 'isomorphic-fetch';
import { HttpRequesterService } from '../HttpRequesterService';

export function mockHttpRequesterService(body?: unknown): HttpRequesterService {
  return {
    post: jest.fn(() => Promise.resolve(new Response(JSON.stringify(body)))),
    get: jest.fn(() => Promise.resolve(new Response())),
  };
}

export function mockErrorHttpRequesterService(message: string): HttpRequesterService {
  return {
    post: jest.fn(() => Promise.resolve(new Response(message, { status: 400 }))),
    get: jest.fn(() => Promise.resolve(new Response(message, { status: 400 }))),
  };
}