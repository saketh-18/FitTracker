  import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
  import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
      
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
  


  // Initialize Firebase services
  const auth = getAuth();
  const database = getDatabase();
  
  window.onload = function() {
      const user = auth.currentUser;
      
      if (user) {
          const userId = user.uid;
          const usernameElement = document.getElementById('username');
  
          // Fetch user data from the database
          const dbRef = ref(database);
          get(child(dbRef, `users/${userId}`)).then((snapshot) => {
              if (snapshot.exists()) {
                  const userData = snapshot.val();
                  console.log('User data fetched:', userData); // Debug statement
                  usernameElement.textContent = userData.displayName || user.email; // Fallback to email if display name not set
              } else {
                  console.error('No user data available');
                  usernameElement.textContent = "User"; // Fallback message
              }
          }).catch((error) => {
              console.error('Error fetching user data:', error);
              usernameElement.textContent = "User"; // Fallback message
          });
      } else {
          window.location.href = '../index.html'; // Redirect to login if not authenticated
      }
  };
  
