import React from 'react'
import { useParams } from "react-router-dom";


export default function Members() {
    let params = useParams()
    fetch("http://77.68.127.58:8080/api/"+params.id+"/memberships").then(data => data.json()).then(payload => {
        if (!payload.some(e => e.user === localStorage.getItem("uname"))) {
            alert("Permission denied")
            window.location.href = window.location.href.replace("/members", "")
        }
    })
    return <p>Members area</p>
}