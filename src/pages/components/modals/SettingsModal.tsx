import { useStore } from "../store"

export default function SettingsModal() {
    const { user, updateUser, updateModal, modal } = useStore()

    function changeData(newUsername: string, password: string, newPassword: string, newProfilePic: string, newEmail: string) {
        fetch(`http://localhost:3001/users/${user?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({
                newUsername,
                password,
                newPassword: newPassword !== '' ? newPassword : null,
                newProfilePic,
                newEmail
            })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data)
            }
        })
    }
    return (
        <div className="modal-wrapper" onClick={() => updateModal('')}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => updateModal('')} className="close-modal">
                    X
                </button>
                <div className='container'>
                    <h1>Make changes</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        //@ts-ignore
                        changeData(e.target.username.value, e.target.password.value, e.target.newPassword.value, e.target.image.value, e.target.email.value)
                        updateModal('')
                    }}>
                        <h4>username</h4>
                        <input
                            type='text'
                            name='username'
                            defaultValue={user?.username}
                        />
                        <h4>email</h4>
                        <input type='email' name='email' defaultValue={user?.email} />
                        <h4>current password</h4>
                        <input type='password' name='password' required />

                        <h4>new password</h4>
                        <input type='password' name='newPassword' />
                        <h4>profile image</h4>
                        <input
                            type='text'
                            name='image'
                            placeholder='image url'
                            defaultValue={user?.profilePic}
                        />
                        <button type='submit'>Confirm Changes</button>
                    </form>
                </div>
            </div>
        </div>
    )
}