interface IAuth {
  token: string;
  isLoading: boolean;
}

export const initialState: IAuth = {
  token: '',
  isLoading: true,
};

export const DELETE_TOKEN = 'DELETE_TOKEN';

export const SET_TOKEN = 'SET_TOKEN';

export const SET_TOKEN_FROM_DB = 'SET_TOKEN_FROM_DB';

export const SET_TOKEN_FROM_DB_FAILED = 'SET_TOKEN_FROM_DB_FAILED';

export const ANY = 'ANY';

interface DeleteToken {
  type: typeof DELETE_TOKEN;
}

interface SetToken {
  type: typeof SET_TOKEN;
  payload: string;
}

interface SetTokenFromDB {
  type: typeof SET_TOKEN_FROM_DB;
  payload: string;
}

interface SetTokenFromDBFailed {
  type: typeof SET_TOKEN_FROM_DB_FAILED;
}

export type AuthActions =
  | DeleteToken
  | SetToken
  | SetTokenFromDB
  | SetTokenFromDBFailed;

export const auth = (state = initialState, action: AuthActions): IAuth => {
  switch (action.type) {
    case DELETE_TOKEN:
      return {
        ...state,
        token: '',
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_TOKEN_FROM_DB:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
      };
    case SET_TOKEN_FROM_DB_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
