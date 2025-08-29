import React from "react";
import FormInputProps from "../props/FormInputProps";
import { useDarkMode } from "../context/DarkModeContext";

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  min,
  max,
  step,
  options,
  name,
  onChange,
}) => {
  const { darkMode } = useDarkMode();

  switch (type) {
    case "range":
      return (
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {label} ({value})
          </label>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value as number}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-teal-500"
            style={{
              background: `linear-gradient(to right, #319795 0%, #319795 ${
                ((value as number - (min || 0)) / ((max || 100) - (min || 0))) *
                100
              }%, ${darkMode ? "#374151" : "#d1d5db"} ${
                ((value as number - (min || 0)) / ((max || 100) - (min || 0))) *
                100
              }%, ${darkMode ? "#374151" : "#d1d5db"} 100%)`,
            }}
          />
          {min !== undefined && max !== undefined && (
            <div
              className={`flex justify-between text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span>{min}</span>
              <span>{max}</span>
            </div>
          )}
        </div>
      );

    case "number":
      return (
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {label}
          </label>
          <input
            type="number"
            value={value || ""}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>
      );

    case "select":
      return (
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {label}
          </label>
          <select
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "radio":
      return (
        <div>
          <label
            className={`block text-sm font-medium mb-3 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {label}
          </label>
          <div className="flex gap-4">
            {options?.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(opt.value)}
                  className="mr-2 text-teal-500 focus:ring-teal-500"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default FormInput;
