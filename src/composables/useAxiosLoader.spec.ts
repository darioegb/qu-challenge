/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { Loading } from 'quasar';

// must define this above the `useAxiosLoader` import, otherwise the ReferenceError is raised.
const fn = (
  completed: (config: unknown) => unknown,
  error: (err: unknown) => unknown,
) => undefined;
const mockGetFn = jest.fn();
const mockRequestFn = jest.fn(fn);
const mockResponseFn = jest.fn(fn);

import { useAxiosLoader, useAxios } from './';

jest.mock('axios', () => ({
  get: mockGetFn,
  interceptors: {
    request: {
      use: mockRequestFn,
    },
    response: {
      use: mockResponseFn,
    },
  },
}));

describe('useAxiosLoader', () => {
  const customErrorMockFn = (
    completed: (config: unknown) => unknown,
    error: (err: unknown) => unknown,
  ) => error(new Error('Asyn error'));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when exist http request', async () => {
    const spyShow = jest.spyOn(Loading, 'show');
    const spyHide = jest.spyOn(Loading, 'hide');
    const customMockFn = (
      completed: (config: unknown) => unknown,
      error: (err: unknown) => unknown,
    ) => completed({});
    mockRequestFn.mockImplementationOnce(customMockFn as never);
    mockResponseFn.mockImplementationOnce(customMockFn as never);
    mockGetFn.mockResolvedValueOnce({ data: { results: [] } } as never);
    useAxiosLoader();
    const { exec } = useAxios({
      url: 'test',
      method: 'get',
    });
    await exec();

    expect(spyShow).toHaveBeenCalled();
    expect(spyHide).toHaveBeenCalled();
  });

  it('should return false when http request failed', () => {
    const spyHide = jest.spyOn(Loading, 'hide');
    mockRequestFn.mockImplementationOnce(customErrorMockFn as never);
    try {
      useAxiosLoader();
    } catch (error) {
      expect(error).toBeDefined();
      expect(spyHide).toHaveBeenCalled();
      expect(Loading.isActive).toBeFalsy();
    }
  });

  it('should return false when http response failed', () => {
    const spyHide = jest.spyOn(Loading, 'hide');
    mockResponseFn.mockImplementationOnce(customErrorMockFn as never);
    try {
      useAxiosLoader();
    } catch (error) {
      expect(error).toBeDefined();
      expect(spyHide).toHaveBeenCalled();
      expect(Loading.isActive).toBeFalsy();
    }
  });
});
