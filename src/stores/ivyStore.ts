import { create } from "zustand";

type State = {
  uiState: "chat" | "dropzone";
  DropDownOption: DropDownOption;
  uploadedFiles: UploadedFile[];
};

type Action = {
  updateUiState: (value: State["uiState"]) => void;
  updateDropDownOption: (key: keyof DropDownOption, value: any) => void;
  addUploadedFile: (file: UploadedFile) => void;
  removeUploadedFile: (fileId: string) => void;
  updateUploadedFile: (fileId: string, updates: Partial<UploadedFile>) => void;
  clearUploadedFiles: () => void;
  getUploadedFiles: () => UploadedFile[];
};

export const useIvyStore = create<State & Action>((set, get) => ({
  uiState: "dropzone",

  DropDownOption: {
    school_level: null,
    subject: null,
  },

  uploadedFiles: [],

  updateUiState: (value) => {
    set(() => ({ uiState: value }));
  },

  updateDropDownOption: (key, value) => {
    set((state) => ({
      DropDownOption: { ...state.DropDownOption, [key]: value },
    }));
  },

  addUploadedFile: (file) => {
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, file],
    }));
  },

  removeUploadedFile: (fileId) => {
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((file) => file.id !== fileId),
    }));
  },

  updateUploadedFile: (fileId, updates) => {
    set((state) => ({
      uploadedFiles: state.uploadedFiles.map((file) =>
        file.id === fileId ? { ...file, ...updates } : file
      ),
    }));
  },

  clearUploadedFiles: () => {
    set(() => ({ uploadedFiles: [] }));
  },

  getUploadedFiles: () => {
    return get().uploadedFiles;
  },
}));

// Obj Types
type DropDownOption = {
  school_level: string | null;
  subject: string | null;
};

export type UploadedFile = {
  name: string;
  id: string;
  isUploading?: boolean;
};

// Helper function to get only the uploaded files from the store
export const getUploadedFilesFromStore = (): UploadedFile[] => {
  return useIvyStore.getState().uploadedFiles;
};
