import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Playlist, Song } from "./components/types"
import { useNavigate } from "react-router-dom";
import { useStore } from "./components/store"

export function PlaylistSongs() {
    const params = useParams()
    const { updateUser } = useStore()
    const navigate = useNavigate()
    const [playlist, setPlaylist] = useState<Playlist | null>(null)

    function handleOnClick(songId: number) {
        fetch(`http://localhost:3001/playlistSongs/${songId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            }
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                setPlaylist(data)
            }
        })
    }

    function deletePlaylist(playlistId: number | undefined) {
        fetch(`http://localhost:3001/playlists/${playlistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            }
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                navigate('/profile')
                setPlaylist(null)
                updateUser(data.userrr)
            }
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3001/playlists/${params.playlistId}`).then(resp => resp.json())
            .then(playlistFromServer => {
                setPlaylist(playlistFromServer)
                console.log(playlistFromServer);
            })
    }, [params.playlistId])

    return (
        <section className="song-details-content">
            <Header />
            <div className="song-content-main-wrapper">
                <Sidebar />
                <div className="song-content-wrapper">
                    <div id="music" className="music-tracks" style={{ marginTop: "2rem" }}>
                        <div style={{ display: "grid", gridAutoFlow: "column", alignItems: "center" }}>
                            <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700", textTransform: "uppercase", textAlign: "end" }}>{playlist?.title}</h1>
                            <div title="delete playlist" style={{marginLeft: "1rem"}} className="svg-div"><svg onClick={() => deletePlaylist(playlist?.id)}
                                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                width="25" height="25"
                                viewBox="0 0 50 50"
                                style={{ fill: "#000000" }}><path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path></svg></div>
                        </div>
                        <div style={{display: "grid", gridAutoFlow: "row", gridGap: "1.8rem", paddingTop: "2rem"}} >
                            {playlist?.playlistSongs.map((object: any) => {
                                return (
                                    <div className="music-card" style={{ backgroundColor: "rgb(248, 138, 83)" }} >
                                        <Link key={object.song.id} to={`/song/${object.song.id}`}>
                                            <iframe width="900px" height="200px" scrolling="no" frameBorder="no" allow="autoplay" src={object.song.src}></iframe>

                                            {/* <img style={{ width: "300px", paddingBottom: ".5rem", borderRadius: "20px" }} src={object.song.image} alt="" /> */}
                                        </Link>
                                        <div >
                                            <h1 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{object.song.title}</h1>
                                            <div title="delete song" className="svg-div"><svg onClick={() => {
                                                handleOnClick(object.id)
                                            }
                                            } xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                width="25" height="25"
                                                viewBox="0 0 50 50"
                                                style={{ fill: "#000000" }}><path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path></svg></div>
                                        </div>
                                        {/* <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{object.song.artistsSongs[0].name}</h3> */}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
