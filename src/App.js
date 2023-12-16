import "./styles/App.css";
import Header from "./components/header";
import CharacterTable from "./components/characterTable";
import Search from "./components/search";
import CharacterDetails from "./components/characterDetails";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import apiConfig from "./utils/apiConfig";

const axios = require("axios");
const charactersLimit = 30;

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const [prevQuery, setPrevQuery] = useState("");
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  // infinite scroll adjusting
  const fetchDataWithObserver = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (query !== "" && query !== prevQuery) {
        setCharacters([]);
        setOffset(0);
      }

      const params = {
        limit: charactersLimit,
        offset: offset,
        ts: 1,
        hash: apiConfig.hash,
        apikey: apiConfig.apikey,
      };
      if (query) {
        params.nameStartsWith = query;
        setOffset(0);
      }
      const result = await axios.get(apiConfig.baseUrl + "characters", {
        params,
      });
      const newCharacters = result.data.data.results;
      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      setHasMore(newCharacters.length === charactersLimit);
      setTimeout(() => {
        window.scrollTo(0, prevScrollPosition);
      }, 1);
      setIsLoading(false);
      setPrevQuery(query);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [offset, charactersLimit, query]);

  const lastCharacterRef = useCallback(
    (node) => {
      if (isLoading || !hasMore || !node) return;

      const callback = (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + charactersLimit);
        }
      };

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(callback);
      observerRef.current.observe(node);

      // Cleanup function
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    },
    [isLoading, hasMore, charactersLimit]
  );

  useEffect(() => {
    setPrevScrollPosition(window.scrollY + window.innerHeight);
    fetchDataWithObserver();
  }, [query, offset]);

  return (
    <Router>
      <div>
        <div className="background-image"></div>
        <div className="container">
          <Header />
          <Search search={(q) => setQuery(q)} />
          <Routes>
            <Route
              path="/"
              element={
                <CharacterTable
                  characters={characters}
                  isLoading={isLoading}
                  lastCharacterRef={lastCharacterRef}
                />
              }
            />
            <Route path="/character/:id" element={<CharacterDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
