import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
    list: ListItem[];
    deleted: ListItem[];
};

type Actions = {
    setList: (items: ListItem[]) => void;
    deleteItem: (id: number) => void;
    revertItem: (id: number) => void;
};

const updateList = (
  state: State,
  id: number,
  sourceList: 'list' | 'deleted',
  targetList: 'list' | 'deleted'
) => {
  const itemToMove = state[sourceList].find((item) => item.id === id);
  if (!itemToMove) return state;

  return {
    ...state,
    [sourceList]: state[sourceList].filter((item) => item.id !== id),
    [targetList]: [...state[targetList], itemToMove],
  };
};

export const useListDataStore = create<State & Actions>((set) => ({
    list: [],
    deleted: [],
    setList: (items) =>
        set((state) => ({
        ...state,
        list: items,
    })),
    deleteItem: (id) =>
      set((state) => updateList(state, id, 'list', 'deleted')),
    revertItem: (id) =>
      set((state) => updateList(state, id, 'deleted', 'list')),
}));
