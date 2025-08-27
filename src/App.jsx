import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import FormStep from "./components/FormStep";
import ResultCard from "./components/ResultCard";
import SalesCard from "./components/SalesCard";
import getCardData from "./data/cardData";

function App() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {};
  });

  const cardData = getCardData(formData);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = (data = {}, step) => {
    if (step === 0) setFormData(data);
    const nextStep = step + 1;

    if (nextStep <= 6) navigate(`/results/${nextStep}`);
    else if (nextStep === 7) navigate("/sales");
  };

  const handleBack = (step) => {
    const prevStep = step - 1;
    if (prevStep === 0) navigate("/");
    else if (prevStep >= 1) navigate(`/results/${prevStep}`);
  };

  const handleNoThanks = () => {
    setFormData({});
    localStorage.removeItem("formData");
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<FormStep onNext={(data) => handleNext(data, 0)} initialData={formData} />}
      />
      <Route
        path="/results/:step"
        element={<ResultCardWrapper cardData={cardData} onNext={handleNext} onBack={handleBack} />}
      />
      <Route
        path="/sales"
        element={<SalesCard onBack={() => handleBack(7)} onNoThanks={handleNoThanks} />}
      />
    </Routes>
  );
}

const ResultCardWrapper = ({ cardData, onNext, onBack }) => {
  const { step } = useParams();
  const stepNum = parseInt(step, 10);

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
