import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "./components/Header"
import Modals from "./components/modals/Modals"
import { Sidebar } from "./components/Sidebar"
import { useStore } from "./components/store"
import { Song, Artist, Playlist } from "./components/types"

export function ProfilePage() {
    const { user, updateUser, search, updateModal, updateArtist } = useStore()
    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])

    console.log(user);

    function getSongs(favSongsIds: any) {
        //@ts-ignore
        for (let id of favSongsIds) {
            fetch(`http://localhost:3001/songs/${id}`).then(resp => resp.json())
                .then(song => {
                    setSongs((songs: Song[]): any => [...songs, song])
                })
        }
    }

    function getArtists(favArtistsIds: any) {
        //@ts-ignore
        for (let id of favArtistsIds) {
            fetch(`http://localhost:3001/artists/${id}`).then(resp => resp.json())
                .then(artist => {
                    setArtists((artists: Artist[]): any => [...artists, artist])
                })
        }
    }

    function getPlaylists(playlistIds: any) {
        //@ts-ignore
        for (let id of playlistIds) {
            fetch(`http://localhost:3001/playlists/${id}`).then(resp => resp.json())
                .then(playlist => {
                    setPlaylists((playlists: Playlist[]): any => [...playlists, playlist])
                })
        }
    }

    function signOut() {
        localStorage.clear()
        updateUser(null)
    }

    useEffect(() => {
        let favSongsIds = user?.favoriteSongs.map(object => object.songId)
        let favArtistsIds = user?.favoriteArtists.map(object => object.artistId)
        let playlistIds = user?.playlists.map(object => object.id)

        getSongs(favSongsIds)
        getArtists(favArtistsIds)
        getPlaylists(playlistIds)
    }, [])

    if (songs === null || artists === null) return <p>Loading...</p>

    return (
        search === '' ?
            <section className="song-details-content">
                <Header />
                <div className="song-content-main-wrapper">
                    <Sidebar />
                    <div className="song-content-wrapper">
                        <div style={{ display: "grid", gridTemplateColumns: "500px 1fr", alignItems: "center", width: "100%" }}>
                            <img style={{ borderRadius: "50%", width: "400px" }} src={user?.profilePic} alt="" />
                            <div style={{ display: "grid", gridAutoFlow: "column", maxWidth: "fit-content", gap: "1rem", alignItems: "center" }}>
                                <h1 style={{ color: "#191919", fontSize: "35px", fontWeight: "700", textTransform: "uppercase" }}>{user?.username}</h1>
                                <Link to='/sign-in'>
                                    <img onClick={() => signOut()} title="log out" id="log-out" style={{ justifySelf: "start" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAqElEQVRYhe2XQQqDMBBFX6Un8GbiSXqQ0nN5pNrFuGgpIqSJmdEvxQ/ZGDLzMkm+CZwS65L4bhvH/6oJSlSta6Y/O4OEiisor8BfA7w8gw3fSXgCnRLAlTwCAKAFbiqABhg+MR4KAIAeGGcQqzwlAsAF8QvAHO2+DCY3opS2WoJdAaqTRwAc4hhKjUhuxfKfkfHegFKAovFyI5ID5G7FUe+DpOQVOCXXBIKASccbvfGwAAAAAElFTkSuQmCC" />
                                </Link>
                                <div onClick={() => updateModal('settings')} title="settings" className="svg-div">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="35" height="35"
                                        viewBox="0 0 27 27"
                                        style={{ fill: "#000000" }}><path d="M 9.6660156 2 L 9.1757812 4.5234375 C 8.3516137 4.8342536 7.5947862 5.2699307 6.9316406 5.8144531 L 4.5078125 4.9785156 L 2.171875 9.0214844 L 4.1132812 10.708984 C 4.0386488 11.16721 4 11.591845 4 12 C 4 12.408768 4.0398071 12.832626 4.1132812 13.291016 L 4.1132812 13.292969 L 2.171875 14.980469 L 4.5078125 19.021484 L 6.9296875 18.1875 C 7.5928951 18.732319 8.3514346 19.165567 9.1757812 19.476562 L 9.6660156 22 L 14.333984 22 L 14.824219 19.476562 C 15.648925 19.165543 16.404903 18.73057 17.068359 18.185547 L 19.492188 19.021484 L 21.826172 14.980469 L 19.886719 13.291016 C 19.961351 12.83279 20 12.408155 20 12 C 20 11.592457 19.96113 11.168374 19.886719 10.710938 L 19.886719 10.708984 L 21.828125 9.0195312 L 19.492188 4.9785156 L 17.070312 5.8125 C 16.407106 5.2676813 15.648565 4.8344327 14.824219 4.5234375 L 14.333984 2 L 9.6660156 2 z M 11.314453 4 L 12.685547 4 L 13.074219 6 L 14.117188 6.3945312 C 14.745852 6.63147 15.310672 6.9567546 15.800781 7.359375 L 16.664062 8.0664062 L 18.585938 7.40625 L 19.271484 8.5917969 L 17.736328 9.9277344 L 17.912109 11.027344 L 17.912109 11.029297 C 17.973258 11.404235 18 11.718768 18 12 C 18 12.281232 17.973259 12.595718 17.912109 12.970703 L 17.734375 14.070312 L 19.269531 15.40625 L 18.583984 16.59375 L 16.664062 15.931641 L 15.798828 16.640625 C 15.308719 17.043245 14.745852 17.36853 14.117188 17.605469 L 14.115234 17.605469 L 13.072266 18 L 12.683594 20 L 11.314453 20 L 10.925781 18 L 9.8828125 17.605469 C 9.2541467 17.36853 8.6893282 17.043245 8.1992188 16.640625 L 7.3359375 15.933594 L 5.4140625 16.59375 L 4.7285156 15.408203 L 6.265625 14.070312 L 6.0878906 12.974609 L 6.0878906 12.972656 C 6.0276183 12.596088 6 12.280673 6 12 C 6 11.718768 6.026742 11.404282 6.0878906 11.029297 L 6.265625 9.9296875 L 4.7285156 8.59375 L 5.4140625 7.40625 L 7.3359375 8.0683594 L 8.1992188 7.359375 C 8.6893282 6.9567546 9.2541467 6.6314701 9.8828125 6.3945312 L 10.925781 6 L 11.314453 4 z M 12 8 C 9.8034768 8 8 9.8034768 8 12 C 8 14.196523 9.8034768 16 12 16 C 14.196523 16 16 14.196523 16 12 C 16 9.8034768 14.196523 8 12 8 z M 12 10 C 13.111477 10 14 10.888523 14 12 C 14 13.111477 13.111477 14 12 14 C 10.888523 14 10 13.111477 10 12 C 10 10.888523 10.888523 10 12 10 z"></path></svg>
                                </div>
                            </div>
                        </div>

                        <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Favorite Songs</h1>
                        <div className="artist-card-wrapper" id="favorite-songs">
                            {
                                songs.map((song: Song) => {
                                    return (
                                        <Link key={song.id} to={`/song/${song.id}`}>
                                            <div >
                                                <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "20px" }} src={song.image} alt="" />
                                                <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{song.title}</h2>
                                                <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{song.artistsSongs[0].name}</h3>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Favorite Artists</h1>
                        <div className="artist-card-wrapper" id="favorite-artists">
                            {
                                artists.map((artist: Artist) => {
                                    return (
                                        <Link onClick={() => updateArtist(artist)} key={artist.id} to={`/artist/${artist.id}`}>
                                            <div style={{ gap: ".4rem" }}>
                                                <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "50%" }} src={artist.image} alt="" />
                                                <h2 style={{ color: "#191919", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>{artist.name}</h2>
                                            </div>
                                        </Link>
                                    )
                                }
                                )}
                        </div>
                        <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Playlists</h1>
                        <div className="artist-card-wrapper" id="playlists">
                            {
                                playlists.map((playlist: Playlist) => {
                                    return (
                                        <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                                            <div key={playlist.id} style={{ gap: ".4rem" }}>
                                                <div style={{ width: "300px", height: "300px", backgroundColor: "rgb(199, 199, 199)", color: "#f50", display: "grid", placeContent: "center", fontSize: "35px", fontWeight: "bold" }}>{playlist.title}</div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Modals />
            </section>
            :
            <section className="song-details-content">
                <Header />
                <div className="song-content-main-wrapper">
                    <Sidebar />
                    <section className="artist-card-wrapper">
                        {songs.filter((song: Song) => song.title.toUpperCase().includes(search.toUpperCase())).map((song: Song) => {
                            return (
                                <Link key={song.id} to={`/song/${song.id}`}>
                                    <div className="music-card" style={{}} >
                                        <img style={{ width: "250px", paddingBottom: ".5rem", borderRadius: "20px" }} src={song.image} alt="" />
                                        <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{song.title}</h2>
                                        <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{song.artistsSongs[0].name}</h3>
                                    </div>
                                </Link>
                            )
                        })}
                        {artists.filter((artist: Artist) => artist.name.toUpperCase().includes(search.toUpperCase())).map((artist: Artist) => {
                            return (
                                <Link key={artist.id} to={`/artist/${artist.id}`}>
                                    <div className="music-card" style={{ width: "200px" }} >
                                        <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "50%" }} src={artist.image} alt="" />
                                        <h2 style={{ color: "#191919", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>{artist.name}</h2>
                                    </div>
                                </Link>
                            )
                        })}
                    </section>
                </div>
            </section>
    )
}