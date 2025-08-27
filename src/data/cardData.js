const getCardData = (formData) => [
  {
    title: "Body Fat % Insight",
    headline: `⚖️ Your Body Fat Percentage Is ${formData.bodyFatPercent || 0}%`,
    copy: `Your body fat percentage tells how much of your body is lean mass vs stored fat.\n\nHigh body fat affects energy, hormones, and fat-burning efficiency.`,
    callout: (() => {
      const { gender, bodyFatPercent } = formData;
      if (!gender || !bodyFatPercent) return "";
      if (gender === "male") {
        if (bodyFatPercent < 24)
          return "Almost Healthy: Slightly above optimal, may slow metabolism.";
        if (bodyFatPercent <= 31)
          return "Obese: Fat levels could slow metabolism and energy.";
        return "Very Obese: High fat may affect energy, appetite, and fat loss.";
      } else {
        if (bodyFatPercent < 31)
          return "Almost Healthy: Slightly above optimal, may slow metabolism.";
        if (bodyFatPercent <= 39)
          return "Obese: Fat levels could slow metabolism and energy.";
        return "Very Obese: High fat may affect energy, appetite, and fat loss.";
      }
    })(),
    image: "/images/bodyfat.jpg",
  },
  {
    title: "BMI Insight",
    headline: `📊 Your BMI Is ${formData.BMI || 0}`,
    copy: `BMI estimates how weight affects health.\n\nHigh BMI can slow metabolism, drain energy, and make fat loss harder.`,
    callout: (() => {
      const { BMI } = formData;
      if (!BMI) return "";
      if (BMI < 26) return "Almost Healthy: Close to optimal, small changes help.";
      if (BMI < 35) return "Obese: Higher BMI may affect hormones and recovery.";
      return "Very Obese: BMI may lead to insulin resistance, fatigue, but change is possible.";
    })(),
    image: "/images/BMI.jpg",
  },
  {
    title: "Recommended Calories",
    headline: `🔥 You Should Be Eating Around ${formData.calorieTarget || 0} Calories`,
    copy: `Calories fuel your body — type matters more than total.\n\nLow-quality calories spike cravings and slow fat loss.`,
    callout: (() => {
      const { calorieTarget } = formData;
      if (!calorieTarget) return "";
      if (calorieTarget >= 1300) return "Almost Healthy: Close to target, improve food quality.";
      if (calorieTarget >= 1100) return "Obese Range: Good calorie burn if nutrient-dense foods eaten.";
      return "Very Obese Range: Too low may slow metabolism; focus on smart eating.";
    })(),
    image: "/images/Calories.jpg",
  },
  {
    title: "Water Intake",
    headline: "💧 Your Body Needs 8-9 Cups of Water Daily",
    copy: `Hydration helps fat-burning and energy.\n\nDehydration can feel like fatigue or cravings.`,
    callout: (() => {
      const { waterIntake } = formData;
      if (!waterIntake) return "";
      if (waterIntake > 6) return "Great! Hydration supports energy and fat loss.";
      if (waterIntake >= 2) return "Getting there — drink a few more cups daily.";
      return "Low intake — drink more to boost metabolism and reduce cravings.";
    })(),
    image: "/images/water.jpg",
  },
  {
    title: "Estimated Weight Loss Rate",
    headline: `📉 You Could Be Losing ${formData.weightLossRate || 0} lbs Per Week`,
    copy: `Potential fat loss depends on metabolism and fuel source.\n\nLow energy or cravings indicate sugar burning, slowing progress.`,
    callout: "With the right plan, your body could burn fat faster.",
    image: "/images/loose.jpg",
  },
  {
    title: "Visible Changes Timeline",
    headline: `⏳ You Could See Results in as Little as ${formData.seeResultsDays || 0} Days`,
    copy: `Metabolism shifts lead to visible changes quickly.\n\nConsistency and the right plan matter most.`,
    callout: "Awareness + plan = results you can see fast.",
    image: "/images/results.jpg",
  },
];

export default getCardData;
