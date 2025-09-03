import React, { useState } from "react";
import axios from "axios";
import type { FormData } from "../../types/types";
import FormInput from "../../Inputs/FormInput";
import { useDarkMode } from "../../context/DarkModeContext";
import toast from "react-hot-toast";

interface FormStepProps {
  onNext: (data: FormData) => void;
}

const FormStep: React.FC<FormStepProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    bodyFatPercent: 0,
    BMI: 0,
    calorieTarget: 0,
    waterIntake: 0,
    weightLossRate: 0,
    seeResultsDays: 0,
  });

  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/form/",
        formData
      );
      console.log("Submission response:", response.data);

      // Pass form data to parent step
      onNext(formData);

      alert("Submission created successfully!");
    } catch (error) {
      console.error("Error creating submission:", error);
      alert("Failed to create submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Validation check
  const isFormValid = (): boolean => {
    return (
      formData.gender !== "" &&
      formData.bodyFatPercent > 0 &&
      formData.BMI > 0 &&
      formData.calorieTarget > 0 &&
      formData.waterIntake > 0 &&
      formData.weightLossRate > 0 &&
      formData.seeResultsDays > 0
    );
  };

  return (
    <div
      className={`min-h-screen p-4 flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md w-full mx-auto">
        <div
          className={`rounded-3xl shadow-lg p-8 transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            <span className="text-teal-500">KETO</span>
            <span
              className={darkMode ? "text-gray-100" : "text-gray-800"}
            >
              SLIM
            </span>
          </h1>

          <p
            className={`text-center mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Let's get your personalized results
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Gender */}
            <FormInput
              label="Gender"
              type="radio"
              name="gender"
              value={formData.gender}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              onChange={(val) =>
                setFormData({ ...formData, gender: val as string })
              }
            />

            {/* Body Fat */}
            <FormInput
              label="Body Fat %"
              type="range"
              min={0}
              max={100}
              value={formData.bodyFatPercent}
              onChange={(val) =>
                setFormData({ ...formData, bodyFatPercent: val as number })
              }
            />

            {/* BMI */}
            <FormInput
              label="BMI"
              type="range"
              min={0}
              max={40}
              step={0.1}
              value={formData.BMI}
              onChange={(val) =>
                setFormData({ ...formData, BMI: val as number })
              }
            />

            {/* Calorie Target */}
            <FormInput
              label="Daily Calorie Target"
              type="number"
              value={formData.calorieTarget}
              onChange={(val) =>
                setFormData({ ...formData, calorieTarget: val as number })
              }
            />

            {/* Water Intake */}
            <FormInput
              label="Cups of Water Per Day"
              type="select"
              value={formData.waterIntake}
              options={[
                { value: 0, label: "Select cups per day" },
                { value: 1, label: "1 cup" },
                { value: 2, label: "2 cups" },
                { value: 4, label: "4 cups" },
                { value: 6, label: "6 cups" },
              ]}
              onChange={(val) =>
                setFormData({ ...formData, waterIntake: val as number })
              }
            />

            {/* Weight Loss Rate */}
            <FormInput
              label="Weekly Weight Loss Goal (lbs)"
              type="number"
              value={formData.weightLossRate}
              step={0.1}
              onChange={(val) =>
                setFormData({ ...formData, weightLossRate: val as number })
              }
            />

            {/* Days to See Results */}
            <FormInput
              label="Days to See Results"
              type="number"
              value={formData.seeResultsDays}
              min={1}
              onChange={(val) =>
                setFormData({ ...formData, seeResultsDays: val as number })
              }
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`w-full font-semibold py-4 rounded-2xl transition-colors duration-200 shadow-lg ${
                isFormValid()
                  ? darkMode
                    ? "bg-teal-600 hover:bg-teal-500 text-white"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Get My Results"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormStep;
