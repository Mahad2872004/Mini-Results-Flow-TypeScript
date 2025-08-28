import React from "react";

interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
  activeColor?: string;   
  inactiveColor?: string;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({
  totalSteps,
  currentStep,
  activeColor = "bg-teal-500",
  inactiveColor = "bg-gray-300",
}) => {
  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalSteps }, (_, idx) => (
        <div
          key={idx}
          className={`w-2 h-2 rounded-full ${
            idx + 1 <= currentStep ? activeColor : inactiveColor
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
