import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "./components/store"
import { Genre, User } from "./components/types";

export function FavoritesPage() {
    const { user, genres, updateUser } = useStore()
    const [selectedGenres, setSelectedGenres] = useState([])
    const navigate = useNavigate()

    function handleOnChange() {
        let selectedGenresIds = [
            ...document.getElementsByClassName('input'),
        ]
            //@ts-ignore
            .filter((checkbox) => checkbox.checked)
            //@ts-ignore
            .map((checkbox) => Number(checkbox.value));

        let sselectedGenres = genres.filter(genre => selectedGenresIds.includes(genre.id))
        //@ts-ignore
        setSelectedGenres(sselectedGenres)
        console.log(selectedGenres);
        //update server
        // fetch(`http://localhost:3001/users/${user?.id}`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ favoriteGenres: selectedGenres })
        // }).then(resp => resp.json()).then(user => {
        //     updateUser(user)
        // })


    }

    async function handleOnSubmit(userId: number, selectedGenres: Genre[]) {

        await fetch(`http://localhost:3001/favoriteGenres`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ userId, selectedGenres })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                (selectedGenres.length === 0 ? alert('Pick at least one genre!!!') : updateUser(data))
                navigate('/main')
            }
        })
    }

    if (user === null) return <div style={{ backgroundColor: "rgba(6, 10, 51, 0.89)" }}><h1>loading</h1></div>

    return (
        <section className="pick-favorites">
            <h1> Welcome to hoxtify {user.username} </h1>
            <h2> Pick your favorite genres </h2>
            <div>
                <ul>
                    {genres.map(genre => {
                        return (
                            <li key={genre.id} >
                                <input className="input" onChange={() => handleOnChange()} type="checkbox" value={genre.id} id={`cb${genre.id}`} />
                                <label htmlFor={`cb${genre.id}`}>
                                    <img src={genre.image} />
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <button onClick={() => {
                handleOnSubmit(user.id, selectedGenres)
            }}>One click away from eargasm</button>
        </section>
    )
}