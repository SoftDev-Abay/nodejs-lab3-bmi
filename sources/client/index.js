document
  .getElementById("calculateButton")
  .addEventListener("click", function (event) {
    // Get form data
    event.preventDefault();
    var age = document.getElementById("inputAge").value;
    var height = document.getElementById("inputHeight").value;
    var weight = parseFloat(document.getElementById("inputWeight").value);

    // Get selected gender
    var genderRadios = document.getElementsByName("genderRadios");
    var selectedGender;
    for (var i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        selectedGender = genderRadios[i].value;
        break;
      }
    }

    // Create an object with form data
    var formData = {
      age: age,
      height: height,
      weight: weight,
      gender: selectedGender,
    };

    const bmiSpan = document.getElementById("bmi-span");
    const bmiClassificationSpan = document.getElementById(
      "bmi-classification-span"
    );
    const bmiPrimesSpan = document.getElementById("bmi-prime");
    const changeWeightSpan = document.getElementById("change-weight");
    const healthyWeightSpan = document.getElementById("healthy-weight");
    const healthyBmiRangeSpan = document.getElementById("healthy-bmi-range");

    getBMIDataFromServer(formData)
      .then((data) => {
        bmiSpan.innerHTML = data.bmi;
        bmiClassificationSpan.innerHTML = data.classification;
        bmiPrimesSpan.innerHTML = data.bmiPrime;
        healthyWeightSpan.innerHTML =
          data.healthyWeightRange[0] + " - " + data.healthyWeightRange[1];

        if (weight > data.healthyWeightRange[1]) {
          changeWeightSpan.innerHTML =
            "You should lose " +
            (weight - data.healthyWeightRange[1]) +
            " kg " +
            "to reach a BMI of 25 kg/m2.";
        } else if (weight < data.healthyWeightRange[1]) {
          changeWeightSpan.innerHTML =
            "You should gain " +
            (data.healthyWeightRange[1] - weight) +
            " kg " +
            "to reach a BMI of 25 kg/m2.";
        } else {
          changeWeightSpan.innerHTML = "You are in great shape!";
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    return false;
  });

const getBMIDataFromServer = async (formData) => {
  try {
    const result = await fetch("/bmi", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = result.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
