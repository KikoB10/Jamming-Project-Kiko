import "./App.css";
import React, { useState, useEffect } from "react";
import Spotify from "../../Util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
  const [logged, setLogged] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const authenticated = Spotify.checkAuth();
    if (authenticated) {
      Spotify.getUserName()
        .then((fetchName) => {
          setUserName(fetchName);
          setLogged(authenticated);
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
        });
    } else {
      console.log("Login Failed");
    }
  }, []);

  const loginHandler = () => {
    Spotify.getAuth();
  };

  const handleSearch = () => {
    console.log("search");
  };

  if (!logged) {
    return (
      <div className="container">
        <h1>
          Welcome to Kiko's Ja<span className="highlight">mmm</span>ing Project
        </h1>
        <h2>Please login to Spotify to continue</h2>
        <button onClick={loginHandler}>Login</button>
      </div>
    );
  } else {
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
}

export default App;
