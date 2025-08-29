import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import FormStep from "./components/FormStep/FormStep";
import ResultCard from "./components/ResultCard/ResultCard";
import SalesCard from "./components/SalesCard/SalesCard";
import getCardData from "./data/cardData";
import type { FormData, CardDataItem } from "./types/types";
import { useFormData } from "./hooks/UserFormData";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";

function AppContent() {
  const navigate = useNavigate();
  const { formData, setFormData, resetForm } = useFormData();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const cardData = getCardData(formData);

  const handleNext = (data: Partial<FormData> = {}, step: number) => {
    if (step === 0) setFormData(data as FormData);
    const nextStep = step + 1;

    if (nextStep <= 6) navigate(`/results/${nextStep}`);
    else if (nextStep === 7) navigate("/sales");
  };

  const handleBack = (step: number) => {
    const prevStep = step - 1;
    if (prevStep === 0) navigate("/");
    else if (prevStep >= 1) navigate(`/results/${prevStep}`);
  };

  const handleNoThanks = () => {
    resetForm();
    localStorage.removeItem("formData");
    navigate("/");
  };

  return (
    <div
      className={
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }
      style={{ minHeight: "100vh" }}
    >
      {/* Dark Mode Toggle Button (Global) */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow ${
            darkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={<FormStep onNext={(data) => handleNext(data, 0)} />}
        />
        <Route
          path="/results/:step"
          element={
            <ResultCardWrapper
              cardData={cardData}
              onNext={handleNext}
              onBack={handleBack}
            />
          }
        />
        <Route
          path="/sales"
          element={
            <SalesCard
              onBack={() => handleBack(7)}
              onNoThanks={handleNoThanks}
            />
          }
        />
      </Routes>
    </div>
  );
}

interface ResultCardWrapperProps {
  cardData: CardDataItem[];
  onNext: (data: Partial<FormData>, step: number) => void;
  onBack: (step: number) => void;
}

const ResultCardWrapper: React.FC<ResultCardWrapperProps> = ({
  cardData,
  onNext,
  onBack,
}) => {
  const { step } = useParams<{ step?: string }>();
  const stepNum = parseInt(step ?? "0", 10);
  const { darkMode } = useDarkMode();

  if (!stepNum || stepNum < 1 || stepNum > cardData.length) return null;

  return (
    <ResultCard
      {...cardData[stepNum - 1]}
      step={stepNum}
      prevTitle={stepNum > 1 ? cardData[stepNum - 2].title : null}
      onNext={() => onNext({}, stepNum)}
      onBack={() => onBack(stepNum)}
      // ResultCard can now read darkMode from context if needed
    />
  );
};

// Wrap everything with DarkModeProvider
export default function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}
