import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import RenderPlan from "./plan/RenderPlan"

export default function Plan() {
    let params = useParams()

    let [locname, setLocname] = useState("")
    let [loc, setLoc] = useState({})

    const goToLocation = () => window.location.href = window.location.href.replace("/plan/"+params.id, "")

    fetch("http://localhost:8080/api/"+params.locid+"/plan/"+params.id+"/subs/"+localStorage.getItem("uname")).then(data => data.json()).then(payload => {
        if (!payload.user) {
            alert("Permission denied")
            goToLocation()
        }
    })
    fetch("http://localhost:8080/api/"+params.locid+"/plan/"+params.id).then(data => data.json()).then(payload => {
        if (loc._id !== payload._id) setLoc(payload)
    })
    fetch("http://localhost:8080/api/"+params.locid).then(data => data.json()).then(payload => {
        if (locname !== payload[0].name) setLocname(payload[0].name)
    })

    if (!loc._id) return <p>Loading, please wait...</p>

    const subscribe = () => {
        fetch("http://localhost:8080/api/"+params.locid+"/plan/"+params.id+"/subs", {
            method: "POST",
            body: JSON.stringify({user: localStorage.getItem("uname")}),
            headers: {"Content-Type": "application/json"}
        }).then(data => data.json()).then(payload => {
            if (payload.error) {
                alert("Already a member!")
            } else {
                alert("Successfully joined!")
            }
        })
    }

    return <div>
        <RenderPlan id={loc._id} stamps={loc.stamps} reward={loc.reward} shape={loc.shape} color={loc.color} loc={locname}/><br />
        <div className="loc-but-div"><button className="loc-but" onClick={subscribe}>Join this plan</button></div>
        <div className="loc-but-div"><button className="loc-but loc-logout" onClick={goToLocation}>Return</button></div>
    </div>
}