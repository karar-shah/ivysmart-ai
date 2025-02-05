import { create } from "zustand";

type State = {
  uiState: "chat" | "dropzone";
  DropDownOption: DropDownOption;
};

type Action = {
  updateUiState: (value: State["uiState"]) => void;
  updateDropDownOption: (key: keyof DropDownOption, value: any) => void;
};

export const useIvyStore = create<State & Action>((set) => ({
  uiState: "dropzone",

  DropDownOption: {
    school_level: null,
    subject: null,
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
