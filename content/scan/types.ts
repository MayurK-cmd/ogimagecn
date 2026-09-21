import type { ReactNode } from "react";

export interface ScanFaq {
  answer: string;
  question: string;
}

export interface ScanSection {
  body: ReactNode;
  heading: string;
}
