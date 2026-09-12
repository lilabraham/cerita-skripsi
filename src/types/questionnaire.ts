// src/types/questionnaire.ts

export type JenisKelamin = "L" | "P";

export type JawabanBS = "B" | "S";
export type JawabanSikap = "SS" | "S" | "TS" | "STS";

export type Kelas = "XI 1" | "XI 2" | "XI 5";

export interface DataDiri {
  nama: string;
  jenisKelamin: JenisKelamin | "";
  kelas: Kelas | "";
}

export interface FormState {
  currentStep: number;
  direction: 1 | -1;
  dataDiri: DataDiri;
  pengetahuan: Partial<Record<string, JawabanBS>>;
  sikap: Partial<Record<string, JawabanSikap>>;
}

export type FormAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "HYDRATE"; payload: FormState }
  | { type: "SET_DATA_DIRI"; payload: Partial<DataDiri> }
  | { type: "SET_PENGETAHUAN"; payload: { key: string; value: JawabanBS } }
  | { type: "SET_SIKAP"; payload: { key: string; value: JawabanSikap } }
  | { type: "RESET" };

export interface PengetahuanItem {
  id: string;
  no: number;
  pertanyaan: string;
  kunciJawaban: JawabanBS;
}

export interface SikapItem {
  id: string;
  no: number;
  pertanyaan: string;
  arahScoring: "favorable" | "unfavorable";
}

export interface StepMeta {
  label: string;
  section: "intro" | "identitas" | "pengetahuan" | "sikap" | "konfirmasi";
}

export interface SubmissionPayload {
  dataDiri: DataDiri;
  pengetahuan: Record<string, JawabanBS>;
  sikap: Record<string, JawabanSikap>;
}