import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setToys(data);
      });
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToy(newToy) {
    setToys([...toys, newToy]);
  }

  function handleDeletedToy(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(setToys(toys.filter((toy) => toy.id !== toyId)));
  }

  function handleUpdatedToy(updatedLikes, toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setToys(
          toys.map((toy) => {
            if (toy.id === toyId) {
              return data;
            } else {
              return toy;
            }
          })
        );
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onFormSubmit={handleNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>
          {showForm ? "Hide New Toy Form" : "Add a Toy"}
        </button>
      </div>
      <ToyContainer
        toysToDisplay={toys}
        setDisplayedToys={setToys}
        onToyDelete={handleDeletedToy}
        onToyUpdate={handleUpdatedToy}
      />
    </>
  );
}

export default App;

/*
App
|_Header
|_ToyContainer
|  |_ToyCard
|_ToyForm
*/
