import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "./components/Header"
import Modals from "./components/modals/Modals"
import { Sidebar } from "./components/Sidebar"
import { useStore } from "./components/store"
import { Artist, favoriteSongs, Song } from "./components/types"

export function SongDetails() {
    const params = useParams()
    const { artists, user, updateUser, artist, updateArtist, updateModal, songs, song, updateSong, search } = useStore()

    // function addToFavorites(song: Song) {

    //     let newFavSongs = JSON.parse(JSON.stringify(user?.favoriteSongs))
    //     if (user?.favoriteSongs.find(songg => songg === song.id)) return null
    //     else newFavSongs.push(Number(song.id))

    //     fetch(`http://localhost:3001/users/${user?.id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ favoriteSongs: newFavSongs })
    //     }).then(resp => resp.json()).then(user => updateUser(user))
    // }

    function addToFavorites(userId: number | undefined, songId: number) {
        fetch(`http://localhost:3001/favoriteSongs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ userId, songId })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data.userrr)
            }
        })
    }

    function removeFromFavorites(id: number) {
        let favSongId = findFavSongId(id)
        fetch(`http://localhost:3001/favoriteSongs/${favSongId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            }
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data)
            }
        })
    }

    function addComment(userId: number | undefined, songId: number, content: string) {
        fetch('http://localhost:3001/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ userId, songId, content })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data.userrr)
                updateSong(data.song)
            }
        })
    }

    function deleteComment(commentId: number, songId: number) {
        fetch(`http://localhost:3001/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ songId })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data.userrr)
                updateSong(data.song)
            }
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3001/songs/${params.songId}`).then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    console.log(data)
                    updateSong(data)
                    updateArtist(data.artistsSongs[0])
                }
            })
    }, [])

    function isFavorite(song: Song) {
        let favSongsIds = user?.favoriteSongs.map(song => song.songId)
        if (favSongsIds?.includes(song.id)) {
            return true
        } else return false
    }

    function findFavSongId(id: number) {
        let favSong = user?.favoriteSongs.find(song => song.songId === id)
        //@ts-ignore
        return favSong.id
    }

    function commentBelongsToUser(id: number) {
        if (user?.id === id) return true
        else return false
    }

    // not fetched yet
    if (song === null || artist === null) return <p>Loading...</p>

    // fetched but did not get a result back
    if (song.id === undefined) return <p>Song not found</p>

    return (
        search === '' ?
            <section className="song-details-content">
                <Header />
                <div className="song-content-main-wrapper">
                    <Sidebar />
                    <div className="song-content-wrapper">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "2rem" }}>
                            <iframe width="fit-content" height="300px" scrolling="no" frameBorder="no" allow="autoplay" src={song.src}></iframe>
                            <Link to={`/artist/${artist.id}`}><img style={{ borderRadius: "50%", width: "300px" }} src={artist.image} alt="" /></Link>
                        </div>
                        <div style={{ display: "grid", gridAutoFlow: "column", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>

                            {isFavorite(song) ? <button onClick={() => removeFromFavorites(song.id)}>Remove from favorites</button> : <button onClick={() => addToFavorites(user?.id, song.id)}>Add to favorites</button>}
                            <button onClick={() => updateModal('add-song')}>Add to playlist</button>
                        </div>
                        <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Similar Music</h1>
                        <div className="music-card-wrapper" >
                            {songs.filter(songg => song.genreId === songg.genreId && songg.id !== song.id)
                                .map(songg => {
                                    return (
                                        <Link key={songg.id} to={`/song/${songg.id}`}>
                                            <div className="music-card" >
                                                <img style={{ width: "300px", paddingBottom: ".5rem", borderRadius: "20px" }} src={songg.image} alt="" />
                                                <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{songg.title}</h2>
                                                <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{artist.name}</h3>
                                            </div>
                                        </Link>
                                    )
                                })}
                        </div>

                        <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Similar Artists</h1>
                        <div className="artist-card-wrapper">

                            {artists.filter(artisst => artist.genreId === artisst.genreId && artisst.id !== artist.id)
                                .map(artisst => {
                                    return (
                                        <Link key={artisst.id} to={`/artist/${artisst.id}`}>
                                            <div >
                                                <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "50%" }} src={artisst.image} alt="" />
                                                <h2 style={{ color: "#191919", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>{artisst.name}</h2>
                                            </div>
                                        </Link>
                                    )
                                })}
                        </div>
                        <div className="comments-section">
                            <h1>Comments Section</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                //@ts-ignore
                                addComment(user?.id, song.id, e.target.comment.value)
                                //@ts-ignore
                                e.target.reset()
                            }} style={{ display: "grid", gridAutoFlow: "row", gridGap: "1rem" }}>
                                <textarea style={{ width: "500px", padding: "3px" }} rows={3} name="comment" required />
                                <button type="submit">Post comment</button>
                            </form>
                            {song.comments.map(comment => {
                                return (
                                    <div style={{ display: "grid", gridAutoFlow: "column", alignItems: "center" }}>
                                        <div>
                                            <img style={{ width: "25px" }} src={comment.user.profilePic} alt="" />
                                            <span >{comment.user.username}</span>
                                            <p style={{ fontSize: "14px" }}>{comment.content}</p>
                                        </div>
                                        {commentBelongsToUser(comment.userId) ? <div onClick={() => deleteComment(comment.id, song.id)} className="svg-div" style={{ justifySelf: "end" }}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                            width="25" height="25"
                                            viewBox="0 0 50 50"
                                            style={{ fill: "#000000" }}><path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path></svg></div> : null}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
                <div>

                </div>
                <Modals />
            </section>
            :
            <section className="song-details-content">
                <Header />
                <div className="song-content-main-wrapper">
                    <Sidebar />
                    <div className="artist-card-wrapper">
                        {
                            songs.filter(song => song.title.toUpperCase().includes(search.toUpperCase())).map(song => {
                                return (
                                    <Link key={song.id} to={`/song/${song.id}`}>
                                        <div className="music-card" style={{}} >
                                            <img style={{ width: "250px", paddingBottom: ".5rem", borderRadius: "20px" }} src={song.image} alt="" />
                                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{song.title}</h2>
                                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{song.artistsSongs[0].artist.name}</h3>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
    )
}