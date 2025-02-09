import { create } from "zustand";

type State = {
  file_ids: string[];
  uiState: "chat" | "dropzone";
  DropDownOption: DropDownOption;
};

type Action = {
  updateFileIds: (value: string) => void;
  updateUiState: (value: State["uiState"]) => void;
  updateDropDownOption: (key: keyof DropDownOption, value: any) => void;
};

export const useIvyStore = create<State & Action>((set) => ({
  file_ids: [],
  uiState: "dropzone",

  DropDownOption: {
    school_level: null,
    subject: null,
  },

  updateFileIds: (value) => {
    set((state) => ({ file_ids: state.file_ids.concat(value) }));
  },
  updateUiState: (value) => {
    set(() => ({ uiState: value }));
  },

  updateDropDownOption: (key, value) => {
    set((state) => ({
      DropDownOption: { ...state.DropDownOption, [key]: value },
    }));
  },
}));

// Obj Types
type DropDownOption = {
  school_level: string | null;
  subject: string | null;
};
