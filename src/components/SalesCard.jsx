import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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

const SalesCard = () => {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const planPickerRef = useRef(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
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
              src="../../public/images/dart.jpg"
              alt="Target icon with a dart"
              className="w-10 h-10 justify-center" // Tailwind classes for width and height
            />
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Personalized KetoSlim Plan Is Ready
            </h2>

            {/* Before/After Illustration */}
            <div className="flex justify-center items-center mb-6 space-x-4">
              {/* Before Image */}
              <div className="text-center">
                <img
                  src="/images/obese-middle-aged-woman Medium Background Removed.webp" // 👈 replace with your image path
                  alt="Before"
                  className="w-28 h-40 object-cover rounded-2xl shadow-md"
                />
                <span className="block mt-2 text-sm font-medium text-gray-600">
                  Now
                </span>
              </div>

              {/* After Image */}
              <div className="text-center">
                <img
                  src="/images/slim-middle-aged-woman Medium Background Removed.webp" // 👈 replace with your image path
                  alt="After"
                  className="w-28 h-40 object-cover rounded-2xl shadow-md"
                />
                <span className="block mt-2 text-sm font-medium text-gray-600">
                  6 Months
                </span>
              </div>
            </div>

            {/* Comparison Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              {/* Left Side */}
              <div>
                <div className="font-semibold text-gray-800 mb-1">Body Fat</div>
                <div className="text-orange-500 mb-3">20-25%</div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">Energy Levels</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-1/4 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">
                    Physical Health
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-1/6 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-700">
                    Metabolism Speed
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-1/6 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Right Side */}
              <div>
                <div className="font-semibold text-gray-800 mb-1">Body Fat</div>
                <div className="text-orange-500 mb-3">10-12%</div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">Energy Levels</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-5/6 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="font-medium text-gray-700">
                    Physical Health
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-full h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-700">
                    Metabolism Speed
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-full h-2 bg-orange-400 rounded-full"></div>
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
            {/* Left side - Features list */}
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

            {/* Right side - Mobile Mockup */}
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

          {/* Features Section */}

          {/* Social Proof */}

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
                  <span>9:59</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pricing Options */}
            <div className="space-y-4 mb-6">
              {/* 3 Payments Option */}
              <div className="border-2 border-gray-200 rounded-2xl p-4">
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
                  <input
                    type="radio"
                    name="plan"
                    className="w-5 h-5 text-teal-500"
                  />
                </div>
              </div>

              {/* Discount Option */}
              <div className="border-2 border-teal-500 rounded-xl p-4 bg-white relative">
                <div className="absolute top-0 right-0 bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  23% OFF
                </div>

                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md inline-block mb-3">
                  DISCOUNT
                </div>

                <p className="text-gray-800 text-sm mb-1">
                  1 Payment of <span className="font-bold">$67</span>. Pay in
                  full today
                </p>
                <p className="text-gray-800 text-sm mb-4">
                  and save $20 instantly.
                </p>

                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="bg-teal-500 rounded-full p-1 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-teal-500 text-black text-xs font-bold px-4 py-1 rounded-t-md">
                  MOST POPULAR
                </div>
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
          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transition-colors duration-200 shadow-lg mb-4">
            <span>Continue</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-gray-500 text-center underline">
            No thanks, I don't want this plan.
          </p>
        </div>

        {/* Money Back Guarantee */}
        {/* <div className="bg-white rounded-3xl shadow-lg p-6 mb-6"> */}
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
            If you don’t cancel, KetoSlim will automatically continue your
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
