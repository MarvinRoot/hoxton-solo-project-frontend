import { useEffect,useState } from "react"
import { Link,useParams } from "react-router-dom"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { useStore } from "./components/store"

export function ArtistDetails() {
    const params = useParams()
    const { artists, user, updateUser, artist, updateArtist } = useStore()

    function addToFavorites(artist) {
        let newFavArtists = JSON.parse(JSON.stringify(user.favoriteArtists))
        if (user.favoriteArtists.find(artistt => artistt === artist.id)) return null
        else newFavArtists.push(Number(artist.id))

        fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favoriteArtists: newFavArtists })
        }).then(resp => resp.json()).then(user => updateUser(user))
    }
    useEffect(() => {
        fetch(`http://localhost:3001/artists/${params.artistId}`).then(resp => resp.json())
            .then(artistFromServer => {
                updateArtist(artistFromServer)
                console.log(artistFromServer);
            })
    }, [params.artistId])

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
                    <div style={{ display: "grid", width: "900px", gridTemplateColumns: "500px 1fr", alignItems: "center",  gap: "3rem", marginTop: "2rem" }}>
                        <img style={{ borderRadius: "50%", width: "500px" }} src={artist.picture} alt="" />
                        <h1 style={{ color: "#f40", fontSize: "55px", fontWeight: "700" }}>{artist.name}</h1>
                    </div>
                    <div style={{ display: "grid", gridAutoFlow: "column", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
                        <button onClick={()=>addToFavorites(artist)}>Add to favorite artists</button>
                    </div>
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "600" }}>Similar Artists</h1>
                    <div className="artist-card-wrapper">
                        {artists.filter(artisst => artist.genreId === artisst.genreId && artisst.id !== artist.id)
                            .map(artisst => {
                                return (
                                    <Link key={artisst.id} to={`/artist/${artisst.id}`}>
                                        <div >
                                            <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "50%" }} src={artisst.picture} alt="" />
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