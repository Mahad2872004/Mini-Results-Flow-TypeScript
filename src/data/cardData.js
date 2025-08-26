
const getCardData = (formData) => [
  {
    title: "Body Fat % Insight",
    headline: `⚖️ Your Body Fat Percentage Is ${formData.bodyFatPercent || 0}%`,
    copy: "Your body fat percentage tells us how much of your body is lean mass (muscle, organs, bone) vs stored fat. Too much stored fat doesn't just affect how you look — it impacts your energy, hormone balance, and ability to burn fat efficiently.",
    callout: (() => {
      const { gender, bodyFatPercent } = formData;
      if (!gender || !bodyFatPercent) return "";
      if (gender === "male") {
        if (bodyFatPercent < 24) return "Almost Healthy";
        if (bodyFatPercent <= 31)
          return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
        return "Very Obese";
      } else {
        if (bodyFatPercent < 31) return "Almost Healthy";
        if (bodyFatPercent <= 39)
          return "Your current level may be slowing metabolism, increasing inflammation, or making it harder to stay consistent with workouts.";
        return "Very Obese";
      }
    })(),
    image: "/images/bodyfat.jpg",
  },
  {
    title: "BMI Insight",
    headline: `📊 Your BMI Is ${formData.BMI || 0}`,
    copy: "BMI estimates how your weight might affect health based on height and weight. While not perfect, it gives us a baseline understanding of your current health status.",
    callout: (() => {
      const { BMI } = formData;
      if (!BMI) return "";
      if (BMI < 26) return "Almost Healthy - You're close to the ideal range!";
      if (BMI < 35)
        return "This range may increase risk of health complications, but the good news is it's very manageable with the right approach.";
      return "This level requires immediate attention, but with proper guidance, significant improvements are absolutely possible.";
    })(),
    image: "/images/BMI.jpg",
  },
  {
    title: "Recommended Calories",
    headline: `🔥 You Should Be Eating Around ${formData.calorieTarget || 0} Calories`,
    copy: "Your body burns calories to stay alive through basic functions like breathing, circulation, and cell production. The quality and timing of calories matters significantly for fat loss.",
    callout: (() => {
      const { calorieTarget } = formData;
      if (!calorieTarget) return "";
      if (calorieTarget >= 1300)
        return "This target allows for sustainable weight loss while maintaining energy levels.";
      if (calorieTarget >= 1100)
        return "This is a more aggressive approach that requires careful monitoring and proper nutrition.";
      return "This requires professional guidance to ensure you're getting adequate nutrition.";
    })(),
    image: "/images/Calories.jpg",
  },
  {
    title: "Water Intake",
    headline: `💧 Your Body Needs 8-9 Cups of Water Daily`,
    copy: "Proper hydration boosts metabolism by up to 30% and helps your body efficiently process nutrients. Lack of water slows digestion, reduces fat burning, and can be mistaken for hunger.",
    callout: (() => {
      const { waterIntake } = formData;
      if (!waterIntake) return "";
      if (waterIntake > 6)
        return "Your hydration game is strong! This supports optimal metabolism.";
      if (waterIntake >= 2)
        return "You're getting closer! Increasing intake could boost your results significantly.";
      return "Your body needs more hydration to function optimally and support fat loss.";
    })(),
    image: "/images/water.jpg",
  },
  {
    title: "Estimated Weight Loss Rate",
    headline: `📉 You Could Be Losing ${formData.weightLossRate || 0} lbs Per Week`,
    copy: "This is your realistic potential if your metabolism is optimized and you follow a structured plan. Sustainable weight loss focuses on fat loss while preserving muscle mass.",
    callout:
      "With the right approach, results could show up even faster than expected!",
    image: "/images/loose.jpg",
  },
  {
    title: "Visible Changes Timeline",
    headline: `⏳ You Could See Results in as Little as ${formData.seeResultsDays || 0} Days`,
    copy: "Visible change doesn't take forever when you have the right strategy. The key is pairing awareness with a proper action plan that works with your body, not against it.",
    callout: "Step one is awareness. Step two is action with a proper plan!",
    image: "/images/results.jpg",
  },
];

export default getCardData;
