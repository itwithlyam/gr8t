import React from 'react'

import './planstyle.css'

export default function RenderPlan({id,shape,color,stamps,reward,loc}) {
    return <div className="svg-thing"><svg width="40%" height="100%">
        <rect width="100%" rx="20" ry="20" height="100%" fill={color} />
        <text x="10%" y="40%" fill="black" font-size="50">{reward}</text>
        <text x="10%" y="70%" fill="black" font-size="30">{stamps} stamps required</text>
        <text x="10%" y="90%" fill="black" font-size="10">{loc} (Plan ID: {id})</text>


    </svg></div>
}