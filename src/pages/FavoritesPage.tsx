import { useNavigate } from "react-router-dom";
import { useStore } from "./components/store"

export function FavoritesPage() {
    const { user, genres, updateUser } = useStore()
    const navigate = useNavigate()

    function handleOnChange() {
        let selectedGenres = [
            ...document.getElementsByClassName('input') ,
          ]
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => Number(checkbox.value));
            console.log(selectedGenres);
        //update server
        fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ favoriteGenres: selectedGenres })
        }).then(resp => resp.json()).then(user => {
            updateUser(user)
        })
    }
  
  if(user === null) return <div style={{backgroundcolor: "rgba(6, 10, 51, 0.89)"} }><h1>loading</h1></div>

    return (
        <section className="pick-favorites">
            <h1> Welcome to hoxtify {user.username} </h1>
            <h2> Pick your favorite genres </h2>
            <div>
                <ul>
                    {genres.map(genre => {
                        return (
                            <li key={genre.id} >
                                <input className="input" onChange={handleOnChange} type="checkbox" value={genre.id} id={`cb${genre.id}`} />
                                <label htmlFor={`cb${genre.id}`}>
                                    <img src={genre.pic} />
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <button onClick={() => {
                (user.favoriteGenres.length === 0 ? alert('Pick at least one genre!!!') : navigate('/main'))
            }}>One click away from eargasm</button>
        </section>
    )
}