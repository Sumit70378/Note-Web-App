
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyBC1QsPTHGqOR6mmsoGCUSUj7ZDZ5UX7zg",
  authDomain: "note-web-app-9330a.firebaseapp.com",
  projectId: "note-web-app-9330a",
  storageBucket: "note-web-app-9330a.appspot.com",
  messagingSenderId: "346011249389",
  appId: "1:346011249389:web:ee45ae408e2d806f81fae4",
  measurementId: "G-8QC376FG0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Save data to Firestore
document.getElementById('btn').addEventListener('click', async () => {
    const noteText = document.getElementById('note').value;
    console.log("Note text:", noteText); // Log note text
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            content: noteText,
            timestamp: new Date()
           
        });
        console.log("Document written with ID: ", docRef.id);
        alert('data saved');
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});
document.getElementById('show').addEventListener('click', () => {
    window.location.href = 'ShowData.html';  // Redirect to showNotes.html page
  });

