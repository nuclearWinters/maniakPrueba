import {combineReducers} from 'redux';
import {auth} from './Auth';
import {images} from './Images';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {createStore} from 'redux';

const rootReducer = combineReducers({
  auth,
  images,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
