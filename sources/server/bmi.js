const bmiClassifications = {
  severeThinness: 16,
  moderateThinness: 17,
  mildThinness: 18.5,
  normal: 25,
  overweight: 30,
  obeseClass1: 35,
  obeseClass2: 40,
  obeseClass3: 100,
};

export const healthyBMIRange = [
  bmiClassifications.mildThinness,
  bmiClassifications.normal,
];

export const getBMIIndex = (age, weight, height, gender) => {
  let bmi;

  if (age < 18) {
    bmi = weight / (height * height);
  } else {
    if (gender === "male") {
      bmi = 1.3 * (weight / (height * height)) - 11;
    } else if (gender === "female") {
      bmi = 1.3 * (weight / (height * height)) - 8;
    } else {
      bmi = weight / (height * height);
    }
  }

  return bmi;
};

export const getBMIPrime = (bmi, delimiter = 25) => {
  return bmi / delimiter;
};

export const getBMIClassification = (bmi) => {
  let bmiClass = "";
  for (const classfication in bmiClassifications) {
    const maxRange = bmiClassifications[classfication];

    if (bmi < maxRange) {
      bmiClass = classfication;
      break;
    }
  }
  return bmiClass;
};

export const convertBMItoWeight = (bmi, height) => {
  return bmi * (height * height);
};
