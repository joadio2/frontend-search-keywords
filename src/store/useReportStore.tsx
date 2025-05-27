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
  loading: boolean;
  title: string;
  report: ReportData | null;
  datosReport: DocumentItem | null;
  setloading: (loading: boolean) => void;
  setTitle: (title: string) => void;
  setDatos: (data: DocumentItem) => void;
  setReport: (report: ReportData) => void;
  clearReport: () => void;
};

export const useReportStore = create<ReportStore>((set) => ({
  loading: false,
  report: null,
  datosReport: null,
  title: "",
  setloading: (l) => set({ loading: l }),
  setTitle: (t) => set({ title: t }),
  setDatos: (data) => set({ datosReport: data }),
  setReport: (report) => set({ report }),
  clearReport: () => set({ report: null }),
}));
