import { create } from "zustand";

type MatchItem = {
  id: string;
  snippet: string;
  keywords: string[];
  total: number;
  score: number;
};

type DocumentItem = {
  url: string;
  typeDocument: string;
  match: {
    typeDocument: string;

    data: {
      results: MatchItem[];
    };
    htmlDoc?: string | undefined;
  };
};

type ReportData = {
  data: DocumentItem[];
  title: string;
  userId: string;
  reportType: string;
  keywords: string[];
  tags: string[];
};

type ReportStore = {
  report: ReportData | null;
  datosReport: DocumentItem | null;
  setDatos: (data: DocumentItem) => void;
  setReport: (report: ReportData) => void;
  clearReport: () => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  report: null,
  datosReport: null,
  setDatos: (data) => set({ datosReport: data }),
  setReport: (report) => set({ report }),
  clearReport: () => set({ report: null }),
}));
