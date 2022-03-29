import { HashLink } from 'react-router-hash-link';
export function Sidebar() {
    return (
        <section className="sidebar">
            <HashLink to={'/main#music'}><h1>♫ Music </h1></HashLink>
            <HashLink to={'/main#podcasts'}><h1>■ Podcasts</h1></HashLink>
            <HashLink to={'/main#artists'}><h1>○ Artists</h1></HashLink>
            <HashLink to={'/profile'}><h1>♥ Favorites</h1></HashLink>
            <HashLink to={'/profile#favorite-songs'}></HashLink><h2>Favorite Tracks</h2>
            <HashLink to={'/profile#favorite-artists'}><h2>Favorite Artists</h2></HashLink>
            <HashLink to={'/profile#playlists'}><h2>Playlists</h2></HashLink>
            
        </section>
    )
}