import "./App.css";
import spotifyLogo from "./spotify-logo-small.png";
import React, { useState, useEffect } from "react";
import Spotify from "../../Util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [newList, setNewList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  //using useEffect to check for the accessToken on every render.
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

  //-----
  const loginHandler = () => {
    Spotify.getAuth();
  };

  //-----
  const handleSearch = (searchInput) => {
    Spotify.searchTracks(searchInput)
      .then((tracksArray) => {
        setSearchResults(tracksArray);
      })
      .catch((error) => {
        console.error("Error searching tracks", error);
      });
  };

  //--Adding songs

  const addSong = (track) => {
    setNewList((prev) => [...prev, track]);
    console.log(newList);
  };

  const changePlaylistName = (name) => {
    setPlaylistName(name);
    console.log(playlistName);
  };

  const savePlaylist = () => {
    const urisArray = newList.map((track) => track.uri);
    Spotify.createPlaylist(playlistName, urisArray)
      .then((response) => {
        if (response) {
          alert("Playlist saved!");
          setNewList([]);
          setPlaylistName("");
        }
      })
      .catch((error) => {
        console.error("Error saving playlist", error);
      });
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
          <h2 className="userName">Hello! {userName}</h2>
          <SearchBar handleSearch={handleSearch} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addSong} />
            <Playlist
              list={newList}
              onChangeName={changePlaylistName}
              onSave={savePlaylist}
            />
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
