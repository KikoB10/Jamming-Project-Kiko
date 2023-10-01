const CLIENT_ID = "7cb903af5f2c4113a6c55565d61117a4";
const CLIENT_SECRET = "727935eaec5946139c919d99b79a22f5";
const REDIRECT_URI = "http://localhost:3002/";

let accessToken;
let userId;
// let userImg;

const Spotify = {
  //redirect user to Spotify Auth page when login button is clicked

  //note for autorization: made the login button go here.
  //base_url: 'https://accounts.spotify.com/authorize'
  //response_type: 'token'
  //scope: 'playlist-modify-public'
  getAuth() {
    const tokenURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
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

    const nameEndPoint = `https://api.spotify.com/v1/me`;
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
        // const userImg = data.images[0];
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
        console.log(data);
        const trackResults = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          image: track.album.images[0].url,
          uri: track.uri,
        }));
        console.log(trackResults);
        return trackResults;
      });
  },

  async createPlaylist(playlistName, urisArray) {
    const createListURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const headersObject = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const playlistData = {
      name: playlistName,
    };

    //first send the new playlistName to spotify

    return fetch(createListURL, {
      method: "POST",
      headersObject,
      body: JSON.stringify(playlistData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const playlistId = data.id;
        const tracksToAdd = {
          uris: urisArray,
        };

        const addTracksURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        return fetch(addTracksURL, {
          method: "POST",
          headersObject,
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
export default Spotify;
