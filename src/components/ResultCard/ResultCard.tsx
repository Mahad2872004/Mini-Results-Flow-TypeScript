import React, { JSX } from "react";
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

//Props Interface
interface ResultCardProps {
  title: string;
  headline: string;
  copy: string;
  callout?: string;
  onNext: () => void;
  onBack: () => void;
  step: number;
  prevTitle: string | null;
  image?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  title,
  headline,
  copy,
  callout,
  onNext,
  onBack,
  step,
  prevTitle,
  image,
}) => {
  const totalSteps = 6;

  const icons: Record<number, JSX.Element> = {
    1: <Scale className="w-12 h-12 text-gray-400" />,
    2: <BarChart3 className="w-12 h-12 text-gray-400" />,
    3: <Flame className="w-12 h-12 text-gray-400" />,
    4: <Droplets className="w-12 h-12 text-gray-400" />,
    5: <TrendingDown className="w-12 h-12 text-gray-400" />,
    6: <Clock className="w-12 h-12 text-gray-400" />,
  };

  const getCalloutColor = (): string => {
    if (
      callout?.includes("Almost Healthy") ||
      callout?.includes("strong") ||
      callout?.includes("faster")
    ) {
      return "text-green-600";
    }
    if (
      callout?.includes("Obese") ||
      callout?.includes("closer") ||
      callout?.includes("hydration")
    ) {
      return "text-orange-600";
    }
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

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">
            <span className="text-teal-500">KETO</span>
            <span className="text-gray-800">SLIM</span>
          </h1>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-teal-500 text-lg font-medium">Your Results</h2>
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx + 1 <= step ? "bg-teal-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between h-[700px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">{icons[step]}</div>

          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {parseHeadline(headline)}
            </h3>
            <p className="text-gray-600 font-medium">Here's Why That Matters</p>
          </div>

          {/* Image */}
          {image && (
            <div className="flex justify-center mb-6">
              <img
                src={image}
                alt="Result illustration"
                className="max-h-48 object-contain"
              />
            </div>
          )}

          {/* Description */}
          <div className="text-sm text-gray-600 leading-relaxed mb-8 space-y-3">
            <p>{copy}</p>
            {callout && (
              <p className={`font-medium ${getCalloutColor()}`}>{callout}</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-auto">
            {step > 1 && (
              <motion.button
                onClick={onBack}
                className="w-1/2 bg-white border-2 border-teal-500 text-teal-500 font-semibold py-4 rounded-2xl flex items-center justify-center space-x-2 hover:bg-teal-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="truncate">{prevTitle}</span>
              </motion.button>
            )}

            <motion.button
              onClick={onNext}
              className={`${
                step > 1 ? "w-1/2" : "w-full"
              } bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-colors`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
