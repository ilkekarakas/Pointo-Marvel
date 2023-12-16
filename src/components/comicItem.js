import React from "react";

const ComicItem = ({ comic }) => {
  return (
    <div className="content m-7">
      <p
        style={{
          fontSize: "16px",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {comic.title}
      </p>
      <div className="content-inner">
        <div className="content-front">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
        </div>
        <div className="content-back">
          <p>{comic.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ComicItem;
