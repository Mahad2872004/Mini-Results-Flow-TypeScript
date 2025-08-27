import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import {
  CheckCircle,
  Star,
  Shield,
  Award,
  Users,
  ChevronRight,
  ArrowRight,
  Clock,
} from "lucide-react";

const SalesCard = ({ onBack, onNoThanks }) => {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("discount");
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isDiscountExpired, setIsDiscountExpired] = useState(false);
  const planPickerRef = useRef(null);

  // Handle browser back button for this component
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onBack) {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsDiscountExpired(true);
          // Switch to payments plan if discount was selected
          if (selectedPlan === "discount") {
            setSelectedPlan("payments");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (planPickerRef.current) {
      observer.observe(planPickerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToPlanPicker = () => {
    planPickerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlanSelect = (planType) => {
    // Don't allow selecting discount plan if expired
    if (planType === "discount" && isDiscountExpired) {
      return;
    }
    setSelectedPlan(planType);
  };

  const handleContinue = () => {
    const planData = {
      type: selectedPlan,
      price: selectedPlan === "payments" ? 29 : 67,
      description:
        selectedPlan === "payments" ? "3 payments of $29" : "1 payment of $67",
    };

    // Show toast notification based on selected plan
    if (selectedPlan === "payments") {
      toast.success("Thank you for continuing with the 3 Payments option!", {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#1f2937',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    } else {
      toast.success("Thank you for continuing with the 1 Payment option!", {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#1f2937',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    }

    console.log("Selected plan:", planData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container */}
      <Toaster />
      
      {/* Sticky Button */}
      <motion.button
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-full shadow-lg ${
          showStickyButton ? "block" : "hidden"
        }`}
        onClick={scrollToPlanPicker}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100 }}
        animate={{ y: showStickyButton ? 0 : 100 }}
        transition={{ duration: 0.3 }}
      >
        Claim my Plan
      </motion.button>

      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-teal-500">KETO</span>
            <span className="text-gray-800">SLIM</span>
          </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex justify-center items-center mb-4">
            <img
              src="/images/dart.jpg"
              alt="Target icon with a dart"
              className="w-10 h-10 justify-center"
            />
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Personalized KetoSlim Plan Is Ready
            </h2>

            {/* Before/After Image */}
            <div className="flex justify-center mb-6">
              <img
                src="/images/before_after.jpg" 
                alt="KetoSlim Result"
                className="w-70 h-56 object-cover rounded-2xl shadow-md"
              />
            </div>

            {/* Comparison Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              {/* Left Side */}
              <div>
                <div className="font-semibold text-gray-800 mb-1">Body Fat</div>
                <div className="text-rose-400 mb-3">20-25%</div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">Energy Levels</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-1/4 h-2 bg-rose-300 rounded-full"></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">
                    Physical Health
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-1/6 h-2 bg-rose-300 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-700">
                    Metabolism Speed
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-1/6 h-2 bg-rose-300 rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Right Side */}
              <div>
                <div className="font-semibold text-gray-800 mb-1">Body Fat</div>
                <div className="text-teal-500 mb-3">10-12%</div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">Energy Levels</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-5/6 h-2 bg-teal-400 rounded-full"></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">
                    Physical Health
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-full h-2 bg-teal-400 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-700">
                    Metabolism Speed
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-full h-2 bg-teal-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Benefits */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Your program will also work on:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Improving Digestion</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Toning Muscles</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Mental Wellness Reset</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Physical Confidence Boost</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Get all the right tools & knowledge.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left side Features list */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src="/images/keto-food.webp"
                  alt="Meal Plan"
                  className="w-8 h-8 object-contain"
                />
                <h4 className="font-semibold text-orange-300">
                  Daily Custom Meal Plan
                </h4>
              </div>

              <div className="flex items-start space-x-3">
                <img
                  src="/images/cart.webp"
                  alt="Grocery List"
                  className="w-8 h-8 object-contain"
                />
                <h4 className="font-semibold text-orange-300">
                  Done-For-You Grocery Lists
                </h4>
              </div>

              <div className="flex items-start space-x-3">
                <img
                  src="/images/heart-pot.webp"
                  alt="Recipes"
                  className="w-8 h-8 object-contain"
                />
                <h4 className="font-semibold text-orange-300">
                  Overwhelm-Free Delicious Recipes
                </h4>
              </div>

              <div className="flex items-start space-x-3">
                <img
                  src="/images/education-icon.webp"
                  alt="Guidance"
                  className="w-8 h-8 object-contain"
                />
                <h4 className="font-semibold text-orange-300">
                  Weekly Tips & Guidance
                </h4>
              </div>
            </div>

            {/* Right side Mobile Icon */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/iphone-mockup-r.webp"
                alt="Mobile App"
                className="w-50 md:w-56 object-contain"
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center mt-10">
            Trusted by health & nutrition professionals
          </h3>

          <div className="flex justify-center mb-2 ">
            <img
              src="/images/pubmed-logo-b.svg"
              alt="Published Content"
              className="w-40 h-10 object-contain"
            />
          </div>

          <div className="text-sm text-gray-600 mb-4 ">
            <p className="mb-2">
              There is evidence to suggest that a Ketogenic Diet can help with
              weight loss, visceral adiposity, and appetite control.
            </p>
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2716748/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline underline-offset-2 decoration-orange-500"
            >
              Source
            </a>
          </div>

          <div className="flex justify-center mb-2">
            <img
              src="/images/mayo-clinic-b.webp"
              alt="Published Content"
              className="w-10 h-10 object-contain"
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>
              Research shows that a keto diet can result in weight loss and
              improvements in cardiovascular risk factors.
            </p>
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2716748/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline underline-offset-2 decoration-orange-500"
            >
              Source
            </a>
          </div>

          {/* Plan Picker Section */}
          <div
            ref={planPickerRef}
            className="bg-white rounded-3xl shadow-lg p-6 mb-6 mt-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                3 Month Custom Keto Plan
              </h3>
              <div className="flex items-center justify-between bg-orange-500 text-white rounded-full px-4 py-2 w-full">
                <span className="text-sm font-medium">
                  Discount expires in:
                </span>
                <div className="flex items-center space-x-1 font-bold text-lg">
                  <span>{formatTime(timeLeft)}</span>
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Pricing Options */}
            <div className="space-y-4 mb-6">
              <div
                className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedPlan === "payments"
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handlePlanSelect("payments")}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-lg font-bold text-gray-800">
                      3 PAYMENTS OF $29
                    </span>
                    <div className="text-sm text-gray-600">
                      Just $29 today. Split the rest
                    </div>
                    <div className="text-sm text-gray-500">
                      over 2 easy payments
                    </div>
                  </div>
                  {selectedPlan === "payments" ? (
                    <div className="bg-teal-500 rounded-full p-1 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === "payments"}
                      onChange={() => handlePlanSelect("payments")}
                      className="w-5 h-5 text-teal-500"
                    />
                  )}
                </div>
              </div>

              {/* Discount Option */}
              <div
                className={`border-2 rounded-xl p-4 bg-white relative cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isDiscountExpired
                    ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
                    : selectedPlan === "discount"
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handlePlanSelect("discount")}
              >
                {!isDiscountExpired && (
                 <div className="absolute top-0 right-0 bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
  23% OFF
</div>

                )}

                {isDiscountExpired && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    EXPIRED
                  </div>
                )}

                <div className={`text-white text-xs font-bold px-3 py-1 rounded-md inline-block mb-3 ${
                  isDiscountExpired ? "bg-gray-500" : "bg-orange-500"
                }`}>
                  DISCOUNT
                </div>

                <p className={`text-sm mb-1 ${
                  isDiscountExpired ? "text-gray-500" : "text-gray-800"
                }`}>
                  1 Payment of <span className="font-bold">$67</span>. Pay in
                  full today
                </p>
                <p className={`text-sm mb-4 ${
                  isDiscountExpired ? "text-gray-500" : "text-gray-800"
                }`}>
                  {isDiscountExpired ? "Discount has expired" : "and save $20 instantly."}
                </p>

                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  {selectedPlan === "discount" && !isDiscountExpired ? (
                    <div className="bg-teal-500 rounded-full p-1 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === "discount"}
                      onChange={() => handlePlanSelect("discount")}
                      className="w-5 h-5 text-teal-500"
                      disabled={isDiscountExpired}
                    />
                  )}
                </div>

                {selectedPlan === "discount" && !isDiscountExpired && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-teal-500 text-black text-xs font-bold px-4 py-1 rounded-t-md">
                    MOST POPULAR
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">
                Risk-Free 60-Day Money-Back Guarantee
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-colors duration-200 shadow-lg mb-4"
          >
            <span>Continue</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={onNoThanks}
            className="text-xs text-gray-500 text-center underline w-full hover:text-gray-700 transition-colors"
          >
            No thanks, I don't want this plan.
          </button>
        </div>

        {/* Money Back Guarantee */}
        <div className="flex items-center space-x-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 ">
              Money Back Guarantee
            </h3>
          </div>
          <div className="">
            <img
              src="/images/60-day-guarantee.webp"
              alt="icon"
              className="w-50 h-25 object-contain"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-3">
          <p>
            We are confident with our service quality and this is why we offer
            you a 60-day money-back guarantee. If you are not happy with your
            goals, it's a risk-free offer.
          </p>
          <p>
            We guarantee you'll see visible results or you'll receive a full
            refund within 60 days after your purchase.
          </p>
          <p>
            By continuing your payment you agree to our 60 days of age
            verification. If you are not satisfied with your plan, you can
            contact customer support for a refund.
          </p>
          <p>
            You will only be charged $67 today for your first quarter payment.
          </p>
          <p className="font-medium">
            Your introductory period will start until Aug 27, 2025. You may
            cancel at any time before this date and you will not be charged.
          </p>
          <p>
            By continuing, you agree that your subscription will automatically
            continue your membership at the end of your introductory period
            until you cancel.
          </p>
          <p>
            If you don't cancel, KetoSlim will automatically continue your
            membership at the end of your introductory period and charge the
            membership fee of $67 quarterly until you cancel.
          </p>
          <p>
            Your subscription will be bound by our
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2716748/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline underline-offset-2 decoration-orange-500 ml-1"
            >
              Terms and Privacy Policy
            </a>
          </p>
          <p>
            If you would like a refund for any reason call
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2716748/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline underline-offset-2 decoration-orange-500 ml-1"
            >
              1-800-695-5045
            </a>
            or email
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2716748/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 underline underline-offset-2 decoration-orange-500 ml-1"
            >
              support@myketoslim.com.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;