import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Main } from './pages/Main'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { useStore } from './pages/components/store'
import { FavoritesPage } from './pages/FavoritesPage'
import { SongDetails } from './pages/SongDetails'
import { ArtistDetails } from './pages/ArtistDetails'
import { ProfilePage } from './pages/ProfilePage'
import { PlaylistSongs } from './pages/PlaylistSongs'

function App() {
  const { updateUsers, updateUser, updateGenres, updateSongs, updateArtists } = useStore()

  function validateUser() {
    if (localStorage.token) {
      fetch('http://localhost:3001/validate', {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error.message);
          } else {
            updateUser(data);
          }
        });
    }
  }

  useEffect(() => {
    fetch('http://localhost:3001/users').then(resp => resp.json())
      .then(usersFromServer => updateUsers(usersFromServer))

    fetch('http://localhost:3001/genres').then(resp => resp.json())
      .then(genresFromServer => updateGenres(genresFromServer))

    fetch('http://localhost:3001/songs').then(resp => resp.json())
      .then(songsFromServer => updateSongs(songsFromServer))

    fetch('http://localhost:3001/artists').then(resp => resp.json())
      .then(artistsFromServer => updateArtists(artistsFromServer))

    validateUser()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/sign-in" />} />
        <Route path='/sign-in' element={< SignIn />} />
        <Route path='/sign-up' element={< SignUp />} />
        <Route path='/main' element={< Main />} />
        <Route path='/song/:songId' element={< SongDetails />} />
        <Route path='/artist/:artistId' element={< ArtistDetails />} />
        <Route path='/pick-favorites' element={< FavoritesPage />} />
        <Route path='/profile' element={< ProfilePage />} />
        <Route path='/playlist/:playlistId' element={< PlaylistSongs />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App