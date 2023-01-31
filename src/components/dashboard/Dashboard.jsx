import React, {useState} from "react";
import Login from '../Login';
import useToken from './useToken';

import './dashboard.css'


function Dashboard() {
  const { token, setToken } = useToken();  

  if(!token) {
    return <Login setToken={setToken} />
  }

  async function getLocs() {
    let locs = await fetch("http://localhost:8080/api/locations?user="+localStorage.getItem("uname"))
    let ldata = await locs.json()
    return ldata
  }
  const [locations, setLocations] = useState([])
  const [counter, count] = useState(0)
  console.log(locations)

  if (counter === 0) {
    console.log("hmmm") 
    fetch("http://localhost:8080/api/locations?user="+localStorage.getItem("uname")).then(data => data.json()).then(payload => {
      setLocations(payload)
      count(1)
    })
  } 
  return (
    <>
      <h1>Locations</h1>
      <ul className="dashboard">
        {locations.map(element => (
          <>
              <div className="dash-loc" key={element._id}>
                <button onClick={() => {window.location.href = '/dashboard/'+element._id}} className="dash-loc-but">
                  <p className="bold">{element.name}</p>
                  <p>ID: {element._id}</p>
                </button>
              </div>
            <br />
          </>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;