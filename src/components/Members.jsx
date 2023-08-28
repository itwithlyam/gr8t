import React, {useState} from 'react'
import { useParams } from "react-router-dom";


export default function Members() {
    let params = useParams()
    
    let [loc, setLoc] = useState({})
    let [plans, setPlans] = useState([])

    const goToLocation = () => window.location.href = window.location.href.replace("/members", "")

    fetch("http://localhost:8080/api/"+params.id+"/memberships").then(data => data.json()).then(payload => {
        if (!payload.some(e => e.user === localStorage.getItem("uname"))) {
            alert("Permission denied")
            goToLocation()
        }
    })
    fetch("http://localhost:8080/api/"+params.id).then(data => data.json()).then(payload => {
        if (!loc) return setLoc(payload[0])
        if (loc._id !== payload[0]._id) setLoc(payload[0])
    })
    fetch("http://localhost:8080/api/"+params.id+"/plan").then(data => data.json()).then(payload => {
        setPlans(payload)
    })

    if (!loc.name) return <p>Loading, please wait...</p>

    return (
        <div>
            <h2>Members area for {loc.name}</h2>
            <h3>Available plans</h3>
            {plans.map(element => (
            <>
                <div className="dash-loc" key={element._id}>
                    <button onClick={() => {window.location.href = window.location.href.replace("members",'plan/'+element._id)}} className="dash-loc-but">
                        <p className="bold">{element.reward}</p>
                        <p>ID: {element._id}</p>
                        <p>Stamps required: {element.stamps}</p>
                    </button>
                </div>
                <br />
            </>
            ))}
            <div className="loc-but-div"><button className="loc-but" onClick={goToLocation}>Return to location</button></div>
        </div>
    )
}