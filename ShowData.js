import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your Firebase configuration
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

// Function to display notes
const displayNotes = async () => {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = ''; // Clear existing notes

  const querySnapshot = await getDocs(collection(db, "notes"));
  querySnapshot.forEach((doc) => {
    // Create a list item for each note
    const li = document.createElement('li');
    li.classList.add('note-item');
    
    // Create and append the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('data-id', doc.id); // Set note ID for reference
    
    // Create and append the note content
    const noteContent = document.createElement('p');
    noteContent.textContent = doc.data().content;

    // Append the delete button and note content to the list item
    li.appendChild(deleteBtn);
    li.appendChild(noteContent);

    // Append the list item to the notes list
    notesList.appendChild(li);
  });
};

// Function to delete a note
const deleteNote = async (id) => {
  try {
    await deleteDoc(doc(db, "notes", id));
    displayNotes(); // Refresh the list after deletion
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};

// Handle click events for delete buttons
document.getElementById('notesList').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const noteId = e.target.getAttribute('data-id');
    deleteNote(noteId);
  }
});

// Fetch and display the notes when the page loads
window.onload = displayNotes;
document.getElementById('back').addEventListener('click', () => {
  window.location.href = 'index.html';  // Redirect to showNotes.html page
});
