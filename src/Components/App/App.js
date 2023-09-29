import "./App.css";
import React, { useState, useEffect } from "react";
import Spotify from "../../Util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (query) => {
    const searchResult = await getSongs(query);
    setSearchResults(searchResult);
  };
  return (
    <div className="container">
      <h1>
        Kiko's Ja<span className="highlight">mmm</span>ing Project
      </h1>
      <div className="App">
        <SearchBar handleSearch={handleSearch} />
        <div className="App-playlist">
          <SearchResults searchResultsList={searchResults} />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
