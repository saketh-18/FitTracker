import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

// Example register function
function registerUser(email, password, displayName) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            // Save display name to database
            const userId = user.uid;
            set(ref(database, 'users/' + userId), {
                displayName: displayName,
                email: email
            });
        })
        .catch((error) => {
            console.error('Error registering user:', error.message);
        });
}

// Login existing user
async function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        window.location.href = 'dashboard/dashboard.html';
    } catch (error) {
        console.error('Error logging in:', error.message);
        alert(error.message);
    }
}


function addProgress(userId, steps, calories, exerciseTime, date) {
    const userProgressRef = firebase.database().ref('progress/');

    userProgressRef.push({
        userId: userId,
        steps: steps,
        calories: calories,
        exerciseTime: exerciseTime,
        date: date
    }).then(() => {
        console.log('Progress added successfully!');
    }).catch((error) => {
        console.error('Error adding progress:', error);
    });
}


function getUserProgress(userId) {
    const userProgressRef = firebase.database().ref('progress/');

    userProgressRef.orderByChild('userId').equalTo(userId).on('value', (snapshot) => {
        const progressData = snapshot.val();
        if (progressData) {
            console.log('User progress data:', progressData);
            // You can update the UI here with the retrieved data
        } else {
            console.log('No progress data found for this user.');
        }
    });
}

function logoutUser() {
    firebase.auth().signOut().then(() => {
        console.log('User logged out');
        window.location.href = '/dashboard/dashboard.html'; // Redirect to home or login page
    }).catch((error) => {
        console.error('Error logging out:', error.message);
    });
}
