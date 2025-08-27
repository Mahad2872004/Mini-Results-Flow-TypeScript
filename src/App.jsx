import React, { useState, useEffect } from "react";
import FormStep from "./components/FormStep";
import ResultCard from "./components/ResultCard";
import SalesCard from "./components/SalesCard";
import getCardData from "./data/cardData";

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        
    .replace(/[^\w\-]+/g, "")    
    .replace(/\-\-+/g, "-");     

function App() {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0); // 0=form, 1-6=cards, 7=sales

  const handleNext = (data) => {
    if (step === 0) setFormData(data);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNoThanks = () => {
    setStep(0); // Go back to form
    setFormData({}); // Reset form data
    window.history.replaceState({}, "", "/"); // reset URL
  };

  const cardData = getCardData(formData);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      if (step > 0) {
        setStep(step - 1);
      }
    };

    window.addEventListener("popstate", handlePopState);

    
    if (step === 0) {
      window.history.replaceState({ step }, "", "/");
    } else if (step >= 1 && step <= 6) {
      const title = cardData[step - 1]?.title || `step-${step}`;
      const slug = slugify(title);
      window.history.replaceState({ step }, "", `/${slug}`);
    } else if (step === 7) {
      window.history.replaceState({ step }, "", "/sales");
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, [step, cardData]);

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

  if (step === 7)
    return <SalesCard onBack={handleBack} onNoThanks={handleNoThanks} />;

  return null;
}

export default App;
