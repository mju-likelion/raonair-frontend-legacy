import { atom, selector } from 'recoil';

const searchTargetKey = 'SEARCH/SEARCH_TARGET';

export const searchTargetState = atom({
  key: `${searchTargetKey}`,
  default: {
    target: 'play',
    // searchTerm: '',
    option: '',
  },
});

export const getSearchTargetState = selector({
  key: 'search/getSearchOption',
  get: ({ get }) => {
    return get(searchTargetState);
  },
});

// export default { searchConditionState, getSearchOption };
