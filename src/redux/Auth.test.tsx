import {
  auth,
  DELETE_TOKEN,
  SET_TOKEN,
  SET_TOKEN_FROM_DB,
  SET_TOKEN_FROM_DB_FAILED,
} from './Auth';

describe('auth reducer', () => {
  it('should handle SET_TOKEN', () => {
    expect(
      auth(
        {
          token: '',
          isLoading: true,
        },
        {
          type: SET_TOKEN,
          payload: 'dummytoken',
        },
      ),
    ).toEqual({
      token: 'dummytoken',
      isLoading: true,
    });
  });
  it('should handle DELETE_TOKEN', () => {
    expect(
      auth(
        {
          token: 'dummytoken',
          isLoading: false,
        },
        {
          type: DELETE_TOKEN,
        },
      ),
    ).toEqual({
      token: '',
      isLoading: false,
    });
  });
  it('should handle SET_TOKEN_FROM_DB', () => {
    expect(
      auth(
        {
          token: '',
          isLoading: true,
        },
        {
          type: SET_TOKEN_FROM_DB,
          payload: 'dummytoken',
        },
      ),
    ).toEqual({
      token: 'dummytoken',
      isLoading: false,
    });
  });
  it('should handle SET_TOKEN_FROM_DB_FAILED', () => {
    expect(
      auth(
        {
          token: '',
          isLoading: true,
        },
        {
          type: SET_TOKEN_FROM_DB_FAILED,
        },
      ),
    ).toEqual({
      token: '',
      isLoading: false,
    });
  });
});
