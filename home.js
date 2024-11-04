// Register a new user
function registerUser() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User registered:', user);
        })
        .catch((error) => {
            console.error('Error registering user:', error.message);
        });
}

// Login existing user
function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Navigate to dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error logging in:', error.message);
        });
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
