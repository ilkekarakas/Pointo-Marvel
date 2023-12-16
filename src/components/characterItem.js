import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const CharacterItem = forwardRef(({ character }, ref) => {
  return (
    <Link to={`/character/${character.id}`} className="content m-5" ref={ref}>
     <div>
       <p className="charItem"
      >
        {character.name}
      </p>
     </div>

      <div className="content-inner">
        <div className="content-front">
          <img src={character.thumbnail.path + "/portrait_xlarge.jpg"} alt="" />
        </div>
        <div className="content-back">
          <h1>{character.name}</h1>
          <ul>
            <li>
              <strong>Name:</strong> {character.name}
            </li>
            <li>
              <strong>Description:</strong> {character.description}
            </li>
            <li>{/* Any additional details you want to display */}</li>
          </ul>
        </div>
      </div>
    </Link>
  );
});

export default CharacterItem;
