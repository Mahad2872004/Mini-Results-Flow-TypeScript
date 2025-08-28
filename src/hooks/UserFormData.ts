// src/shared/hooks/useFormData.ts
import { useState, useEffect } from "react";
import type { FormData } from "../types/types";

const defaultFormData: FormData = {
  gender: "",
  bodyFatPercent: 0,
  BMI: 0,
  calorieTarget: 0,
  waterIntake: 0,
  weightLossRate: 0,
  seeResultsDays: 0,
};

export function useFormData() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem("formData");
    return saved ? (JSON.parse(saved) as FormData) : defaultFormData;
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const resetForm = () => {
    setFormData(defaultFormData);
    localStorage.removeItem("formData");
  };

  return { formData, setFormData, resetForm };
}
