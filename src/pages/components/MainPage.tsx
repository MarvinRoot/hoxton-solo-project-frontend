import { Link } from "react-router-dom"
import { useStore } from "./store"

export function MainPage() {
    const { songs, artists, user, search } = useStore()
    // not fetched yet
    if (user === null) return <p>Loading...</p>

    let genresIds = user?.favoriteGenres.map(genre => genre.genreId)
    console.log(genresIds);

    return (
        search === '' ?
            <section className="main-page-content" style={{ display: "grid", gap: "3rem", width: "100%" }}>
                <div id="music" className="music-tracks" style={{ marginTop: "2rem", width: "100%" }}>
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Music For You</h1>
                    <div className="music-card-wrapper" >
                        {songs.filter(song => genresIds.includes(song.genreId))
                            .map(song => {
                                return (
                                    <Link key={song.id} to={`/song/${song.id}`}>
                                        <div className="music-card" style={{}} >
                                            <img style={{ width: "250px", paddingBottom: ".5rem", borderRadius: "20px" }} src={song.image} alt="" />
                                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{song.title}</h2>
                                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{song.artistsSongs[0].artist.name}</h3>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
                <div className="podcasts" id="podcasts">
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Popular Podcasts</h1>
                    <div className="podcasts-card-wrapper">
                        <div className="music-card" >
                            <iframe width="250" height="250" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/117797299&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200", paddingTop: ".5rem" }}>The Joe Rogan Experience #279 Duncan Trussell, Brian Redban</h2>
                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>The Joe Rogan Experience</h3>
                        </div>
                        <div className="music-card" >
                            <iframe width="250" height="250" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/544317060&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200", paddingTop: ".5rem" }}>Joe Rogan Experience #1208 - Jordan Peterson</h2>
                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>The Joe Rogan Experience</h3>
                        </div>
                        <div className="music-card" >
                            <iframe width="250" height="250" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/131838707&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200", paddingTop: ".5rem" }}>Ep 1:  Animal Instincts</h2>
                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>Criminal</h3>
                        </div>
                        <div className="music-card" >
                            <iframe width="250" height="250" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/174498191&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200", paddingTop: ".5rem" }}>Ep 11: I'm About to Save Your Life</h2>
                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>Criminal</h3>
                        </div>
                        <div className="music-card" >
                            <iframe width="250" height="250" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/141793466&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200", paddingTop: ".5rem" }}>Ep 4: Call Your Mom</h2>
                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>Criminal</h3>
                        </div>
                    </div>
                </div>
                <div id="artists" className="music-tracks" style={{ marginTop: "2rem" }}>
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Artists</h1>
                    <div className="music-card-wrapper" >
                        {artists.map(artist => {
                            return (
                                <Link key={artist.id} to={`/artist/${artist.id}`}>
                                    <div className="music-card" >
                                        <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "50%" }} src={artist.image} alt="" />
                                        <h2 style={{ color: "#191919", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>{artist.name}</h2>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
            :
            <section className="artist-card-wrapper">
                {songs.filter(song => song.title.toUpperCase().includes(search.toUpperCase())).map(song => {
                    return (
                        <Link key={song.id} to={`/song/${song.id}`}>
                            <div className="music-card" style={{}} >
                                <img style={{ width: "250px", paddingBottom: ".5rem", borderRadius: "20px" }} src={song.image} alt="" />
                                <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{song.title}</h2>
                                <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{song.artistsSongs[0].artist.name}</h3>
                            </div>
                        </Link>
                    )
                })}
                {artists.filter(artist => artist.name.toUpperCase().includes(search.toUpperCase())).map(artist => {
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
    )
}