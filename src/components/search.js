import React, { useState } from "react";

const Search = ({ search }) => {
  const [text, setText] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);

  const onSearch = (q) => {
    setText(q);

    // Eğer önceki bir timeout varsa, onu temizle
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Yeni bir timeout başlat
    setTypingTimeout(
      setTimeout(() => {
        // timeout sona erdiğinde isteği gönder
        search(q);
      }, 1000) // Örneğin, 1000 milisaniye (1 saniye) timeout süresi
    );
  };

  return (
    <section className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="form-control"
          placeholder="Find a character"
          autoFocus
          onChange={(e) => onSearch(e.target.value)}
          value={text}
        ></input>
      </form>
    </section>
  );
};

export default Search;
