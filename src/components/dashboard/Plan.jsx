import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import RenderPlan from '../plan/RenderPlan'

export default function Plan() {
    const params = useParams()

    
    const [plan, setPlan] = useState({})
    const [subs, setSubs] = useState({})
    const [counter, count] = useState(0)

    if (counter === 0) {
        console.log("hmmm") 
        fetch("http://localhost:8080/api/"+params.id+"/plan/"+params.planid).then(data => data.json()).then(payload => {
            setPlan(payload)
            count(1)
        })
    } else if (counter === 1) {
        console.log("hmmm") 
        fetch("http://localhost:8080/api/"+params.id+"/plan/"+params.planid+"/subs").then(data => data.json()).then(payload => {
            setSubs(payload)
            count(2)
        })
    }

    return (
        <div>
            <h1>Plan</h1>
            <RenderPlan color={plan.color} id={plan._id} reward={plan.reward} stamps={plan.stamps}/>
            <h3>Subscriptions: {subs.length}</h3>
            <div className="flex"><button className="loc-but loc-logout" onClick={() => window.location.href = "/dashboard/"+params.id}>
            Back
            </button></div>
        </div>
    )
}
