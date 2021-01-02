import {images, SET_IMAGES, DELETE_TOKEN} from './Images';

describe('images reducer', () => {
  it('should handle SET_IMAGES', () => {
    expect(
      images([], {
        type: SET_IMAGES,
        payload: [
          {title: 'title', description: 'description', image: 'image', id: 0},
        ],
      }),
    ).toEqual([
      {title: 'title', description: 'description', image: 'image', id: 0},
    ]);
  });
  it('should handle DELETE_TOKEN', () => {
    expect(
      images(
        [{title: 'title', description: 'description', image: 'image', id: 0}],
        {
          type: DELETE_TOKEN,
        },
      ),
    ).toEqual([]);
  });
});
