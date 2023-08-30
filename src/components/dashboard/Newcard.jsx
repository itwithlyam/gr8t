import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import './dashboard.css'
import RenderPlan from "../plan/RenderPlan";


export default function Newcard() {
    const params = useParams()
    const [shape, changeShape] = useState(0)
    const [color, changeColor] = useState("")
    const [stamps, changeStamps] = useState(5)
    const [loc, setLoc] = useState({})
    console.log(params)

    if (loc.name) fetch("http://localhost:8080/api/"+params.locid).then(data => data.json()).then(payload => {
        setLoc(payload)
    })


    return (
        <div>
            <h1>New membership plan</h1>
            <h2>Create your card</h2>
            {/* <svg version="1.1" width="900" height="240" xmlns="http://www.w3.org/2000/svg" className="svg-align">
                <a href="#" onClick={() => changeShape(1)}><rect className="svg-but" x="60" y="20" width="180" height="180" fill={shape === 1 ? "rgba(128, 0, 128, 0.2)" : "purple"}/></a>
                <a href="#" onClick={() => changeShape(2)}><rect className="svg-but" x="720" y="20" rx="60" ry="60" width="180" height="180" fill={shape === 2 ? "rgba(128, 0, 128, 0.2)" : "purple"}/></a>
            </svg> */}
            <h2>Colour</h2>
            {/* <FileInput /> */}

            {/* <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label" for="inlineRadio1">Purple</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label" for="inlineRadio2">Black</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                <label className="form-check-label" for="inlineRadio3">White</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4" />
                <label className="form-check-label" for="inlineRadio4">Red</label>
            </div> */}
            <br />
            <svg version="1.1" width="480" height="80" xmlns="http://www.w3.org/2000/svg" className="svg-align">
                <a href="#" onClick={() => changeColor("purple")}><rect className="svg-but-col-purple" fill={color === "purple" ? "rgba(128, 0, 128, 0.2)" : "rgba(128, 0, 128, 1)"} width="60" height="60" /></a>
                <a href="#" onClick={() => changeColor("green")}><rect className="svg-but-col-green" fill={color === "green" ? "rgba(0, 128, 0, 0.2)" : "rgba(0, 128, 0, 1)"} x="70" width="60" height="60" /></a>
                <a href="#" onClick={() => changeColor("red")}><rect className="svg-but-col-red" fill={color === "red" ? "rgba(128, 0, 0, 0.2)" : "rgba(128, 0, 0, 1)"} x="140" width="60" height="60" /></a>
                <a href="#" onClick={() => changeColor("blue")}><rect className="svg-but-col-blue" fill={color === "blue" ? "rgba(0, 0, 128, 0.2)" : "rgba(0, 0, 128, 1)"} x="210" width="60" height="60" /></a>
                <a href="#" onClick={() => changeColor("turquoise")}><rect className="svg-but-col-turquoise" fill={color === "turquoise" ? "rgba(0, 128, 128, 0.2)" : "rgba(0, 128, 128, 1)"} x="280" width="60" height="60" /></a>
                <a href="#" onClick={() => changeColor("olive")}><rect className="svg-but-col-olive" fill={color === "olive" ? "rgba(128, 128, 0, 0.2)" : "rgba(128, 128, 0, 1)"} x="350" width="60" height="60" /></a>
                <a href="#" onClick={() => changeColor("black")}><rect className="svg-but-col-black" fill={color === "black" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 1)"} x="420" width="60" height="60" /></a>
            </svg>
            {/* <div className="mb-3 flex">
                <input className="form-control" type="file" id="formFile" style={{width: "30%"}} />
            </div> */}

            <br /> 

            <h2>Stamps</h2>
            <div className="flex">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onClick={() => changeStamps(5)} type="radio" name="NumberOfStampsOptions" id="NumberOfStamps1" value="option1" />
                    <label className="form-check-label" form="NumberOfStamps1"><h3>5</h3></label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onClick={() => changeStamps(10)} type="radio" name="NumberOfStampsOptions" id="NumberOfStamps2" value="option2" />
                    <label className="form-check-label" form="NumberOfStamps2"><h3>10</h3></label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" onClick={() => changeStamps(15)} type="radio" name="NumberOfStampsOptions" id="NumberOfStamps3" value="option2" />
                    <label className="form-check-label" form="NumberOfStamps3"><h3>15</h3></label>
                </div>
            </div>

            <br />
            
            <h2>Reward</h2>
            <div className="mb-3 flex">
                <input type="text" className="form-control text-center" id="RewardInput" placeholder="Discount, product, etc." style={{width: "30%"}} />
            </div>

            <div className="center-div"><button className="loc-but" onClick={() => {
                  let ans = window.confirm("Are you sure you want to create this reward plan?")
                  if (!ans) return
                  console.log({shape,color,stamps,document:document.getElementById("RewardInput").value})
                  fetch("http://localhost:8080/api/"+params.id+"/plan", { method: "POST", body: JSON.stringify({
                    shape: shape,
                    color: color,
                    stamps: stamps,
                    reward: document.getElementById("RewardInput").value
                  }), headers: {
                    "Content-Type": "application/json"
                  }})
                  document.location.href = "/dashboard/"+params.id
                }}>Create</button></div>
            {document.getElementById("RewardInput") != null ? <RenderPlan id={0} color={color} loc={loc.name} stamps={stamps} reward={document.getElementById("RewardInput").value} shape={shape} /> : <RenderPlan id={0} color={color} loc={loc.name} stamps={stamps} reward={"My plan"} shape={shape} />}
        </div>
    )
}