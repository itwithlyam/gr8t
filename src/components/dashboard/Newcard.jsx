import React, {} from 'react'
import { useParams } from "react-router-dom";
import './dashboard.css'


export default function Newcard() {
    const params = useParams()
    console.log(params)
    return (
        <div>
            <h1>New membership plan</h1>
            <h2>Create your card</h2>
            <svg version="1.1" width="900" height="240" xmlns="http://www.w3.org/2000/svg" className="svg-align">
                <a href="#"><rect className='svg-but' x="60" y="20" width="180" height="180" fill="purple"/></a>
                <a href="#"><rect className='svg-but' x="360" y="20" rx="60" ry="60" width="180" height="180" fill="purple"/></a>
                <a href="#"><circle className='svg-but' cx="720" cy="110" r="90" fill="purple"/></a>
            </svg>
            <h2>Colour and Logo</h2>
            
        </div>
    )
}