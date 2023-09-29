const CLIENT_ID = "7cb903af5f2c4113a6c55565d61117a4";
const CLIENT_SECRET = "727935eaec5946139c919d99b79a22f5";
const REDIRECT_URI = "http://localhost:3000/";
let accessToken;
let userId;

const Spotify = {
  //redirect user to Spotify Auth page when login button is clicked
  getAuth() {
    const tokenURL = `https://accounts.spotify.com/authorization?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    window.location = tokenURL;
  },

  //Only run if a token is there

  checkAuth() {
    const authenticated = window.location.href.match(/access_token=([^&]*)/);
    if (authenticated) {
      accessToken = authenticated[1];
      return true;
    } else {
      return false;
    }
  },

  getUserName() {
    if (!accessToken) {
      return Promise.reject(new Error(`Access token is missing!`));
    }

    const nameEndPoint = `https://api.apotify.com/v1/me`;
    return fetch(nameEndPoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        const userName = data.display_name;
        userId = data.id;
        return userName;
      });
  },

  searchTracks(searchInput) {
    const searchEndPoint = `https://api.spotify.com/v1/search?q=${searchInput}&type=track`;

    return fetch(searchEndPoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const trackResults = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          image: track.album.images[0].url,
          uri: track.uri,
        }));
        return trackResults;
      });
  },

  createPlaylist(listName, urisArray) {
    const createListURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const playlistData = {
      name: listName,
    };
    return fetch(createListURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to create playlist");
        }
      })
      .then((data) => {
        const playlistId = data.id;
        const tracksToAdd = {
          uris: urisArray,
        };

        const addTracksURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        return fetch(addTracksURL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tracksToAdd),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result) {
              return true;
            } else {
              return false;
            }
          });
      });
  },
};

const [searchInput, setSearchInput] = useState("");
const [accessToken, setAccessToken] = useState("");
const [track, setTrack] = useState([]);
const [artist, setArtist] = useState([]);
const [album, setAlbum] = useState([]);

//in order to initialize, we need useEffect and be very Spotify specific to make the access token request.
//Save those specific rules that Spotify needs into authParameters
//remember the fetch request gives a promise, so the .then waits for th epromise to be fulfilled in order to do something with the results

//set up access token
useEffect(() => {
  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  };

  fetch("https://accounts.spotify.com/api/token", authParameters)
    .then((result) => result.json())
    .then((data) => setAccessToken(data.access_token));
}, []);

//setup Search function
//search is an async function -> it is going to have a lot of different fetch statements.
async function search() {
  console.log(`Search for ${searchInput}`);
}

export default { search };
