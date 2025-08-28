// src/types.ts
export type Gender = "male" | "female" | "";

export interface FormData {
  gender: Gender;
  bodyFatPercent: number;
  BMI: number;
  calorieTarget: number;
  waterIntake: number;
  weightLossRate: number;
  seeResultsDays: number;
}

export interface CardDataItem {
  title: string;
  headline: string;
  copy: string;
  callout: string;
  image: string;
}
