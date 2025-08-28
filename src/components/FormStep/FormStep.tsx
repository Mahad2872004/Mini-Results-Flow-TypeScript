import React, { useState } from "react";
import type { FormData } from "../../types/types";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext(formData);
  };

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
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            <span className="text-teal-500">KETO</span>
            <span className="text-gray-800">SLIM</span>
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Let's get your personalized results
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gender
              </label>
              <div className="flex gap-4">
                {["male", "female"].map((g) => (
                  <label key={g} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="mr-2 text-teal-500 focus:ring-teal-500"
                    />
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Body Fat % */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Fat % ({formData.bodyFatPercent}%)
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={formData.bodyFatPercent}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    bodyFatPercent: parseInt(e.target.value, 10),
                  })
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-black"
                style={{
                  background: `linear-gradient(to right, #319795 0%, #319795 ${formData.bodyFatPercent}%, #d1d5db ${formData.bodyFatPercent}%, #d1d5db 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* BMI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BMI ({formData.BMI})
              </label>
              <input
                type="range"
                min={0}
                max={40}
                step={0.1}
                value={formData.BMI}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    BMI: parseFloat(e.target.value),
                  })
                }
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-black"
                style={{
                  background: `linear-gradient(to right, #319795 0%, #319795 ${
                    (formData.BMI / 40) * 100
                  }%, #d1d5db ${(formData.BMI / 40) * 100}%, #d1d5db 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>40</span>
              </div>
            </div>

            {/* Daily Calorie Target */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Calorie Target
              </label>
              <input
                type="number"
                value={formData.calorieTarget || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    calorieTarget: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter daily calorie target"
                min={0}
              />
            </div>

            {/* Water Intake */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cups of Water Per Day
              </label>
              <select
                value={formData.waterIntake}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFormData({
                    ...formData,
                    waterIntake: parseInt(e.target.value, 10),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value={0}>Select cups per day</option>
                <option value={1}>1 cup</option>
                <option value={2}>2 cups</option>
                <option value={4}>4 cups</option>
                <option value={6}>6 cups</option>
              </select>
            </div>

            {/* Weight Loss Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Weight Loss Goal (lbs)
              </label>
              <input
                type="number"
                value={formData.weightLossRate || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    weightLossRate: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter weekly weight loss goal"
                min={0}
                step={0.1}
              />
            </div>

            {/* Days to See Results */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days to See Results
              </label>
              <input
                type="number"
                value={formData.seeResultsDays || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    seeResultsDays: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter days to see results"
                min={1}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full font-semibold py-4 rounded-2xl transition-colors duration-200 shadow-lg ${
                isFormValid()
                  ? "bg-teal-500 hover:bg-teal-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Get My Results
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormStep;
