import React, { useState, useEffect } from "react";
import AuthorList from "./components/AuthorList";
import { AddAuthor } from "./components/AddAuthor";
import styles from "./App.module.css";

// fhas
const API_URL = "http://localhost:8000";

function App() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${API_URL}/authors`);
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleDeleteAuthor = async (authorID) => {
    try {
      const response = await fetch(`${API_URL}/authors/${authorID}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== authorID)
        );
      }
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const handleAddAuthor = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const surname = event.target.surname.value;

    try {
      const response = await fetch(`${API_URL}/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname }),
      });

      const newAuthor = await response.json();

      if (newAuthor.id) {
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
      }
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  const handleEditAuthor = async (id, name, surname) => {
    try {
      const response = await fetch(`${API_URL}/authors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname }),
      });

      const updatedAuthor = await response.json();

      setAuthors((prevAuthors) =>
        prevAuthors.map((author) =>
          author.id === updatedAuthor.id ? updatedAuthor : author
        )
      );
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <div>
      <img src="./public/bow.svg" alt="bow" className={styles.bowTR} />
      <img src="./public/bow.svg" alt="bow" className={styles.bowBL} />
      <h1>Table of Authors</h1>
      <AddAuthor onAdd={handleAddAuthor} />
      <AuthorList
        authors={authors}
        onDelete={handleDeleteAuthor}
        onEdit={handleEditAuthor}
      />
    </div>
  );
}

export default App;
