document.addEventListener("DOMContentLoaded", () => {
  const unitRadios = document.querySelectorAll('input[name="unit"]');
  const metricInputs = document.getElementById("metric-inputs");
  const imperialInputs = document.getElementById("imperial-inputs");
  const calculateBtn = document.getElementById("calculate-bmi");
  const resultsSection = document.getElementById("results");
  const bmiValue = document.getElementById("bmi-value");
  const bmiCategory = document.getElementById("bmi-category");
  const bmiMessage = document.getElementById("bmi-message");
  const bmiCircle = document.getElementById("bmi-circle");

  // Toggle between metric and imperial units
  unitRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "metric") {
        metricInputs.classList.remove("hidden");
        imperialInputs.classList.add("hidden");
      } else {
        metricInputs.classList.add("hidden");
        imperialInputs.classList.remove("hidden");
      }
      resultsSection.classList.add("hidden");
    });
  });

  // This is for Calculating the BMI
  calculateBtn.addEventListener("click", () => {
    const unitSystem = document.querySelector(
      'input[name="unit"]:checked'
    ).value;
    let bmi = 0;

    if (unitSystem === "metric") {
      const heightCm = parseFloat(document.getElementById("height-cm").value);
      const weightKg = parseFloat(document.getElementById("weight-kg").value);
    
      // parseFloat will convert the values to decimals numbers

      if (
        isNaN(heightCm) ||
        isNaN(weightKg) ||
        heightCm <= 0 ||
        weightKg <= 0
      ) {
        alert("Please enter valid height and weight values");
        return;
      }

      const heightM = heightCm / 100; //This is to convert the height in CM to M
      bmi = weightKg / (heightM * heightM); //This is the formula for BMI 
    } else {
      const heightFt = parseFloat(document.getElementById("height-ft").value);
      const heightIn = parseFloat(document.getElementById("height-in").value);
      const weightLbs = parseFloat(document.getElementById("weight-lbs").value);

      if (
        isNaN(heightFt) ||
        isNaN(weightLbs) ||
        heightFt <= 0 ||
        weightLbs <= 0
      ) {
        alert("Please enter valid height and weight values");
        return;
      }

      const totalInches = heightFt * 12 + (isNaN(heightIn) ? 0 : heightIn);
      bmi = (weightLbs / (totalInches * totalInches)) * 703;
    }

    // Display results
    bmiValue.textContent = bmi.toFixed(1); 
    //toFixed(1) will round number gotten to One(1) decimal places 
    updateBMICategory(bmi);
    resultsSection.classList.remove("hidden");
  });

  // Update BMI category and styling
  function updateBMICategory(bmi) {
    let category = "";
    let message = "";
    let categoryClass = "";

    if (bmi < 18.5) {
      category = "Underweight";
      message =
        "You are underweight. Consider consulting a healthcare provider.";
      categoryClass = "underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
      message = "You have a healthy weight. Keep it up!";
      categoryClass = "normal";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      message = "You are overweight. Consider more physical activity.";
      categoryClass = "overweight";
    } else {
      category = "Obesity";
      message = "You are obese. Please consult a healthcare provider.";
      categoryClass = "obese";
    }

    bmiCategory.textContent = category;
    bmiMessage.textContent = message;
    bmiCircle.className = `bmi-circle ${categoryClass}`;
  }

  // This is for the keyboard functionality
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      calculateBtn.click();
    }
  });
});
