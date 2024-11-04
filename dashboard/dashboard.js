    
// Greet the user with their name from local storage
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    document.getElementById("username").textContent = username ? username : "User";
  });
  
  // BMI Calculator function
  function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
  
    if (weight && height) {
      const bmi = (weight / (height * height)).toFixed(2);
      document.getElementById("bmiResult").textContent = `Your BMI is: ${bmi}`;
    } else {
      alert("Please enter valid weight and height values.");
    }
  }
  
  // Progress Tracker - Add data and log entries
  function addProgress() {
    const steps = document.getElementById("steps").value;
    const calories = document.getElementById("calories").value;
    const exerciseTime = document.getElementById("exerciseTime").value;
  
    if (steps && calories && exerciseTime) {
      const logItem = document.createElement("li");
      logItem.textContent = `Steps: ${steps}, Calories: ${calories}, Exercise: ${exerciseTime} min`;
      document.getElementById("progressLog").appendChild(logItem);
  
      // Clear form
      document.getElementById("progressForm").reset();
    } else {
      alert("Please fill out all fields.");
    }
  }
  