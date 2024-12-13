import React, { useState } from 'react'

function Auth({ updateLocalStorage }) {

    const [fullName, setFullName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(true)

    const toggle = () => {
        setLogin(!login)
        setFullName("")
        setEmail("")
        setPassword("")
        setAge("")
    }

    const toggleBtn = () => login ? "Register" : "Login"

    const register = () => login ? null : (
        <>
            <input onChange={e => setFullName(e.target.value)} type="text" name="fullName" id="name" value={fullName} placeholder="Enter Full Name" />
            <input onChange={e => setAge(e.target.value)} type="text" name="age" id="age" value={age} placeholder="Enter your age" />
        </>
    )

    const handleSubmit = e => {
        e.preventDefault()

        const url = login
            ? "http://127.0.0.1:4000/auth/login"
            : "http://127.0.0.1:4000/auth/register"

        const body = login
            ? { email, password }
            : { fullName, age, email, password }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(res => res.json())
            .then(data => updateLocalStorage(data.token))

    }

    return (
        <>
            <form action="" className="form-wrapper">
                {register()}
                <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" value={email} placeholder="Enter Email" />
                <input onChange={e => setPassword(e.target.value)} type="password" name="pwd" id="pwd" value={password} placeholder="Enter Password" />
                <button onClick={handleSubmit}>Go</button>
            </form>
            <button id="toggle" onClick={toggle}>{toggleBtn()}</button>
        </>
    )
}

export default Auth