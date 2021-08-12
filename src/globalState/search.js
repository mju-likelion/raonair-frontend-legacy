import { atom, selector } from 'recoil';

const searchConditionStateKey = 'SEARCH/SEARCH_CONDITION';

export const searchConditionState = atom({
  key: `${searchConditionStateKey}`,
  default: {
    target: 'play',
    // searchTerm: '',
    option: '',
  },
});

export const getSearchOption = selector({
  key: 'search/getSearchOption',
  get: ({ get }) => {
    return get(searchConditionState);
  },
});

// export default { searchConditionState, getSearchOption };
