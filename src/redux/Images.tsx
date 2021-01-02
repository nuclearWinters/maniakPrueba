import {IImage} from '../screens/Loading';

export const initialState: IImage[] = [];

export const SET_IMAGES = 'SET_IMAGES';

interface SetImages {
  type: typeof SET_IMAGES;
  payload: IImage[];
}

export const DELETE_TOKEN = 'DELETE_TOKEN';

interface DeleteImages {
  type: typeof DELETE_TOKEN;
}

export type ImagesActions = SetImages | DeleteImages;

export const images = (
  state = initialState,
  action: ImagesActions,
): IImage[] => {
  switch (action.type) {
    case SET_IMAGES:
      return action.payload;
    case DELETE_TOKEN:
      return [];
    default:
      return state;
  }
};
