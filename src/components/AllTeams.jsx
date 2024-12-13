import React, { useState, useEffect } from 'react'

function AllTeams({ sessionToken }) {

    const [teams, setTeams] = useState([])

    useEffect(() => {
        fetchTeams()
    }, [])

    const fetchTeams = () => {
        const url = "http://127.0.0.1:4000/api/"

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": sessionToken
            })
        })
            .then(res => res.json())
            .then(data => setTeams(data))
            .catch(err => console.error(err))
    }

    const renderTeams = () => {
        return !teams.length
            ? "Loading"
            : teams.map((t, i, a) =>
                <div key={i}>
                    <h1>{a[i].teamName}</h1>
                    <h1>{t.sportsType}</h1>
                    <h1>{t.founded}</h1>
                    <h1>{t.location}</h1>
                    <h1>{t.sportsType}</h1>
                </div>)
    }

    return (
        <>
            {renderTeams()}
        </>
    )
}

export default AllTeams