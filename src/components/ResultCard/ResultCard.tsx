import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  BarChart3,
  Flame,
  Droplets,
  TrendingDown,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import StepButton from "../../buttons/StepButton";
import ProgressDots from "../../progressDots/ProgressDots";
import { useDarkMode } from "../../context/DarkModeContext";
import getCardData from "../../data/cardData";
import type { CardDataItem } from "../../types/types";
import { useNavigate } from "react-router-dom"; // 🔥 Import navigate

const ResultCard: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [cards, setCards] = useState<CardDataItem[]>([]);
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const navigate = useNavigate(); // 🔥 Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCardData();
      setCards(data);
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      navigate("/sales"); // 🔥 Redirect to Sales page
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const card = cards[step - 1];

  const icons: Record<number, JSX.Element> = {
    1: <Scale className="w-12 h-12 text-gray-400" />,
    2: <BarChart3 className="w-12 h-12 text-gray-400" />,
    3: <Flame className="w-12 h-12 text-gray-400" />,
    4: <Droplets className="w-12 h-12 text-gray-400" />,
    5: <TrendingDown className="w-12 h-12 text-gray-400" />,
    6: <Clock className="w-12 h-12 text-gray-400" />,
  };

  const getCalloutColor = (callout?: string): string => {
    if (!callout) return "";
    if (callout.includes("Almost Healthy") || callout.includes("faster"))
      return "text-green-600";
    if (callout.includes("Obese") || callout.includes("closer"))
      return "text-orange-600";
    return "text-teal-600";
  };

  const parseHeadline = (text: string): (string | JSX.Element)[] => {
    const clean = text.replace(/[⚖️📊🔥💧📉⏳]/g, "").trim();
    return clean.split(/(\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?%?)/).map((part, i) =>
      /\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)?%?/.test(part) ? (
        <span key={i} className="text-orange-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (!card) return <p className="text-center text-lg">Loading results...</p>;

  return (
    <motion.div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto mb-6">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">
            <span className="text-teal-500">KETO</span>
            <span className={darkMode ? "text-gray-100" : "text-gray-800"}>
              SLIM
            </span>
          </h1>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-teal-500 text-lg font-medium">Your Results</h2>
          <ProgressDots totalSteps={totalSteps} currentStep={step} />
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <motion.div
          className={`rounded-3xl shadow-lg p-8 flex flex-col justify-between h-[700px] transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-4">{icons[step]}</div>

          <div className="text-center mb-6">
            <h3
              className={`text-2xl font-bold mb-2 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {parseHeadline(card.headline)}
            </h3>
            <p
              className={`font-medium ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Here's Why That Matters
            </p>
          </div>

          {card.image && (
            <div className="flex justify-center mb-6">
              <img
                src={card.image}
                alt="Result illustration"
                className="max-h-48 object-contain"
              />
            </div>
          )}

          <div
            className={`text-sm leading-relaxed mb-8 space-y-3 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <p>{card.copy}</p>
            {card.callout && (
              <p className={`font-medium ${getCalloutColor(card.callout)}`}>
                {card.callout}
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-auto">
            {step > 1 && (
              <StepButton
                onClick={handleBack}
                className={`w-1/2 border-2 border-teal-500 text-teal-500 hover:bg-teal-50 ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
                iconLeft={<ChevronLeft className="w-5 h-5" />}
              >
                Back
              </StepButton>
            )}

            <StepButton
              onClick={handleNext}
              className={`${
                step > 1 ? "w-1/2" : "w-full"
              } bg-teal-500 hover:bg-teal-600 text-white shadow-lg`}
              iconRight={<ChevronRight className="w-5 h-5" />}
            >
              {step === totalSteps ? "Go to Sales" : "Next"}
            </StepButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
