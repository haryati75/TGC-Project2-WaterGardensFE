import React from 'react';

function Home(props) {
    return (
        <React.Fragment>
            <h1>Featured Gardens and Trending Plants</h1>
            <p>1. Show Gardens that is rated high:  4* and above of average ratings</p>
            <p>2. Show Latest 3 Gardens created</p>
            <p>3. Show Top Aquascaper with highest ratings, feature his/her gardens</p>
            <p>4. Show Top 5 Easy Care plants with highest likes</p>
            <p>Click <a href="#" className="card-link" onClick={()=>{props.setActive("garden-listing")}}>here</a> to see more Gardens...</p>
            <p>Click <a href="#" className="card-link" onClick={()=>{props.setActive("plant-listing")}}>here</a> to see more Plants...</p>
        </React.Fragment>
    )
}

export default Home;