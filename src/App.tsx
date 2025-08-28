import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import FormStep from "./components/FormStep/FormStep";
import ResultCard from "./components/ResultCard/ResultCard";
import SalesCard  from "./components/SalesCard/SalesCard";
import getCardData from "./data/cardData";
import type { FormData, CardDataItem } from "./types/types";
import { useFormData } from "./hooks/UserFormData";

function App() {
  const navigate = useNavigate();

 const { formData, setFormData, resetForm } = useFormData();

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
    setFormData({
      gender: "",
      bodyFatPercent: 0,
      BMI: 0,
      calorieTarget: 0,
      waterIntake: 0,
      weightLossRate: 0,
      seeResultsDays: 0,
    });
    localStorage.removeItem("formData");
    navigate("/");
  };

  return (
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
          <SalesCard onBack={() => handleBack(7)} onNoThanks={handleNoThanks} />
        }
      />
    </Routes>
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

  if (!stepNum || stepNum < 1 || stepNum > cardData.length) return null;

  return (
    <ResultCard
      {...cardData[stepNum - 1]}
      step={stepNum}
      prevTitle={stepNum > 1 ? cardData[stepNum - 2].title : null}
      onNext={() => onNext({}, stepNum)}
      onBack={() => onBack(stepNum)}
    />
  );
};

export default App;
