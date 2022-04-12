import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toysToDisplay, onToyDelete, onToyUpdate }) {

  
  return (
    <div id="toy-collection">
      {toysToDisplay.map((toy) => (
        <ToyCard
          key={toy.id}
          id={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
          onToyDelete={onToyDelete}
          onToyUpdate={onToyUpdate}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
