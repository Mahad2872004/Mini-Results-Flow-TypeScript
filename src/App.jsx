import React, { useState, useEffect } from "react";
import FormStep from "./components/FormStep";
import ResultCard from "./components/ResultCard";
import SalesCard from "./components/SalesCard";
import getCardData from "./data/cardData";

function App() {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0); // 0 = form, 1–6 = results, 7 = sales
  const cardData = getCardData(formData);

  const updateStep = (newStep) => {
    setStep(newStep);
    if (newStep === 0) {
      window.history.pushState({ step: 0 }, "", "/");
    } else if (newStep >= 1 && newStep <= 6) {
      window.history.pushState({ step: newStep }, "", "/results");
    } else if (newStep === 7) {
      window.history.pushState({ step: 7 }, "", "/sales");
    }
  };

  const handleNext = (data) => {
    if (step === 0) setFormData(data);
    updateStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) updateStep(step - 1);
  };

  const handleNoThanks = () => {
    setFormData({});
    updateStep(0);
  };

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.step !== undefined) {
        setStep(event.state.step);
      }
    };

    window.addEventListener("popstate", handlePopState);
    updateStep(0); // initialize history on load

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (step === 0) {
    return <FormStep onNext={handleNext} />;
  }

  if (step >= 1 && step <= 6) {
    return (
      <ResultCard
        {...cardData[step - 1]}
        onNext={() => handleNext()}
        onBack={handleBack}
        step={step}
        prevTitle={step > 1 ? cardData[step - 2].title : null}
      />
    );
  }

  if (step === 7) {
    return <SalesCard onBack={handleBack} onNoThanks={handleNoThanks} />;
  }

  return null;
}

export default App;
