import "./App.css";
import spotifyLogo from "./spotify-logo-small.png";
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
        <div className="loginHeader">
          <h1>
            Welcome to Kiko's Ja<span className="highlight">mmm</span>ing
            Project
          </h1>
        </div>
        <div className="buttonContainer">
          <img
            className="spotifyLogo"
            src={spotifyLogo}
            alt="pink spotify logo"
          />
          <h2 className="loginH2">Login to Spotify to continue</h2>
          <button className="loginButton" onClick={loginHandler}>
            Login
          </button>
        </div>

        <footer className="footer">
          Kiko Conley October 2023 CodeAcademy Project
        </footer>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="mainHeader">
          Kiko's Ja<span className="highlight">mmm</span>ing Project
        </h1>
        <div className="App">
          <SearchBar handleSearch={handleSearch} />
          <div className="App-playlist">
            <SearchResults searchResultsList={searchResults} />
            <Playlist />
          </div>
        </div>
        <footer className="footer">
          Kiko Conley October 2023 CodeAcademy Project
        </footer>
      </div>
    );
  }
}

export default App;
