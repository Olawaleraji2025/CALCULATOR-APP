document.addEventListener("DOMContentLoaded", () => {
  const birthdateInput = document.getElementById("birthdate");
  const calculateBtn = document.getElementById("calculate-age");
  const resultsSection = document.getElementById("results");
  const yearsElement = document.getElementById("years");
  const monthsElement = document.getElementById("months");
  const daysElement = document.getElementById("days");
  const nextBirthdayElement = document.getElementById("next-birthday");

  // This is to get todays date and set it to Maximum the user can choose
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  birthdateInput.setAttribute("max", maxDate);
  // console.log(maxDate);

  // This is for the calculation of age
  calculateBtn.addEventListener("click", () => {
    const birthdate = new Date(birthdateInput.value); //This is to convert the selected date by the user to a format which the computer can use for calculations

    if (isNaN(birthdate.getTime())) {
      alert("Please select a valid date of birth");
      return;
    }

    const age = calculateAge(birthdate);
    displayResults(age);
    resultsSection.classList.remove("hidden");
  });

  // Calculate exact age
  function calculateAge(birthdate) {
    const today = new Date();
    let years = today.getFullYear() - birthdate.getFullYear(); //e.g 2026 - 2020
    let months = today.getMonth() - birthdate.getMonth(); // 0 (jan) - 1 (feb)
    let days = today.getDate() - birthdate.getDate(); // 10 - 8

    // console.log(today.getDate(), birthdate.getDate());
    

    // Adjust for negative months or days
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
      // e.g lets assume we have Jan 10, 2026 and May 15, 2020 = 0-4(jan - may), 10-15, 2026-2020. That will be 26years, -4month, -5days 
    }

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // This will get the first day of the previous month
      
      days += new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
      ).getDate(); // While this one will get the last day or date of the previous month and add it to the negative value of the days
      months--;
      
    }

    // This will Calculate the next birthday
    const nextBirthday = new Date(
      today.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)  // 1000milli and 1min and 1hr and 1day
    ); // Math.ceil will round it up to the nearest whole number 

    // Calculate total days lived
    const daysLived = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      daysUntilNextBirthday,
      daysLived,
    };
  }

  // Display results
  function displayResults(age) {
    yearsElement.textContent = age.years;
    monthsElement.textContent = age.months;
    daysElement.textContent = age.days;

    nextBirthdayElement.textContent = `${age.daysUntilNextBirthday} day${
      age.daysUntilNextBirthday !== 1 ? "s" : ""
    }`;

   
  }

  // This is for the keyboard event listeners
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      calculateBtn.click();
    }
  });
});
