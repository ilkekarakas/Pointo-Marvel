import React from "react";
import CharacterItem from "./characterItem";

const CharacterTable = ({ characters, isLoading, lastCharacterRef }) => {
  return isLoading ? (
    <div className="loading-spinner">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="animate-spin text-gray-500"
      style={{ width: "3rem", height: "3rem" }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    </svg>
    <p>Loading...</p>
  </div>
  ) : (
    <section className="contents">
      {characters && characters.length ? (
        characters.map((character, index) => (
          <CharacterItem
            key={character.id}
            character={character}
            ref={index === characters.length - 1 ? lastCharacterRef : null}
          />
        ))
      ) : (
        <h2>No results found.</h2>
      )}
    </section>
  );
};

export default CharacterTable;
