import React, {useState} from 'react'
import { useParams } from "react-router-dom";

export default function Location() {
    const params = useParams()

    const [location, setLocation] = useState({})
    const [counter, count] = useState(0)

    if (counter == 0) {
        console.log("hmmm") 
        fetch("http://localhost:8080/api/"+params.id).then(data => data.json()).then(payload => {
            setLocation(payload)
            count(1)
        })
    } 
    if (!location[0]) return <p>Loading location...</p>
    return (
        <div>
            <h1>{location[0].name}</h1>
            <h3>Owner: {location[0].user}</h3>
            <h3>ID: {location[0]._id}</h3>

        </div>
    )
}