import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { useStore } from "./components/store"
import { Artist } from "./components/types"

export function ArtistDetails() {
    const params = useParams()
    const { artists, user, artist, updateArtist, updateUser } = useStore()

    // function addToFavorites(artist: Artist) {
    //     let newFavArtists = JSON.parse(JSON.stringify(user?.favoriteArtists))
    //     if (user?.favoriteArtists.find(artistt => artistt === artist.id)) return null
    //     else newFavArtists.push(Number(artist.id))

    //     fetch(`http://localhost:3001/users/${user?.id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ favoriteArtists: newFavArtists })
    //     }).then(resp => resp.json()).then(user => updateUser(user))
    // }

    function addToFavorites(userId: number | undefined, artistId: number) {
        fetch(`http://localhost:3001/favoriteArtists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ userId, artistId })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data.userrr)
            }
        })
    }

    function removeFromFavorites(id: number) {
        let favArtistId = findFavArtistId(id)
        fetch(`http://localhost:3001/favoriteArtists/${favArtistId}`, {
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

    useEffect(() => {
        fetch(`http://localhost:3001/artists/${params.artistId}`).then(resp => resp.json())
            .then(artistFromServer => {
                updateArtist(artistFromServer)
                console.log(artistFromServer);
            })
    }, [params.artistId])

    function isFavorite(artist: Artist) {
        let favArtistsIds = user?.favoriteArtists.map(artist => artist.artistId)
        if (favArtistsIds?.includes(artist.id)) {
            return true
        } else return false
    }

    function findFavArtistId(id: number) {
        let favArtist = user?.favoriteArtists.find(artist => artist.artistId === id)
        //@ts-ignore
        return favArtist.id
    }


    // not fetched yet
    if (artist === null) return <p>Loading...</p>

    // fetched but did not get a result back
    if (artist.id === undefined) return <p>Artist not found</p>


    return (
        <section className="song-details-content">
            <Header />
            <div className="song-content-main-wrapper">
                <Sidebar />
                <div className="song-content-wrapper">
                    <div style={{ display: "grid", width: "900px", gridTemplateColumns: "500px 1fr", alignItems: "center", gap: "3rem", marginTop: "2rem" }}>
                        <img style={{ borderRadius: "50%", width: "500px" }} src={artist.image} alt="" />
                        <h1 style={{ color: "#f40", fontSize: "55px", fontWeight: "700" }}>{artist.name}</h1>
                    </div>
                    <div style={{ display: "grid", gridAutoFlow: "column", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
                        {isFavorite(artist) ? <button onClick={() => removeFromFavorites(artist.id)}>Remove from favorites</button> : <button onClick={() => addToFavorites(user?.id, artist.id)}>Add to favorites</button>}
                    </div>
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "600" }}>Similar Artists</h1>
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
                </div>
            </div>
        </section>

    )

}
