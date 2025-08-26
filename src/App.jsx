import React, { useState } from "react";
import FormStep from "./components/FormStep";
import ResultCard from "./components/ResultCard";
import SalesCard from "./components/SalesCard";
import getCardData from "./data/cardData";
function App() {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0); // 0=form, 1-6=cards, 7=sales

  const handleNext = (data) => {
    if (step === 0) setFormData(data);
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

const cardData = getCardData(formData); 


  if (step === 0) return <FormStep onNext={handleNext} />;
if (step >= 1 && step <= 6)
  return (
    <ResultCard
      {...cardData[step - 1]}
      onNext={() => handleNext()}
      onBack={handleBack}
      step={step}
      prevTitle={step > 1 ? cardData[step - 2].title : null} 
    />
  );
  if (step === 7) return <SalesCard />;

  return null;
}

export default App;