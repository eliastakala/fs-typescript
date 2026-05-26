const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi > 40) {
    return "Obese (Class III)"
  } else if (bmi > 35) {
    return "Obese (Class II)"
  } else if (bmi > 30) {
    return "Obese (Class I)"
  } else if (bmi > 25) {
    return "Overweight (Pre-obese)"
  } else if (bmi < 16) {
    return "Underweight (Severe thinness)"
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)"
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)"
  }
  return "Normal range"
};

console.log(calculateBmi(172, 73));
