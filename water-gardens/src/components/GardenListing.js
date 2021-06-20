import React from 'react';

function GardenListing(props) {
    return (
        <React.Fragment>
            <h1>Gardens Listing</h1>
            <div className="row">
            {props.gardens.map( g => 
                <React.Fragment key={g._id}>
                    <div className="card" style={{width: "30rem"}}>
                        <div className="card-body">
                            <img className="card-img-top" src={g.photoURL} alt={g.name}/>
                            <h3 className="card-title">
                                {g.name}
                            </h3>
                            <p className="card-text">{g.desc}</p>
                            <h5>Aquascaper: {g.aquascaper.name}</h5>
                            <p>Website: {g.aquascaper.email}</p>
                            <p>Plants:</p>
                            <ul>
                                {Array.isArray(g.plants) ? g.plants.map(p => <li key={p.id}>{p.name}</li>) : null}
                            </ul>
                            <button
                                className="btn btn-info me-3"
                                onClick={props.addRatings}
                            >Rate this Garden</button>
                            <button
                                className="btn btn-success me-3"
                                onClick={()=>{
                                    props.viewGardenDetails(g._id);
                                }}
                            >View Garden</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
            </div>
        </React.Fragment>
    );
}

export default GardenListing;